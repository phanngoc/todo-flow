import { SQL } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../database/schema';
import { todos } from '../database/schema';
export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
export type TodoCategory = {
    id: number;
    name: string;
    color: string;
};
export interface FindAllOptions {
    conditions?: SQL[];
    orderColumn?: any;
    sortOrder?: 'asc' | 'desc';
    limit: number;
    offset: number;
}
export declare class TodosRepository {
    private readonly db;
    constructor(db: BetterSQLite3Database<typeof schema>);
    private buildWhereClause;
    private getSortFunction;
    findAll(options: FindAllOptions): Todo[];
    count(conditions?: SQL[]): number;
    findById(id: number): Todo | undefined;
    create(data: NewTodo): Todo;
    update(id: number, data: Partial<NewTodo>): void;
    delete(id: number): void;
    findTodoIdsByCategory(categoryId: number): number[];
    findCategoriesByTodoId(todoId: number): TodoCategory[];
    addCategoryToTodo(todoId: number, categoryId: number): void;
    removeCategoriesFromTodo(todoId: number): void;
    buildSearchCondition(search: string): SQL<unknown>;
    buildStatusCondition(status: 'active' | 'completed'): SQL<unknown>;
    buildPriorityCondition(priority: string): SQL<unknown>;
    getOrderColumn(sortBy: string): any;
}
