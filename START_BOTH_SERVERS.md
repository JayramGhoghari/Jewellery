# How to Start Both Servers

## 🚀 Quick Start - Use Batch Files

### Option 1: Double-Click Scripts (Easiest)

1. **Double-click** `start-frontend.bat` (starts frontend on port 5173)
2. **Double-click** `start-api.bat` (starts API on port 4000)
3. Open browser: **http://localhost:5173**

### Option 2: Manual Start (2 Terminals)

## Terminal 1 - Frontend (Port 5173)

```powershell
cd C:\Users\jayram\Downloads\project-bolt-sb1-1awisqi5\project
npm run dev
```

**Expected output:**
```
  VITE v5.4.8  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

## Terminal 2 - Backend API (Port 4000)

```powershell
cd C:\Users\jayram\Downloads\project-bolt-sb1-1awisqi5\project\api
npm run dev
```

**Expected output:**
```
API running on http://localhost:4000
Health check: http://localhost:4000/health
```

## ✅ Verify Both Are Running

1. **Frontend:** Open http://localhost:5173 (should show your jewelry website)
2. **API:** Open http://localhost:4000/health (should show `{"ok":true}`)

## 🛒 Test Checkout

Once both servers are running:
1. Add items to cart
2. Click "Reserve & Checkout"
3. Fill in the form
4. Click "Confirm & Reserve"
5. ✅ Order will be saved to database!

## ❌ Troubleshooting

### "Port 4000 already in use"
- Another process is using port 4000
- Close other terminals or change port in `api/.env`: `PORT=4001`

### "Cannot find module"
- Run: `cd api && npm install`

### "Database connection failed"
- Make sure `api/.env` has: `DATABASE_URL="file:./data/jewelry.db"`
- Run: `cd api && npx prisma migrate dev --name init`

## 📝 Important Notes

- **Keep both terminals open** while using the website
- **Frontend (5173)** = Your website
- **Backend (4000)** = API for saving orders
- Both must be running for checkout to work!

