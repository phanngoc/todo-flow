import { z } from 'zod';
import {
  categoryColorSchema,
  categorySchema,
  createCategorySchema,
  updateCategorySchema,
} from '../schemas/category.schema';

export type CategoryColor = z.infer<typeof categoryColorSchema>;
export type Category = z.infer<typeof categorySchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
