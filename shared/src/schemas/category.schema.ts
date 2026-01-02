import { z } from 'zod';

// Category colors
export const categoryColorSchema = z.enum([
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'gray',
]);

// Create category
export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(50, 'Category name must be 50 characters or less'),
  color: categoryColorSchema.default('blue'),
  icon: z.string().max(50).optional(),
});

// Update category
export const updateCategorySchema = createCategorySchema.partial();

// Category response
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  color: categoryColorSchema,
  icon: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
