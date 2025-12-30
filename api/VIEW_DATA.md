# Where Your Customer Data is Stored

## 📁 Database File Location

**File Path:** `api/data/jewelry.db`

This SQLite database file stores all customer purchase information.

## 📊 What Gets Stored

When a customer clicks "Reserve & Checkout" and confirms:

### 1. **User Table** (`User`)
- Name
- Email (unique identifier)
- Phone (optional)
- Created date

### 2. **Order Table** (`Order`)
- Order ID
- User ID (links to User)
- Total price (in cents)
- Status (pending/paid/shipped)
- Shipping address (JSON string)
- Notes
- Created date

### 3. **OrderItem Table** (`OrderItem`)
- Item ID
- Order ID (links to Order)
- Product ID
- Product name
- Price (in cents)
- Quantity
- Image URL
- Customization metadata (metal, gemstone, engraving, etc.)

## 🔍 How to View Stored Data

### Method 1: API Endpoint (Easiest)
Open in browser: `http://localhost:4000/orders`

This shows all orders with customer details and items.

### Method 2: Prisma Studio (Visual Database Browser)
```bash
cd api
npx prisma studio
```
Then open: `http://localhost:5555`

### Method 3: View Database File
The file is at: `api/data/jewelry.db`

You can use any SQLite browser tool to view it.

## ✅ Setup Database (If Not Done Yet)

1. Make sure `api/.env` has:
   ```
   DATABASE_URL="file:./data/jewelry.db"
   ```

2. Run migration:
   ```bash
   cd api
   npx prisma migrate dev --name init
   ```

3. Start API:
   ```bash
   npm run dev
   ```

Now when customers checkout, all data will be saved to `api/data/jewelry.db`!

