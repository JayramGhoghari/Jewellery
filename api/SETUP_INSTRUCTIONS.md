# Database Setup - No External Setup Required! ✅

I've set up a **file-based SQLite database** - no PostgreSQL or cloud setup needed!

## 🚀 Quick Setup (3 Steps)

### Step 1: Update .env file
Copy the contents from `env-template.txt` to your `.env` file:

```
DATABASE_URL="file:./data/jewelry.db"
ORIGIN="http://localhost:5173"
PORT=4000
```

### Step 2: Generate Prisma Client & Create Database
```bash
cd api
npx prisma generate
npx prisma migrate dev --name init
```

### Step 3: Start the API
```bash
npm run dev
```

**That's it!** The database file will be created at `api/data/jewelry.db`

## 📊 What Gets Stored

When customers purchase:
- ✅ User information (name, email, phone)
- ✅ Order details (total, status, shipping, notes)
- ✅ Order items (product details, customization)

All stored in: `api/data/jewelry.db`

## 🧪 Test It

1. Start API: `cd api && npm run dev`
2. Start Frontend: `npm run dev` (from project root)
3. Add items to cart → Checkout → Submit
4. View orders: `http://localhost:4000/orders`

## 📁 Database File Location

The database file is stored at:
```
api/data/jewelry.db
```

You can backup this file to save all your customer data!

