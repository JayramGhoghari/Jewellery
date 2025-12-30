import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.ORIGIN || '*';

// Enable CORS for all origins (development)
// Basic CORS allow-all (no credentials)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

const orderSchema = z.object({
  user: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    password: z.string().min(6, 'Password must be at least 6 characters').optional()
  }),
  items: z.array(
    z.object({
      productId: z.string().min(1, 'Product ID is required'),
      name: z.string().min(1, 'Product name is required'),
      price: z.number().int().nonnegative('Price must be a positive number'), // cents
      quantity: z.number().int().positive('Quantity must be at least 1'),
      image: z.string().optional().or(z.literal('')), // Allow any string or empty string
      meta: z.any().optional()
    })
  ).min(1, 'At least one item is required'),
  shipping: z.any().optional(),
  notes: z.string().optional().or(z.literal(''))
});

app.get('/', (_req, res) => {
  res.json({ message: 'Jewelry API is running', endpoints: ['/health', '/orders'] });
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// Get all orders (for testing/admin)
app.get('/orders', async (_req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // Limit to last 50 orders
    });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders', message: err.message });
  }
});

app.post('/orders', async (req, res) => {
  try {
    // Log incoming request for debugging
    console.log('📥 Received order request:', JSON.stringify(req.body, null, 2));
    
    const parsed = orderSchema.parse(req.body);
    const { user, items, shipping, notes } = parsed;

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const password = (user.password || '').trim() || crypto.randomBytes(16).toString('hex');

    // Upsert user (create or update if email exists)
    const dbUser = await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name, phone: user.phone },
      create: { name: user.name, email: user.email, phone: user.phone, password }
    });

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId: dbUser.id,
        totalAmount: total,
        status: 'pending',
        shipping: shipping || null, // PostgreSQL supports JSON natively
        notes: notes ?? null,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image ?? null,
            meta: item.meta || null // PostgreSQL supports JSON natively
          }))
        }
      },
      include: { items: true, user: true }
    });

    console.log(`✅ Order created: ${order.id} for user ${dbUser.email} - Total: $${(total / 100).toFixed(2)}`);
    res.status(201).json({ 
      success: true, 
      order,
      message: 'Order saved successfully'
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('❌ Validation error:', err.issues);
      return res.status(400).json({ 
        error: 'Invalid payload', 
        message: 'Please check your form data',
        issues: err.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      });
    }
    
    // Database connection errors
    if (err.code === 'P1001' || err.message?.includes('Can\'t reach database')) {
      console.error('❌ Database connection error:', err.message);
      return res.status(503).json({ 
        error: 'Database connection failed', 
        message: 'Please check your DATABASE_URL in .env file and ensure the database is running.',
        hint: 'See api/DATABASE_SETUP.md for setup instructions'
      });
    }
    
    console.error('❌ Order creation error:', err);
    res.status(500).json({ 
      error: 'Failed to create order', 
      message: err.message 
    });
  }
});

// Admin: list users with order status summary (no passwords returned)
app.get('/admin/users', async (req, res) => {
  try {
    const search = (req.query.q || '').toString().trim();
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } }
          ]
        }
      : undefined;

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            status: true,
            totalAmount: true,
            createdAt: true
          }
        }
      }
    });

    const payload = users.map(user => {
      const totalOrders = user.orders.length;
      const lifetimeValue = user.orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      const lastOrder = user.orders[0];

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
        totalOrders,
        lifetimeValue,
        lastOrderStatus: lastOrder?.status || 'no orders',
        lastOrderAt: lastOrder?.createdAt || null
      };
    });

    res.json({ success: true, users: payload });
  } catch (err) {
    console.error('❌ Admin users fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch users', message: err.message });
  }
});

// Admin: fetch orders for a user (with items)
app.get('/admin/users/:id/orders', async (req, res) => {
  const userId = Number(req.params.id);
  if (Number.isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
        user: true
      }
    });
    res.json({ success: true, orders });
  } catch (err) {
    console.error('❌ Admin user orders fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch orders', message: err.message });
  }
});

// Admin: update order status
const VALID_STATUSES = ['pending', 'completed', 'cancelled', 'rejected'];
app.patch('/admin/orders/:id', async (req, res) => {
  const orderId = Number(req.params.id);
  if (Number.isNaN(orderId)) {
    return res.status(400).json({ error: 'Invalid order id' });
  }

  const { status } = req.body || {};
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status', allowed: VALID_STATUSES });
  }

  try {
    // Check if order exists first
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId }
    });
    
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found', orderId });
    }
    
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { items: true, user: true }
    });
    console.log(`✅ Order ${orderId} status updated to: ${status}`);
    res.json({ success: true, order });
  } catch (err) {
    console.error('❌ Admin order update error:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Order not found', orderId, message: err.message });
    }
    res.status(500).json({ error: 'Failed to update order', message: err.message });
  }
});

