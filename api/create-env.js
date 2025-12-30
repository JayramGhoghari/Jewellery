// Script to create .env file if it doesn't exist
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const envPath = join(process.cwd(), '.env');
const envContent = `DATABASE_URL="file:./data/jewelry.db"
ORIGIN="http://localhost:5173"
PORT=4000
`;

if (!existsSync(envPath)) {
  writeFileSync(envPath, envContent);
  console.log('✅ Created .env file with SQLite configuration');
} else {
  console.log('⚠️  .env file already exists. Please update it manually:');
  console.log('\nAdd this line to your .env file:');
  console.log('DATABASE_URL="file:./data/jewelry.db"');
}

