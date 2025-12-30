# 🔄 Migration Guide: SQLite to PostgreSQL

## If You Already Have Data in SQLite

If you've been using SQLite and have existing orders, follow these steps to migrate:

### Option 1: Fresh Start (Recommended for Development)

1. **Backup SQLite data** (if needed):
   ```bash
   cp api/data/jewelry.db api/data/jewelry.db.backup
   ```

2. **Follow PostgreSQL setup** in `POSTGRESQL_SETUP.md`

3. **Run migrations:**
   ```bash
   cd api
   npx prisma migrate dev --name init
   ```

4. **Start fresh** - All new orders will go to PostgreSQL

### Option 2: Migrate Existing Data

1. **Export SQLite data:**
   ```bash
   cd api
   npx prisma db pull
   ```

2. **Set up PostgreSQL** (follow `POSTGRESQL_SETUP.md`)

3. **Import data** using Prisma Studio or custom script

---

## Quick Setup (No Existing Data)

1. **Create database in pgAdmin4** (see `POSTGRESQL_SETUP.md`)

2. **Update .env:**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/jewelry_db?schema=public"
   ```

3. **Generate Prisma Client:**
   ```bash
   cd api
   npx prisma generate
   ```

4. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start API:**
   ```bash
   npm run dev
   ```

✅ Done! Your database is now PostgreSQL!
























