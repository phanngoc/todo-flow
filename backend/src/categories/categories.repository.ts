import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { DRIZZLE } from '../database/database.module';
import * as schema from '../database/schema';
import { categories } from '../database/schema';

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

/**
 * Repository for Category data access operations.
 * Separates data access logic from business logic in the service layer.
 */
@Injectable()
export class CategoriesRepository {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: BetterSQLite3Database<typeof schema>
  ) {}

  findAll(): Category[] {
    return this.db.select().from(categories).orderBy(categories.name).all();
  }

  findById(id: number): Category | undefined {
    return this.db.select().from(categories).where(eq(categories.id, id)).get();
  }

  create(data: NewCategory): Category {
    return this.db.insert(categories).values(data).returning().get();
  }

  update(id: number, data: Partial<NewCategory>): Category {
    return this.db
      .update(categories)
      .set(data)
      .where(eq(categories.id, id))
      .returning()
      .get();
  }

  delete(id: number): void {
    this.db.delete(categories).where(eq(categories.id, id)).run();
  }
}