// Admin: single order detail
app.get('/admin/orders/:id', async (req, res) => {
  const orderId = Number(req.params.id);
  if (Number.isNaN(orderId)) {
    return res.status(400).json({ error: 'Invalid order id' });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        user: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (err) {
    console.error('❌ Admin order detail error:', err);
    res.status(500).json({ error: 'Failed to fetch order', message: err.message });
  }
});

// Admin: delete order (only if status is completed)
app.delete('/admin/orders/:id', async (req, res) => {
  const rawId = req.params.id;
  const orderId = Number(rawId);
  
  console.log(`🗑️ DELETE request received for order ID: "${rawId}" (parsed as: ${orderId})`);
  
  if (Number.isNaN(orderId) || orderId <= 0) {
    console.log(`❌ Invalid order ID: "${rawId}"`);
    return res.status(400).json({ 
      error: 'Invalid order id',
      received: rawId,
      parsed: orderId,
      message: `Order ID must be a valid positive number`
    });
  }

  try {
    // First check if order exists and get its status
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (!order) {
      console.log(`❌ Order ${orderId} not found in database`);
      return res.status(404).json({ 
        error: 'Order not found',
        orderId: orderId,
        message: `Order with ID ${orderId} does not exist in the database`
      });
    }

    console.log(`📦 Order ${orderId} found - Status: ${order.status}, User: ${order.userId}`);

    // Only allow deletion if status is completed
    if (order.status !== 'completed') {
      console.log(`❌ Cannot delete order ${orderId}: status is "${order.status}", must be "completed"`);
      return res.status(400).json({ 
        error: 'Only completed orders can be deleted',
        orderId: orderId,
        currentStatus: order.status,
        message: `Order ${orderId} has status '${order.status}' but only completed orders can be deleted. Please change the status to 'completed' first.`
      });
    }

    // Delete order items first (cascade), then the order
    console.log(`🔄 Starting transaction to delete order ${orderId} and its items...`);
    await prisma.$transaction([
      prisma.orderItem.deleteMany({
        where: { orderId: orderId }
      }),
      prisma.order.delete({
        where: { id: orderId }
      })
    ]);

    console.log(`✅ Order ${orderId} deleted successfully`);
    res.json({ 
      success: true, 
      message: 'Order deleted successfully', 
      orderId: orderId 
    });
  } catch (err) {
    console.error('❌ Admin order delete error:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      error: 'Failed to delete order', 
      message: err.message || 'An unexpected error occurred',
      orderId: orderId
    });
  }
});

// Admin: delete user (only if user has 0 orders)
app.delete('/admin/users/:id', async (req, res) => {
  const rawId = req.params.id;
  const userId = Number(rawId);
  
  console.log(`🗑️ DELETE request received for user ID: "${rawId}" (parsed as: ${userId})`);
  
  if (Number.isNaN(userId) || userId <= 0) {
    console.log(`❌ Invalid user ID: "${rawId}"`);
    return res.status(400).json({ 
      error: 'Invalid user id',
      received: rawId,
      parsed: userId,
      message: `User ID must be a valid positive number`
    });
  }

  try {
    // First check if user exists and get order count
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { 
        orders: {
          select: { id: true }
        }
      }
    });

    if (!user) {
      console.log(`❌ User ${userId} not found in database`);
      return res.status(404).json({ 
        error: 'User not found',
        userId: userId,
        message: `User with ID ${userId} does not exist in the database`
      });
    }

    const orderCount = user.orders.length;
    console.log(`👤 User ${userId} found - Orders: ${orderCount}`);

    // Only allow deletion if user has 0 orders
    if (orderCount > 0) {
      console.log(`❌ Cannot delete user ${userId}: has ${orderCount} order(s)`);
      return res.status(400).json({ 
        error: 'Cannot delete user with existing orders',
        userId: userId,
        orderCount: orderCount,
        message: `User ${userId} has ${orderCount} order(s). Users can only be deleted when they have 0 orders.`
      });
    }

    // Delete user
    console.log(`🔄 Starting transaction to delete user ${userId}...`);
    await prisma.user.delete({
      where: { id: userId }
    });

    console.log(`✅ User ${userId} deleted successfully`);
    res.json({ 
      success: true, 
      message: 'User deleted successfully', 
      userId: userId 
    });
  } catch (err) {
    console.error('❌ Admin user delete error:', err);
    console.error('Error stack:', err.stack);
    
    // Handle foreign key constraint errors
    if (err.code === 'P2003') {
      return res.status(400).json({ 
        error: 'Cannot delete user with related records', 
        message: 'User has related orders or other records that prevent deletion',
        userId: userId
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to delete user', 
      message: err.message || 'An unexpected error occurred',
      userId: userId
    });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different port.`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

