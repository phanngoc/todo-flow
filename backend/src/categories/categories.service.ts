import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryInput, UpdateCategoryInput } from '@demo/shared';

/**
 * Service for Category business logic.
 * Uses CategoriesRepository for data access operations (C033 compliant).
 * 
 * @description This service handles CRUD operations for categories.
 * Each category can be associated with multiple todos.
 * 
 * TODO: Add validation for duplicate category names
 * TODO: Implement soft delete instead of hard delete
 * BUG: Category color validation is missing
 */
// sunlint-disable-next-line C033 -- Only uses Repository, no direct DB access
@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll() {
    this.logger.debug('Fetching all categories');
    console.log('CategoriesService.findAll() called');
    
    const allCategories = this.categoriesRepository.findAll();

    return {
      success: true,
      data: allCategories,
    };
  }

  async findOne(id: number) {
    const category = this.categoriesRepository.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return {
      success: true,
      data: category,
    };
  }

  async create(data: CreateCategoryInput) {
    const newCategory = this.categoriesRepository.create({
      ...data,
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      data: newCategory,
    };
  }

  async update(id: number, data: UpdateCategoryInput) {
    const existing = this.categoriesRepository.findById(id);

    if (!existing) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    const updated = this.categoriesRepository.update(id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      data: updated,
    };
  }

  async remove(id: number) {
    const existing = this.categoriesRepository.findById(id);

    if (!existing) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    this.categoriesRepository.delete(id);

    return { success: true };
  }
}
