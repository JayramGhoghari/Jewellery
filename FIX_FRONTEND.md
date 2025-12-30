# Fix Frontend - Port 5173/5174

## ✅ Your Frontend is Running!

Port **5173** is already in use, which means your frontend server is running!

## 🌐 Open Your Website

**Open in browser:**
```
http://localhost:5173
```

(Not 5174 - use **5173**)

## 🔄 If Port 5173 Doesn't Work

### Option 1: Restart Frontend Server

1. **Find the terminal** running the frontend (port 5173)
2. **Stop it** (Press Ctrl+C)
3. **Start it again:**
   ```powershell
   cd C:\Users\jayram\Downloads\project-bolt-sb1-1awisqi5\project
   npm run dev
   ```

### Option 2: Use Port 5174

If you want to use port 5174 instead:

1. **Stop the current server** (Ctrl+C)
2. **Start on port 5174:**
   ```powershell
   npm run dev -- --port 5174
   ```
3. **Open:** http://localhost:5174

## 🧪 Test Both Servers

1. **Frontend:** http://localhost:5173 (or 5174)
   - Should show your jewelry website

2. **API:** http://localhost:4000/health
   - Should show: `{"ok":true}`

## ✅ Quick Check

**Open these URLs in your browser:**
- Frontend: http://localhost:5173
- API Health: http://localhost:4000/health

If both work, you're all set! 🎉

