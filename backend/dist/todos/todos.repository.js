"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosRepository = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
const database_module_1 = require("../database/database.module");
const schema_1 = require("../database/schema");
let TodosRepository = class TodosRepository {
    constructor(db) {
        this.db = db;
    }
    buildWhereClause(conditions) {
        if (!conditions || conditions.length === 0) {
            return undefined;
        }
        return (0, drizzle_orm_1.and)(...conditions);
    }
    getSortFunction(sortOrder) {
        return sortOrder === 'asc' ? drizzle_orm_1.asc : drizzle_orm_1.desc;
    }
    findAll(options) {
        const { conditions, orderColumn, sortOrder, limit, offset } = options;
        const whereClause = this.buildWhereClause(conditions);
        const sortFunction = this.getSortFunction(sortOrder);
        if (whereClause) {
            return this.db
                .select()
                .from(schema_1.todos)
                .where(whereClause)
                .orderBy(sortFunction(orderColumn))
                .limit(limit)
                .offset(offset)
                .all();
        }
        return this.db
            .select()
            .from(schema_1.todos)
            .orderBy(sortFunction(orderColumn))
            .limit(limit)
            .offset(offset)
            .all();
    }
    count(conditions) {
        const whereClause = this.buildWhereClause(conditions);
        const result = whereClause
            ? this.db.select({ count: (0, drizzle_orm_1.sql) `count(*)` }).from(schema_1.todos).where(whereClause).all()
            : this.db.select({ count: (0, drizzle_orm_1.sql) `count(*)` }).from(schema_1.todos).all();
        return result[0]?.count || 0;
    }
    findById(id) {
        return this.db.select().from(schema_1.todos).where((0, drizzle_orm_1.eq)(schema_1.todos.id, id)).get();
    }
    create(data) {
        return this.db.insert(schema_1.todos).values(data).returning().get();
    }
    update(id, data) {
        this.db.update(schema_1.todos).set(data).where((0, drizzle_orm_1.eq)(schema_1.todos.id, id)).run();
    }
    delete(id) {
        this.db.delete(schema_1.todos).where((0, drizzle_orm_1.eq)(schema_1.todos.id, id)).run();
    }
    findTodoIdsByCategory(categoryId) {
        const results = this.db
            .select({ todoId: schema_1.todoCategories.todoId })
            .from(schema_1.todoCategories)
            .where((0, drizzle_orm_1.eq)(schema_1.todoCategories.categoryId, categoryId))
            .all();
        return results.map((r) => r.todoId);
    }
    findCategoriesByTodoId(todoId) {
        return this.db
            .select({
            id: schema_1.categories.id,
            name: schema_1.categories.name,
            color: schema_1.categories.color,
        })
            .from(schema_1.todoCategories)
            .innerJoin(schema_1.categories, (0, drizzle_orm_1.eq)(schema_1.todoCategories.categoryId, schema_1.categories.id))
            .where((0, drizzle_orm_1.eq)(schema_1.todoCategories.todoId, todoId))
            .all();
    }
    addCategoryToTodo(todoId, categoryId) {
        this.db.insert(schema_1.todoCategories).values({ todoId, categoryId }).run();
    }
    removeCategoriesFromTodo(todoId) {
        this.db.delete(schema_1.todoCategories).where((0, drizzle_orm_1.eq)(schema_1.todoCategories.todoId, todoId)).run();
    }
    buildSearchCondition(search) {
        return (0, drizzle_orm_1.like)(schema_1.todos.title, `%${search}%`);
    }
    buildStatusCondition(status) {
        return (0, drizzle_orm_1.eq)(schema_1.todos.completed, status === 'completed');
    }
    buildPriorityCondition(priority) {
        return (0, drizzle_orm_1.eq)(schema_1.todos.priority, priority);
    }
    getOrderColumn(sortBy) {
        const columns = {
            createdAt: schema_1.todos.createdAt,
            updatedAt: schema_1.todos.updatedAt,
            dueDate: schema_1.todos.dueDate,
            priority: schema_1.todos.priority,
            title: schema_1.todos.title,
        };
        return columns[sortBy] || schema_1.todos.createdAt;
    }
};
exports.TodosRepository = TodosRepository;
exports.TodosRepository = TodosRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DRIZZLE)),
    __metadata("design:paramtypes", [better_sqlite3_1.BetterSQLite3Database])
], TodosRepository);
//# sourceMappingURL=todos.repository.js.map