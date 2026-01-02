"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  categoryColorSchema: () => categoryColorSchema,
  categorySchema: () => categorySchema,
  createCategorySchema: () => createCategorySchema,
  createTodoSchema: () => createTodoSchema,
  idSchema: () => idSchema,
  paginationSchema: () => paginationSchema,
  sortOrderSchema: () => sortOrderSchema,
  timestampSchema: () => timestampSchema,
  todoPrioritySchema: () => todoPrioritySchema,
  todoQuerySchema: () => todoQuerySchema,
  todoSchema: () => todoSchema,
  todoStatusSchema: () => todoStatusSchema,
  toggleTodoSchema: () => toggleTodoSchema,
  updateCategorySchema: () => updateCategorySchema,
  updateTodoSchema: () => updateTodoSchema
});
module.exports = __toCommonJS(index_exports);

// src/schemas/common.schema.ts
var import_zod = require("zod");
var idSchema = import_zod.z.coerce.number().int().positive();
var paginationSchema = import_zod.z.object({
  page: import_zod.z.coerce.number().int().positive().default(1),
  limit: import_zod.z.coerce.number().int().positive().max(100).default(20)
});
var sortOrderSchema = import_zod.z.enum(["asc", "desc"]).default("desc");
var timestampSchema = import_zod.z.object({
  createdAt: import_zod.z.string().datetime(),
  updatedAt: import_zod.z.string().datetime()
});

// src/schemas/category.schema.ts
var import_zod2 = require("zod");
var categoryColorSchema = import_zod2.z.enum([
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "gray"
]);
var createCategorySchema = import_zod2.z.object({
  name: import_zod2.z.string().min(1, "Category name is required").max(50, "Category name must be 50 characters or less"),
  color: categoryColorSchema.default("blue"),
  icon: import_zod2.z.string().max(50).optional()
});
var updateCategorySchema = createCategorySchema.partial();
var categorySchema = import_zod2.z.object({
  id: import_zod2.z.number(),
  name: import_zod2.z.string(),
  color: categoryColorSchema,
  icon: import_zod2.z.string().nullable(),
  createdAt: import_zod2.z.string(),
  updatedAt: import_zod2.z.string()
});

// src/schemas/todo.schema.ts
var import_zod3 = require("zod");
var todoPrioritySchema = import_zod3.z.enum(["low", "medium", "high", "urgent"]);
var todoStatusSchema = import_zod3.z.enum(["all", "active", "completed"]);
var createTodoSchema = import_zod3.z.object({
  title: import_zod3.z.string().min(1, "Title is required").max(200, "Title must be 200 characters or less"),
  description: import_zod3.z.string().max(2e3, "Description must be 2000 characters or less").optional(),
  priority: todoPrioritySchema.default("medium"),
  dueDate: import_zod3.z.string().datetime().optional().nullable(),
  categoryIds: import_zod3.z.array(import_zod3.z.number()).default([])
});
var updateTodoSchema = createTodoSchema.partial().extend({
  completed: import_zod3.z.boolean().optional()
});
var toggleTodoSchema = import_zod3.z.object({
  completed: import_zod3.z.boolean()
});
var todoQuerySchema = import_zod3.z.object({
  search: import_zod3.z.string().optional(),
  status: todoStatusSchema.default("all"),
  priority: todoPrioritySchema.optional(),
  categoryId: import_zod3.z.coerce.number().optional(),
  sortBy: import_zod3.z.enum(["createdAt", "updatedAt", "dueDate", "priority", "title"]).default("createdAt"),
  sortOrder: sortOrderSchema
}).merge(paginationSchema);
var todoSchema = import_zod3.z.object({
  id: import_zod3.z.number(),
  title: import_zod3.z.string(),
  description: import_zod3.z.string().nullable(),
  priority: todoPrioritySchema,
  dueDate: import_zod3.z.string().nullable(),
  completed: import_zod3.z.boolean(),
  createdAt: import_zod3.z.string(),
  updatedAt: import_zod3.z.string(),
  categories: import_zod3.z.array(
    import_zod3.z.object({
      id: import_zod3.z.number(),
      name: import_zod3.z.string(),
      color: import_zod3.z.string()
    })
  )
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
