# 🔐 Update PostgreSQL Password in .env

## Quick Fix

1. **Open `api/.env` file**

2. **Find this line:**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/jewelry_db?schema=public"
   ```

3. **Replace `YOUR_PASSWORD` with your actual PostgreSQL password**

   **Example:**
   - If your password is `mypass123`, change to:
   ```env
   DATABASE_URL="postgresql://postgres:mypass123@localhost:5432/jewelry_db?schema=public"
   ```

4. **Save the file**

5. **Test connection:**
   ```bash
   cd api
   node test-connection.js
   ```

## ⚠️ Important Notes

- **No spaces** around the `:`
- **Exact password** - must match what you use in pgAdmin4
- **Special characters** - if your password has `@`, `#`, `%`, etc., you may need to URL-encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `%` → `%25`

## 🔍 Still Not Working?

1. **Check username:**
   - In pgAdmin4, what username do you use?
   - If not `postgres`, update it in `.env`:
   ```env
   DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/jewelry_db?schema=public"
   ```

2. **Verify database exists:**
   - In pgAdmin4, make sure `jewelry_db` database exists
   - If not, create it (see POSTGRESQL_SETUP.md)

3. **Check PostgreSQL is running:**
   - Windows: Services → PostgreSQL → Start
   - Make sure you can connect in pgAdmin4 first
























