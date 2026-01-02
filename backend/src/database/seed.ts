import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import * as schema from './schema';
import { categories, todos, todoCategories } from './schema';
import { SQLITE_PRAGMA } from '../common/constants';

const DB_PATH = './data/todos.db';

async function seed() {
  console.log('🌱 Seeding database...');

  // Ensure data directory exists
  const dir = dirname(DB_PATH);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const sqlite = new Database(DB_PATH);
  sqlite.pragma(SQLITE_PRAGMA.FOREIGN_KEYS_ON);
  const db = drizzle(sqlite, { schema });

  // Create tables if not exist
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL DEFAULT 'blue',
      icon TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT NOT NULL DEFAULT 'medium',
      due_date TEXT,
      completed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS todo_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      todo_id INTEGER NOT NULL REFERENCES todos(id) ON DELETE CASCADE,
      category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE
    );
  `);

  // Clear existing data
  db.delete(todoCategories).run();
  db.delete(todos).run();
  db.delete(categories).run();

  // Seed categories
  const categoryData = [
    { name: 'Work', color: 'blue', icon: 'briefcase' },
    { name: 'Personal', color: 'green', icon: 'user' },
    { name: 'Shopping', color: 'orange', icon: 'shopping-cart' },
    { name: 'Health', color: 'red', icon: 'heart' },
    { name: 'Learning', color: 'purple', icon: 'book' },
  ];

  const insertedCategories = [];
  for (const cat of categoryData) {
    const result = db.insert(categories).values(cat).returning().get();
    insertedCategories.push(result);
  }
  console.log(`✅ Inserted ${insertedCategories.length} categories`);

  // Seed todos
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const todoData = [
    {
      title: 'Complete project proposal',
      description: 'Write and submit the Q1 project proposal document',
      priority: 'high',
      dueDate: tomorrow.toISOString(),
      completed: false,
    },
    {
      title: 'Review pull requests',
      description: 'Review pending PRs from the team',
      priority: 'medium',
      dueDate: null,
      completed: false,
    },
    {
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, fruits, vegetables',
      priority: 'low',
      dueDate: tomorrow.toISOString(),
      completed: false,
    },
    {
      title: 'Morning workout',
      description: '30 minutes cardio + stretching',
      priority: 'medium',
      dueDate: null,
      completed: true,
    },
    {
      title: 'Read TypeScript documentation',
      description: 'Deep dive into advanced TypeScript features',
      priority: 'low',
      dueDate: nextWeek.toISOString(),
      completed: false,
    },
    {
      title: 'Fix critical bug',
      description: 'Address the authentication issue reported by QA',
      priority: 'urgent',
      dueDate: now.toISOString(),
      completed: false,
    },
  ];

  const insertedTodos = [];
  for (const todo of todoData) {
    const result = db.insert(todos).values(todo).returning().get();
    insertedTodos.push(result);
  }
  console.log(`✅ Inserted ${insertedTodos.length} todos`);

  // Assign categories to todos
  const todoCategoryAssignments = [
    { todoId: insertedTodos[0].id, categoryId: insertedCategories[0].id }, // Work
    { todoId: insertedTodos[1].id, categoryId: insertedCategories[0].id }, // Work
    { todoId: insertedTodos[2].id, categoryId: insertedCategories[2].id }, // Shopping
    { todoId: insertedTodos[3].id, categoryId: insertedCategories[3].id }, // Health
    { todoId: insertedTodos[3].id, categoryId: insertedCategories[1].id }, // Personal
    { todoId: insertedTodos[4].id, categoryId: insertedCategories[4].id }, // Learning
    { todoId: insertedTodos[5].id, categoryId: insertedCategories[0].id }, // Work
  ];

  for (const assignment of todoCategoryAssignments) {
    db.insert(todoCategories).values(assignment).run();
  }
  console.log(`✅ Assigned categories to todos`);

  console.log('🎉 Database seeding completed!');
  sqlite.close();
}

seed().catch(console.error);
