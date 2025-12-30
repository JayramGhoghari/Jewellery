# Database Setup - Quick Start

## ✅ What's Already Set Up

1. **Database Schema** - User, Order, and OrderItem models are ready
2. **API Endpoints**:
   - `POST /orders` - Save customer purchases
   - `GET /orders` - View all orders (for testing)
   - `GET /health` - Check API status

3. **Frontend Integration** - Checkout automatically saves to database

## 🚀 Quick Setup (Choose One)

### Option A: Neon (Free Cloud PostgreSQL - Recommended)
1. Sign up at https://neon.tech (free)
2. Create project → Copy connection string
3. Paste in `api/.env`:
   ```
   DATABASE_URL="your_neon_connection_string"
   ```
4. Run: `cd api && npx prisma migrate dev --name init`
5. Done! ✅

### Option B: Supabase (Free Cloud PostgreSQL)
1. Sign up at https://supabase.com (free)
2. Create project → Settings → Database → Copy connection string
3. Paste in `api/.env`
4. Run: `cd api && npx prisma migrate dev --name init`
5. Done! ✅

## 📊 What Gets Saved

When a customer purchases:
- ✅ **User Info**: Name, Email, Phone
- ✅ **Order Details**: Total, Status, Shipping Address, Notes
- ✅ **Order Items**: Product ID, Name, Price, Quantity, Image, Customization

## 🧪 Test It

1. Start API: `cd api && npm run dev`
2. Start Frontend: `npm run dev`
3. Add items to cart → Checkout → Fill form → Submit
4. View saved orders: `http://localhost:4000/orders`

## ❓ Troubleshooting

**"Can't reach database" error?**
- Check `api/.env` has correct `DATABASE_URL`
- Make sure database is running (if local)
- For cloud: verify connection string is correct

**Need help?** See `api/DATABASE_SETUP.md` for detailed instructions.

