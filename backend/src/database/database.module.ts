import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as BetterSqlite3 from 'better-sqlite3';
import * as schema from './schema';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { SQLITE_PRAGMA } from '../common/constants';

/**
 * Get the SQLite database constructor.
 * Handles both ESM and CommonJS module formats.
 */
function getSqliteConstructor() {
  return (BetterSqlite3 as any).default || BetterSqlite3;
}

const DB_PATH = './data/todos.db';

export const DRIZZLE = Symbol('DRIZZLE');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: () => {
        // Ensure data directory exists
        const dir = dirname(DB_PATH);
        if (!existsSync(dir)) {
          mkdirSync(dir, { recursive: true });
        }

        const DatabaseConstructor = getSqliteConstructor();
        const sqlite = new DatabaseConstructor(DB_PATH);
        
        // Enable WAL mode for better concurrency
        sqlite.pragma(SQLITE_PRAGMA.JOURNAL_MODE_WAL);
        
        // Enable foreign keys
        sqlite.pragma(SQLITE_PRAGMA.FOREIGN_KEYS_ON);

        const db = drizzle(sqlite, { schema });

        console.log('📦 Database connected:', DB_PATH);

        return db;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
