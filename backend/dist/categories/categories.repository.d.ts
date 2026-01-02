import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../database/schema';
import { categories } from '../database/schema';
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export declare class CategoriesRepository {
    private readonly db;
    constructor(db: BetterSQLite3Database<typeof schema>);
    findAll(): Category[];
    findById(id: number): Category | undefined;
    create(data: NewCategory): Category;
    update(id: number, data: Partial<NewCategory>): Category;
    delete(id: number): void;
}
