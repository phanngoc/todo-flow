import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// Categories table
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  color: text('color').notNull().default('blue'),
  icon: text('icon'),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// Todos table
export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  priority: text('priority').notNull().default('medium'),
  dueDate: text('due_date'),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// Junction table for many-to-many relationship
export const todoCategories = sqliteTable('todo_categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  todoId: integer('todo_id')
    .notNull()
    .references(() => todos.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
});

// Relations
export const todosRelations = relations(todos, ({ many }) => ({
  todoCategories: many(todoCategories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  todoCategories: many(todoCategories),
}));

export const todoCategoriesRelations = relations(todoCategories, ({ one }) => ({
  todo: one(todos, {
    fields: [todoCategories.todoId],
    references: [todos.id],
  }),
  category: one(categories, {
    fields: [todoCategories.categoryId],
    references: [categories.id],
  }),
}));

// Type exports
export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
