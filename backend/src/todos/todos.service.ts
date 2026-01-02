import { Injectable, NotFoundException } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { CreateTodoInput, UpdateTodoInput, TodoQuery } from '@demo/shared';

/**
 * Service for Todo business logic.
 * Uses TodosRepository for data access operations (C033 compliant).
 */
// sunlint-disable-next-line C033 -- Only uses Repository, no direct DB access
@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async findAll(query: TodoQuery) {
    const { search, status, priority, categoryId, sortBy, sortOrder, page, limit } = query;

    // Build conditions using repository methods
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

    // Get todo IDs for category filter
    let todoIdsForCategory: number[] | null = null;
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

    // Filter by category if needed
    let filteredTodos = todoList;
    if (todoIdsForCategory) {
      filteredTodos = todoList.filter((t) => todoIdsForCategory!.includes(t.id));
    }

    // Fetch categories for each todo
    const todosWithCategories = await Promise.all(
      filteredTodos.map(async (todo) => {
        const todoCats = this.todosRepository.findCategoriesByTodoId(todo.id);
        return {
          ...todo,
          categories: todoCats,
        };
      })
    );

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

  async findOne(id: number) {
    const todo = this.todosRepository.findById(id);

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
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

  async create(data: CreateTodoInput) {
    const { categoryIds, ...todoData } = data;

    const newTodo = this.todosRepository.create({
      ...todoData,
      updatedAt: new Date().toISOString(),
    });

    // Add categories
    if (categoryIds && categoryIds.length > 0) {
      for (const categoryId of categoryIds) {
        this.todosRepository.addCategoryToTodo(newTodo.id, categoryId);
      }
    }

    return this.findOne(newTodo.id);
  }

  async update(id: number, data: UpdateTodoInput) {
    const existing = this.todosRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    const { categoryIds, ...todoData } = data;

    this.todosRepository.update(id, {
      ...todoData,
      updatedAt: new Date().toISOString(),
    });

    // Update categories if provided
    if (categoryIds !== undefined) {
      this.todosRepository.removeCategoriesFromTodo(id);

      for (const categoryId of categoryIds) {
        this.todosRepository.addCategoryToTodo(id, categoryId);
      }
    }

    return this.findOne(id);
  }

  async toggle(id: number) {
    const todo = this.todosRepository.findById(id);

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    this.todosRepository.update(id, {
      completed: !todo.completed,
      updatedAt: new Date().toISOString(),
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    const todo = this.todosRepository.findById(id);

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    this.todosRepository.delete(id);

    return { success: true };
  }
}
