import { Injectable, Inject } from '@nestjs/common';
import { eq, like, and, desc, asc, sql, SQL } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { DRIZZLE } from '../database/database.module';
import * as schema from '../database/schema';
import { todos, categories, todoCategories } from '../database/schema';

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
export type TodoCategory = { id: number; name: string; color: string };

export interface FindAllOptions {
  conditions?: SQL[];
  orderColumn?: any;
  sortOrder?: 'asc' | 'desc';
  limit: number;
  offset: number;
}

/**
 * Repository for Todo data access operations.
 * Separates data access logic from business logic in the service layer.
 */
@Injectable()
export class TodosRepository {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: BetterSQLite3Database<typeof schema>
  ) {}

  /**
   * Build WHERE clause from conditions array
   */
  private buildWhereClause(conditions?: SQL[]) {
    if (!conditions || conditions.length === 0) {
      return undefined;
    }
    return and(...conditions);
  }

  /**
   * Get sort function based on sort order
   */
  private getSortFunction(sortOrder: 'asc' | 'desc') {
    return sortOrder === 'asc' ? asc : desc;
  }

  findAll(options: FindAllOptions): Todo[] {
    const { conditions, orderColumn, sortOrder, limit, offset } = options;
    const whereClause = this.buildWhereClause(conditions);
    const sortFunction = this.getSortFunction(sortOrder);

    if (whereClause) {
      return this.db
        .select()
        .from(todos)
        .where(whereClause)
        .orderBy(sortFunction(orderColumn))
        .limit(limit)
        .offset(offset)
        .all();
    }

    return this.db
      .select()
      .from(todos)
      .orderBy(sortFunction(orderColumn))
      .limit(limit)
      .offset(offset)
      .all();
  }

  count(conditions?: SQL[]): number {
    const whereClause = this.buildWhereClause(conditions);

    const result = whereClause
      ? this.db.select({ count: sql<number>`count(*)` }).from(todos).where(whereClause).all()
      : this.db.select({ count: sql<number>`count(*)` }).from(todos).all();

    return result[0]?.count || 0;
  }

  findById(id: number): Todo | undefined {
    return this.db.select().from(todos).where(eq(todos.id, id)).get();
  }

  create(data: NewTodo): Todo {
    return this.db.insert(todos).values(data).returning().get();
  }

  update(id: number, data: Partial<NewTodo>): void {
    this.db.update(todos).set(data).where(eq(todos.id, id)).run();
  }

  delete(id: number): void {
    this.db.delete(todos).where(eq(todos.id, id)).run();
  }

  // Todo-Category relationship methods
  findTodoIdsByCategory(categoryId: number): number[] {
    const results = this.db
      .select({ todoId: todoCategories.todoId })
      .from(todoCategories)
      .where(eq(todoCategories.categoryId, categoryId))
      .all();
    return results.map((r) => r.todoId);
  }

  findCategoriesByTodoId(todoId: number): TodoCategory[] {
    return this.db
      .select({
        id: categories.id,
        name: categories.name,
        color: categories.color,
      })
      .from(todoCategories)
      .innerJoin(categories, eq(todoCategories.categoryId, categories.id))
      .where(eq(todoCategories.todoId, todoId))
      .all();
  }

  addCategoryToTodo(todoId: number, categoryId: number): void {
    this.db.insert(todoCategories).values({ todoId, categoryId }).run();
  }

  removeCategoriesFromTodo(todoId: number): void {
    this.db.delete(todoCategories).where(eq(todoCategories.todoId, todoId)).run();
  }

  // Condition builders for queries
  buildSearchCondition(search: string) {
    return like(todos.title, `%${search}%`);
  }

  buildStatusCondition(status: 'active' | 'completed') {
    return eq(todos.completed, status === 'completed');
  }

  buildPriorityCondition(priority: string) {
    return eq(todos.priority, priority);
  }

  getOrderColumn(sortBy: string) {
    const columns: Record<string, any> = {
      createdAt: todos.createdAt,
      updatedAt: todos.updatedAt,
      dueDate: todos.dueDate,
      priority: todos.priority,
      title: todos.title,
    };
    return columns[sortBy] || todos.createdAt;
  }
}
