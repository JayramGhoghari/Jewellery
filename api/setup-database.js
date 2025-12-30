// Simple script to set up the database
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function setup() {
  try {
    console.log('🔄 Setting up database...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected!');
    
    // The database file will be created automatically on first migration
    console.log('✅ Database is ready to use!');
    console.log('📁 Database file location: api/data/jewelry.db');
    
  } catch (error) {
    console.error('❌ Database setup error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setup();

