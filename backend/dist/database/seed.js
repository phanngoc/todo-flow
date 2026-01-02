"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = require("better-sqlite3");
const better_sqlite3_2 = require("drizzle-orm/better-sqlite3");
const fs_1 = require("fs");
const path_1 = require("path");
const schema = require("./schema");
const schema_1 = require("./schema");
const constants_1 = require("../common/constants");
const DB_PATH = './data/todos.db';
async function seed() {
    console.log('🌱 Seeding database...');
    const dir = (0, path_1.dirname)(DB_PATH);
    if (!(0, fs_1.existsSync)(dir)) {
        (0, fs_1.mkdirSync)(dir, { recursive: true });
    }
    const sqlite = new better_sqlite3_1.default(DB_PATH);
    sqlite.pragma(constants_1.SQLITE_PRAGMA.FOREIGN_KEYS_ON);
    const db = (0, better_sqlite3_2.drizzle)(sqlite, { schema });
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
    db.delete(schema_1.todoCategories).run();
    db.delete(schema_1.todos).run();
    db.delete(schema_1.categories).run();
    const categoryData = [
        { name: 'Work', color: 'blue', icon: 'briefcase' },
        { name: 'Personal', color: 'green', icon: 'user' },
        { name: 'Shopping', color: 'orange', icon: 'shopping-cart' },
        { name: 'Health', color: 'red', icon: 'heart' },
        { name: 'Learning', color: 'purple', icon: 'book' },
    ];
    const insertedCategories = [];
    for (const cat of categoryData) {
        const result = db.insert(schema_1.categories).values(cat).returning().get();
        insertedCategories.push(result);
    }
    console.log(`✅ Inserted ${insertedCategories.length} categories`);
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
        const result = db.insert(schema_1.todos).values(todo).returning().get();
        insertedTodos.push(result);
    }
    console.log(`✅ Inserted ${insertedTodos.length} todos`);
    const todoCategoryAssignments = [
        { todoId: insertedTodos[0].id, categoryId: insertedCategories[0].id },
        { todoId: insertedTodos[1].id, categoryId: insertedCategories[0].id },
        { todoId: insertedTodos[2].id, categoryId: insertedCategories[2].id },
        { todoId: insertedTodos[3].id, categoryId: insertedCategories[3].id },
        { todoId: insertedTodos[3].id, categoryId: insertedCategories[1].id },
        { todoId: insertedTodos[4].id, categoryId: insertedCategories[4].id },
        { todoId: insertedTodos[5].id, categoryId: insertedCategories[0].id },
    ];
    for (const assignment of todoCategoryAssignments) {
        db.insert(schema_1.todoCategories).values(assignment).run();
    }
    console.log(`✅ Assigned categories to todos`);
    console.log('🎉 Database seeding completed!');
    sqlite.close();
}
seed().catch(console.error);
//# sourceMappingURL=seed.js.map