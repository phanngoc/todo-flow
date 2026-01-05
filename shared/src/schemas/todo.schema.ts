import { z } from 'zod';
import { paginationSchema, sortOrderSchema } from './common.schema';

// Priority levels
export const todoPrioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);

// Todo status
export const todoStatusSchema = z.enum(['all', 'active', 'completed']);

// Create todo
export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or less'),
  description: z
    .string()
    .max(2000, 'Description must be 2000 characters or less')
    .optional(),
  priority: todoPrioritySchema.default('medium'),
  dueDate: z.string().optional().nullable(),
  categoryIds: z.array(z.number()).default([]),
});

// Update todo
export const updateTodoSchema = createTodoSchema.partial().extend({
  completed: z.boolean().optional(),
});

// Toggle todo completion
export const toggleTodoSchema = z.object({
  completed: z.boolean(),
});

// Todo query/filter
export const todoQuerySchema = z
  .object({
    search: z.string().optional(),
    status: todoStatusSchema.default('all'),
    priority: todoPrioritySchema.optional(),
    categoryId: z.coerce.number().optional(),
    sortBy: z.enum(['createdAt', 'updatedAt', 'dueDate', 'priority', 'title']).default('createdAt'),
    sortOrder: sortOrderSchema,
  })
  .merge(paginationSchema);

// Todo response (from API)
export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  priority: todoPrioritySchema,
  dueDate: z.string().nullable(),
  completed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  categories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      color: z.string(),
    })
  ),
});
