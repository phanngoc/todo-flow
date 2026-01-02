"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoCategoriesRelations = exports.categoriesRelations = exports.todosRelations = exports.todoCategories = exports.todos = exports.categories = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.categories = (0, sqlite_core_1.sqliteTable)('categories', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    name: (0, sqlite_core_1.text)('name').notNull(),
    color: (0, sqlite_core_1.text)('color').notNull().default('blue'),
    icon: (0, sqlite_core_1.text)('icon'),
    createdAt: (0, sqlite_core_1.text)('created_at')
        .notNull()
        .$defaultFn(() => new Date().toISOString()),
    updatedAt: (0, sqlite_core_1.text)('updated_at')
        .notNull()
        .$defaultFn(() => new Date().toISOString()),
});
exports.todos = (0, sqlite_core_1.sqliteTable)('todos', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    title: (0, sqlite_core_1.text)('title').notNull(),
    description: (0, sqlite_core_1.text)('description'),
    priority: (0, sqlite_core_1.text)('priority').notNull().default('medium'),
    dueDate: (0, sqlite_core_1.text)('due_date'),
    completed: (0, sqlite_core_1.integer)('completed', { mode: 'boolean' }).notNull().default(false),
    createdAt: (0, sqlite_core_1.text)('created_at')
        .notNull()
        .$defaultFn(() => new Date().toISOString()),
    updatedAt: (0, sqlite_core_1.text)('updated_at')
        .notNull()
        .$defaultFn(() => new Date().toISOString()),
});
exports.todoCategories = (0, sqlite_core_1.sqliteTable)('todo_categories', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    todoId: (0, sqlite_core_1.integer)('todo_id')
        .notNull()
        .references(() => exports.todos.id, { onDelete: 'cascade' }),
    categoryId: (0, sqlite_core_1.integer)('category_id')
        .notNull()
        .references(() => exports.categories.id, { onDelete: 'cascade' }),
});
exports.todosRelations = (0, drizzle_orm_1.relations)(exports.todos, ({ many }) => ({
    todoCategories: many(exports.todoCategories),
}));
exports.categoriesRelations = (0, drizzle_orm_1.relations)(exports.categories, ({ many }) => ({
    todoCategories: many(exports.todoCategories),
}));
exports.todoCategoriesRelations = (0, drizzle_orm_1.relations)(exports.todoCategories, ({ one }) => ({
    todo: one(exports.todos, {
        fields: [exports.todoCategories.todoId],
        references: [exports.todos.id],
    }),
    category: one(exports.categories, {
        fields: [exports.todoCategories.categoryId],
        references: [exports.categories.id],
    }),
}));
//# sourceMappingURL=schema.js.map