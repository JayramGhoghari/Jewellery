# 🐘 PostgreSQL Setup with pgAdmin4

## Step-by-Step Guide to Create Database

### Prerequisites
- ✅ PostgreSQL installed on your system
- ✅ pgAdmin4 installed and running

---

## 📋 Step 1: Open pgAdmin4

1. Launch **pgAdmin4** from your applications
2. Enter your **master password** (the one you set during PostgreSQL installation)
3. You'll see the pgAdmin4 dashboard

---

## 📋 Step 2: Connect to PostgreSQL Server

1. In the left sidebar, expand **Servers**
2. Click on your PostgreSQL server (usually named "PostgreSQL 15" or similar)
3. If it asks for a password, enter your **PostgreSQL server password**
4. You should now see: **Databases**, **Login/Group Roles**, etc.

---

## 📋 Step 3: Create New Database

1. **Right-click** on **"Databases"** in the left sidebar
2. Select **"Create"** → **"Database..."**
3. Fill in the database details:

   **General Tab:**
   - **Database name:** `jewelry_db` (or any name you prefer)
   - **Owner:** `postgres` (or your PostgreSQL username)
   - **Comment:** (optional) "Jewelry e-commerce database"

   **Definition Tab:**
   - **Encoding:** `UTF8` (default)
   - **Template:** `template0` (recommended for new databases)

4. Click **"Save"**

✅ Your database is now created!

---

## 📋 Step 4: Get Connection Details

You'll need these details for the `.env` file:

1. **Host:** Usually `localhost` or `127.0.0.1`
2. **Port:** Usually `5432` (default PostgreSQL port)
3. **Database:** `jewelry_db` (the name you just created)
4. **Username:** Usually `postgres` (or your PostgreSQL username)
5. **Password:** Your PostgreSQL server password

---

## 📋 Step 5: Update .env File

1. Open `api/.env` file
2. Update the `DATABASE_URL` with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://postgres:Jayram@localhost:5432/jewelry_db?schema=public"
ORIGIN="http://localhost:5173"
PORT=4000
```

**Replace:**
- `postgres` → Your PostgreSQL username
- `YOUR_PASSWORD` → Your PostgreSQL password
- `jewelry_db` → Your database name (if different)

**Example:**
```env
DATABASE_URL="postgresql://postgres:Jayram@localhost:5432/jewelry_db?schema=public"
```

---

## 📋 Step 6: Install PostgreSQL Client (if needed)

If you get connection errors, make sure you have the PostgreSQL client:

```bash
cd api
npm install pg @prisma/client
```

---

## 📋 Step 7: Generate Prisma Client & Run Migrations

1. **Generate Prisma Client:**
   ```bash
   cd api
   npx prisma generate
   ```

2. **Create database tables (migration):**
   ```bash
   npx prisma migrate dev --name init
   ```

   This will:
   - Create all tables (User, Order, OrderItem)
   - Set up relationships
   - Create indexes

3. **Verify in pgAdmin4:**
   - Expand your `jewelry_db` database
   - Expand **"Schemas"** → **"public"** → **"Tables"**
   - You should see: `User`, `Order`, `OrderItem` tables ✅

---

## 📋 Step 8: Start API Server

```bash
cd api
npm run dev
```

You should see:
```
API running on http://localhost:4000
Health check: http://localhost:4000/health
```

---

## ✅ Verify Database Connection

1. **Test API Health:**
   - Open: http://localhost:4000/health
   - Should show: `{"ok":true,"database":"connected"}`

2. **View Database in pgAdmin4:**
   - Right-click on `jewelry_db` → **"View/Edit Data"** → **"All Rows"**
   - Tables should be empty initially
   - After checkout, you'll see data here!

---

## 🔍 Troubleshooting

### Error: "password authentication failed"
- **Solution:** Check your password in `DATABASE_URL`
- Make sure you're using the correct PostgreSQL user password

### Error: "database does not exist"
- **Solution:** Make sure the database name in `DATABASE_URL` matches the one in pgAdmin4
- Check spelling and case sensitivity

### Error: "connection refused"
- **Solution:** Make sure PostgreSQL service is running
- On Windows: Check Services → PostgreSQL
- On Mac/Linux: `sudo service postgresql start`

### Error: "role does not exist"
- **Solution:** Use `postgres` as username, or create a new role in pgAdmin4
- Right-click **"Login/Group Roles"** → **"Create"** → **"Login/Group Role"**

### Port 5432 already in use
- **Solution:** Check if another PostgreSQL instance is running
- Or use a different port in your connection string

---

## 📊 View Data in pgAdmin4

After customers make purchases:

1. Open pgAdmin4
2. Navigate to: `jewelry_db` → `Schemas` → `public` → `Tables`
3. Right-click on a table (e.g., `User`) → **"View/Edit Data"** → **"All Rows"**
4. You'll see all customer data!

---

## 🎯 Quick Reference

**Database Name:** `jewelry_db`  
**Schema:** `public`  
**Tables:** `User`, `Order`, `OrderItem`  
**Connection String Format:**
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public
```

---

## ✅ Success Checklist

- [ ] PostgreSQL installed
- [ ] pgAdmin4 installed and running
- [ ] Database `jewelry_db` created in pgAdmin4
- [ ] `.env` file updated with correct `DATABASE_URL`
- [ ] `npx prisma generate` completed successfully
- [ ] `npx prisma migrate dev --name init` completed successfully
- [ ] Tables visible in pgAdmin4
- [ ] API server starts without errors
- [ ] Health check returns `{"ok":true}`

---

**Need help?** Check the error message and refer to the troubleshooting section above! 🚀

