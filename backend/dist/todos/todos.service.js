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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const todos_repository_1 = require("./todos.repository");
let TodosService = class TodosService {
    constructor(todosRepository) {
        this.todosRepository = todosRepository;
    }
    async findAll(query) {
        const { search, status, priority, categoryId, sortBy, sortOrder, page, limit } = query;
        const conditions = [];
        if (search) {
            conditions.push(this.todosRepository.buildSearchCondition(search));
        }
        if (status === 'active' || status === 'completed') {
            conditions.push(this.todosRepository.buildStatusCondition(status));
        }
        if (priority) {
            conditions.push(this.todosRepository.buildPriorityCondition(priority));
        }
        let todoIdsForCategory = null;
        if (categoryId) {
            todoIdsForCategory = this.todosRepository.findTodoIdsByCategory(categoryId);
            if (todoIdsForCategory.length === 0) {
                return {
                    success: true,
                    data: {
                        items: [],
                        total: 0,
                        page,
                        limit,
                        totalPages: 0,
                    },
                };
            }
        }
        const orderColumn = this.todosRepository.getOrderColumn(sortBy || 'createdAt');
        const total = this.todosRepository.count(conditions.length > 0 ? conditions : undefined);
        const todoList = this.todosRepository.findAll({
            conditions: conditions.length > 0 ? conditions : undefined,
            orderColumn,
            sortOrder: sortOrder || 'desc',
            limit,
            offset: (page - 1) * limit,
        });
        let filteredTodos = todoList;
        if (todoIdsForCategory) {
            filteredTodos = todoList.filter((t) => todoIdsForCategory.includes(t.id));
        }
        const todosWithCategories = await Promise.all(filteredTodos.map(async (todo) => {
            const todoCats = this.todosRepository.findCategoriesByTodoId(todo.id);
            return {
                ...todo,
                categories: todoCats,
            };
        }));
        return {
            success: true,
            data: {
                items: todosWithCategories,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const todo = this.todosRepository.findById(id);
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        const todoCats = this.todosRepository.findCategoriesByTodoId(id);
        return {
            success: true,
            data: {
                ...todo,
                categories: todoCats,
            },
        };
    }
    async create(data) {
        const { categoryIds, ...todoData } = data;
        const newTodo = this.todosRepository.create({
            ...todoData,
            updatedAt: new Date().toISOString(),
        });
        if (categoryIds && categoryIds.length > 0) {
            for (const categoryId of categoryIds) {
                this.todosRepository.addCategoryToTodo(newTodo.id, categoryId);
            }
        }
        return this.findOne(newTodo.id);
    }
    async update(id, data) {
        const existing = this.todosRepository.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        const { categoryIds, ...todoData } = data;
        this.todosRepository.update(id, {
            ...todoData,
            updatedAt: new Date().toISOString(),
        });
        if (categoryIds !== undefined) {
            this.todosRepository.removeCategoriesFromTodo(id);
            for (const categoryId of categoryIds) {
                this.todosRepository.addCategoryToTodo(id, categoryId);
            }
        }
        return this.findOne(id);
    }
    async toggle(id) {
        const todo = this.todosRepository.findById(id);
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        this.todosRepository.update(id, {
            completed: !todo.completed,
            updatedAt: new Date().toISOString(),
        });
        return this.findOne(id);
    }
    async remove(id) {
        const todo = this.todosRepository.findById(id);
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        this.todosRepository.delete(id);
        return { success: true };
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [todos_repository_1.TodosRepository])
], TodosService);
//# sourceMappingURL=todos.service.js.map