# How to Start Frontend (Port 5173)

## 🚀 Quick Start

### Step 1: Open PowerShell Terminal
Open a **new** PowerShell window (not the one running the API)

### Step 2: Navigate to Project
```powershell
cd C:\Users\jayram\Downloads\project-bolt-sb1-1awisqi5\project
```

### Step 3: Start Frontend
```powershell
npm run dev
```

You should see:
```
  VITE v5.4.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

### Step 4: Open Browser
Open: **http://localhost:5173**

## ❌ Troubleshooting

### Port 5173 Already in Use?
If you see "Port 5173 is already in use":

**Option 1:** Kill the process using port 5173
```powershell
# Find process
netstat -ano | findstr :5173

# Kill it (replace PID with the number from above)
taskkill /PID <PID> /F
```

**Option 2:** Use a different port
```powershell
npm run dev -- --port 5174
```
Then open: http://localhost:5174

### Dependencies Not Installed?
```powershell
npm install
```

### Still Not Working?
1. Close all terminals
2. Open a fresh PowerShell
3. Navigate to project folder
4. Run: `npm run dev`

## 📝 Running Both Frontend & Backend

You need **2 terminals**:

**Terminal 1 - Frontend:**
```powershell
cd C:\Users\jayram\Downloads\project-bolt-sb1-1awisqi5\project
npm run dev
```

**Terminal 2 - Backend API:**
```powershell
cd C:\Users\jayram\Downloads\project-bolt-sb1-1awisqi5\project\api
npm run dev
```

Then open: **http://localhost:5173**

