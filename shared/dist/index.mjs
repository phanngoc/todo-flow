// src/schemas/common.schema.ts
import { z } from "zod";
var idSchema = z.coerce.number().int().positive();
var paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20)
});
var sortOrderSchema = z.enum(["asc", "desc"]).default("desc");
var timestampSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// src/schemas/category.schema.ts
import { z as z2 } from "zod";
var categoryColorSchema = z2.enum([
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "gray"
]);
var createCategorySchema = z2.object({
  name: z2.string().min(1, "Category name is required").max(50, "Category name must be 50 characters or less"),
  color: categoryColorSchema.default("blue"),
  icon: z2.string().max(50).optional()
});
var updateCategorySchema = createCategorySchema.partial();
var categorySchema = z2.object({
  id: z2.number(),
  name: z2.string(),
  color: categoryColorSchema,
  icon: z2.string().nullable(),
  createdAt: z2.string(),
  updatedAt: z2.string()
});

// src/schemas/todo.schema.ts
import { z as z3 } from "zod";
var todoPrioritySchema = z3.enum(["low", "medium", "high", "urgent"]);
var todoStatusSchema = z3.enum(["all", "active", "completed"]);
var createTodoSchema = z3.object({
  title: z3.string().min(1, "Title is required").max(200, "Title must be 200 characters or less"),
  description: z3.string().max(2e3, "Description must be 2000 characters or less").optional(),
  priority: todoPrioritySchema.default("medium"),
  dueDate: z3.string().datetime().optional().nullable(),
  categoryIds: z3.array(z3.number()).default([])
});
var updateTodoSchema = createTodoSchema.partial().extend({
  completed: z3.boolean().optional()
});
var toggleTodoSchema = z3.object({
  completed: z3.boolean()
});
var todoQuerySchema = z3.object({
  search: z3.string().optional(),
  status: todoStatusSchema.default("all"),
  priority: todoPrioritySchema.optional(),
  categoryId: z3.coerce.number().optional(),
  sortBy: z3.enum(["createdAt", "updatedAt", "dueDate", "priority", "title"]).default("createdAt"),
  sortOrder: sortOrderSchema
}).merge(paginationSchema);
var todoSchema = z3.object({
  id: z3.number(),
  title: z3.string(),
  description: z3.string().nullable(),
  priority: todoPrioritySchema,
  dueDate: z3.string().nullable(),
  completed: z3.boolean(),
  createdAt: z3.string(),
  updatedAt: z3.string(),
  categories: z3.array(
    z3.object({
      id: z3.number(),
      name: z3.string(),
      color: z3.string()
    })
  )
});
export {
  categoryColorSchema,
  categorySchema,
  createCategorySchema,
  createTodoSchema,
  idSchema,
  paginationSchema,
  sortOrderSchema,
  timestampSchema,
  todoPrioritySchema,
  todoQuerySchema,
  todoSchema,
  todoStatusSchema,
  toggleTodoSchema,
  updateCategorySchema,
  updateTodoSchema
};
