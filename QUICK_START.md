# Quick Start Guide - Fix localhost:5173

## 🚀 Method 1: Double-Click Script (Easiest)

1. **Double-click** `start-frontend.bat` in the project folder
2. Wait for it to start
3. Open: **http://localhost:5173**

## 🚀 Method 2: Manual Start

### Step 1: Open PowerShell
Open a **new** PowerShell window

### Step 2: Navigate to Project
```powershell
cd C:\Users\jayram\Downloads\project-bolt-sb1-1awisqi5\project
```

### Step 3: Install Dependencies (if needed)
```powershell
npm install
```

### Step 4: Start Server
```powershell
npm run dev
```

### Step 5: Open Browser
Open: **http://localhost:5173**

## ❌ Troubleshooting

### "Port 5173 already in use"
**Solution:** Kill the process or use different port
```powershell
# Use port 5174 instead
npm run dev -- --port 5174
```
Then open: http://localhost:5174

### "Cannot find module"
**Solution:** Install dependencies
```powershell
npm install
```

### "Command not found: npm"
**Solution:** Install Node.js from https://nodejs.org

### Server starts but page is blank
**Solution:** 
1. Check browser console (F12) for errors
2. Hard refresh: Ctrl+Shift+R
3. Check if API is running on port 4000

## ✅ Success Indicators

When working correctly, you should see:
```
  VITE v5.4.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 📝 Running Both Servers

**Terminal 1 - Frontend (Port 5173):**
```powershell
cd C:\Users\jayram\Downloads\project-bolt-sb1-1awisqi5\project
npm run dev
```

**Terminal 2 - Backend API (Port 4000):**
```powershell
cd C:\Users\jayram\Downloads\project-bolt-sb1-1awisqi5\project\api
npm run dev
```

Then open: **http://localhost:5173**

