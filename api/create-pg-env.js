#!/usr/bin/env node

/**
 * Helper script to create/update .env file for PostgreSQL
 * Usage: node create-pg-env.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');
const envTemplate = `# PostgreSQL Database Connection
# Format: postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public
# Replace the placeholders below with your actual PostgreSQL credentials

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/jewelry_db?schema=public"
ORIGIN="http://localhost:5173"
PORT=4000

# Instructions:
# 1. Replace YOUR_PASSWORD with your PostgreSQL password
# 2. Replace 'postgres' with your PostgreSQL username if different
# 3. Replace 'jewelry_db' with your database name if different
# 4. Replace 'localhost' and '5432' if your PostgreSQL is on a different host/port
`;

console.log('📝 Creating .env file for PostgreSQL...\n');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('📄 Current contents:');
  console.log('─'.repeat(50));
  console.log(fs.readFileSync(envPath, 'utf-8'));
  console.log('─'.repeat(50));
  console.log('\n💡 If you want to update it, edit api/.env manually');
  console.log('   Or delete it and run this script again.\n');
} else {
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ .env file created successfully!');
  console.log('📝 Location: api/.env\n');
  console.log('⚠️  IMPORTANT: Edit api/.env and replace:');
  console.log('   - YOUR_PASSWORD with your PostgreSQL password');
  console.log('   - postgres with your username (if different)');
  console.log('   - jewelry_db with your database name (if different)\n');
  console.log('📖 See POSTGRESQL_SETUP.md for detailed instructions\n');
}

