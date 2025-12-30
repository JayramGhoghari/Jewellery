# Database Setup Guide

## Option 1: Cloud Database (Recommended - Easiest)

### Using Neon (Free PostgreSQL)
1. Go to https://neon.tech and sign up (free)
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:password@host/dbname?sslmode=require`)
4. Update `api/.env`:
   ```
   DATABASE_URL="your_neon_connection_string_here"
   ORIGIN="http://localhost:5173"
   PORT=4000
   ```
5. Run migrations:
   ```bash
   cd api
   npx prisma migrate dev --name init
   ```

### Using Supabase (Free PostgreSQL)
1. Go to https://supabase.com and sign up
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Update `api/.env` with the connection string
6. Run migrations: `npx prisma migrate dev --name init`

## Option 2: Local PostgreSQL

1. Install PostgreSQL: https://www.postgresql.org/download/
2. Create database:
   ```sql
   CREATE DATABASE jewelry;
   ```
3. Update `api/.env`:
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/jewelry?schema=public"
   ```
4. Run migrations: `npx prisma migrate dev --name init`

## After Setup

Once database is connected, test it:
```bash
cd api
npm run dev
```

Then test checkout in your frontend - all user and order data will be saved!

