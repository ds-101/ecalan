import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchOptions = {
  cache: 'no-store',
};

// Check if the NEON_DATABASE_URL environment variable is set
const databaseUrl = process.env.NEON_DATABASE_URL;
if (!databaseUrl) {
  throw new Error('NEON_DATABASE_URL environment variable is not set');
}

// Create a SQL client with Neon
const sql = neon(databaseUrl);

// Create a Drizzle client using the Neon client
export const db = drizzle(sql);

// Helper function to check if the database connection is working
export async function checkDatabaseConnection() {
  try {
    const result = await sql`SELECT 1 as check`;
    return result[0].check === 1;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return false;
  }
}