# 🔐 Fix PostgreSQL Authentication Error

## Error Message
```
Authentication failed against database server at `localhost`, 
the provided database credentials for `postgres` are not valid.
```

## 🔧 Quick Fix Steps

### Step 1: Verify Your PostgreSQL Password

The most common issue is an incorrect password in the `.env` file.

1. **Open pgAdmin4**
2. **Connect to your PostgreSQL server** (you'll need to enter the password)
3. **Note the password** you use to connect

### Step 2: Update .env File

1. **Open `api/.env`**
2. **Check the DATABASE_URL format:**

```env
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/jewelry_db?schema=public"
```

**Important:**
- Replace `YOUR_ACTUAL_PASSWORD` with the **exact password** you use in pgAdmin4
- Make sure there are **no spaces** around the `:`
- Make sure the password doesn't contain special characters that need escaping
- If your password has special characters, you may need to URL-encode them

### Step 3: Test Connection

Run the test script:

```bash
cd api
node test-connection.js
```

This will tell you if the connection works.

---

## 🔍 Common Issues & Solutions

### Issue 1: Wrong Password

**Symptoms:**
- "password authentication failed"
- Can't connect in pgAdmin4 with same credentials

**Solution:**
1. Reset PostgreSQL password:
   - Open pgAdmin4
   - Right-click on your server → **Properties**
   - Go to **Connection** tab
   - Update password
2. Update `.env` with new password

### Issue 2: Wrong Username

**Symptoms:**
- "role does not exist"
- Different username in pgAdmin4

**Solution:**
1. Check your PostgreSQL username:
   - In pgAdmin4, look at **Login/Group Roles**
   - Common usernames: `postgres`, `your_username`
2. Update `.env`:
   ```env
   DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/jewelry_db?schema=public"
   ```

### Issue 3: Database Doesn't Exist

**Symptoms:**
- "database does not exist"

**Solution:**
1. Create database in pgAdmin4:
   - Right-click **Databases** → **Create** → **Database**
   - Name: `jewelry_db`
2. Make sure `.env` has the same database name

### Issue 4: Special Characters in Password

**Symptoms:**
- Connection fails even with correct password
- Password contains `@`, `#`, `%`, etc.

**Solution:**
URL-encode special characters in the password:
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `&` → `%26`
- `/` → `%2F`

**Example:**
If password is `my@pass#123`, use:
```env
DATABASE_URL="postgresql://postgres:my%40pass%23123@localhost:5432/jewelry_db?schema=public"
```

### Issue 5: PostgreSQL Not Running

**Symptoms:**
- "connection refused"
- Can't connect in pgAdmin4

**Solution:**
1. **Windows:**
   - Open **Services** (Win+R → `services.msc`)
   - Find **PostgreSQL** service
   - Right-click → **Start**

2. **Mac/Linux:**
   ```bash
   sudo service postgresql start
   ```

### Issue 6: Wrong Port

**Symptoms:**
- "connection refused"
- Different port in pgAdmin4

**Solution:**
1. Check PostgreSQL port in pgAdmin4:
   - Right-click server → **Properties** → **Connection**
   - Note the **Port** (usually 5432)
2. Update `.env` if different:
   ```env
   DATABASE_URL="postgresql://postgres:PASSWORD@localhost:YOUR_PORT/jewelry_db?schema=public"
   ```

---

## ✅ Step-by-Step Verification

### 1. Test Connection in pgAdmin4

1. Open pgAdmin4
2. Try to connect to your PostgreSQL server
3. **If this fails**, fix PostgreSQL first
4. **If this works**, note the exact credentials you used

### 2. Match Credentials in .env

Make sure `.env` has the **exact same** credentials:
- Same username
- Same password
- Same host (usually `localhost`)
- Same port (usually `5432`)
- Database name exists

### 3. Test with Script

```bash
cd api
node test-connection.js
```

### 4. If Still Failing

1. **Check .env file format:**
   ```env
   DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public"
   ```

2. **Try creating a new user in pgAdmin4:**
   - Right-click **Login/Group Roles** → **Create** → **Login/Group Role**
   - Name: `jewelry_user`
   - Password: `jewelry_pass123`
   - Privileges: Can login, Can create databases
   - Update `.env` with new credentials

3. **Check PostgreSQL logs:**
   - Windows: `C:\Program Files\PostgreSQL\VERSION\data\log\`
   - Mac/Linux: `/var/log/postgresql/`

---

## 🎯 Quick Test Format

Your `.env` should look like this:

```env
DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/jewelry_db?schema=public"
ORIGIN="http://localhost:5173"
PORT=4000
```

**Replace:**
- `postgres` → Your PostgreSQL username
- `mypassword123` → Your actual password
- `jewelry_db` → Your database name
- `localhost:5432` → Your host and port

---

## 🚀 After Fixing

Once connection works:

1. **Generate Prisma Client:**
   ```bash
   cd api
   npx prisma generate
   ```

2. **Run Migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Start API:**
   ```bash
   npm run dev
   ```

4. **Test:**
   - http://localhost:4000/health
   - Should show: `{"ok":true,"database":"connected"}`

---

**Still having issues?** Share the exact error message and I'll help debug! 🔍
























