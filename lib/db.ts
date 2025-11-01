import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../server/database/schema';

const sqlite = new Database('./app.db');
export const db = drizzle(sqlite, {
  schema: {
    ...schema,
  },
});
