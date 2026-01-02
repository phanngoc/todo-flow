import { z } from 'zod';

// ID schema
export const idSchema = z.coerce.number().int().positive();

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// Sort order
export const sortOrderSchema = z.enum(['asc', 'desc']).default('desc');

// Base timestamp fields
export const timestampSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
