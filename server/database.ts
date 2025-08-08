import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import { workshopRegistrations } from '@shared/schema';
import { eq } from 'drizzle-orm';
import path from 'path';

dotenv.config();

// In-memory storage for serverless environment
let registrations: any[] = [];

// Use SQLite database file with proper path for serverless
let db: any;
let sqlite: any;

try {
  const dbPath = process.env.NODE_ENV === 'production' 
    ? ':memory:' 
    : path.join(process.cwd(), 'kishanbrand.db');

  sqlite = new Database(dbPath);
  db = drizzle(sqlite);
} catch (error) {
  console.log('Using in-memory storage for serverless environment');
}

export { db };

export async function getAllRegistrations() {
  try {
    if (db) {
      const result = await db.select().from(workshopRegistrations).orderBy(workshopRegistrations.createdAt);
      return result;
    } else {
      return registrations;
    }
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return registrations;
  }
}

export async function createRegistration(data: { name: string; email: string; profession: string }) {
  try {
    if (db) {
      const result = await db.insert(workshopRegistrations).values(data).returning();
      return result[0];
    } else {
      const newRegistration = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date().toISOString()
      };
      registrations.push(newRegistration);
      return newRegistration;
    }
  } catch (error) {
    console.error('Error creating registration:', error);
    // Fallback to in-memory storage
    const newRegistration = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date().toISOString()
    };
    registrations.push(newRegistration);
    return newRegistration;
  }
}

export async function getRegistrationByEmail(email: string) {
  try {
    if (db) {
      const result = await db.select().from(workshopRegistrations).where(eq(workshopRegistrations.email, email));
      return result[0];
    } else {
      return registrations.find(reg => reg.email === email);
    }
  } catch (error) {
    console.error('Error fetching registration by email:', error);
    return registrations.find(reg => reg.email === email);
  }
}
