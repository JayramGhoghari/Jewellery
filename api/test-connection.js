#!/usr/bin/env node

/**
 * Test PostgreSQL connection
 * Usage: node test-connection.js
 */

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function testConnection() {
  console.log('🔍 Testing PostgreSQL connection...\n');
  console.log('📝 Current DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@') || 'NOT SET');
  console.log('');

  try {
    // Test basic connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Connection successful!');
    console.log('✅ Database credentials are valid\n');
    
    // Try to get database name
    const result = await prisma.$queryRaw`SELECT current_database() as db_name`;
    console.log('📊 Connected to database:', result[0]?.db_name || 'unknown');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed!\n');
    console.error('Error:', error.message);
    console.error('');
    
    if (error.message.includes('password authentication failed')) {
      console.log('💡 Solution:');
      console.log('   1. Check your PostgreSQL password in api/.env');
      console.log('   2. Make sure DATABASE_URL format is correct:');
      console.log('      postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE?schema=public');
      console.log('   3. Try resetting PostgreSQL password in pgAdmin4');
    } else if (error.message.includes('does not exist')) {
      console.log('💡 Solution:');
      console.log('   1. Create the database in pgAdmin4 first');
      console.log('   2. Make sure database name in .env matches pgAdmin4');
    } else if (error.message.includes('connection refused')) {
      console.log('💡 Solution:');
      console.log('   1. Make sure PostgreSQL service is running');
      console.log('   2. Check if port 5432 is correct');
    }
    
    console.log('');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

