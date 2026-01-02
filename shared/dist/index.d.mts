import { z } from 'zod';

declare const idSchema: z.ZodNumber;
declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
declare const sortOrderSchema: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
declare const timestampSchema: z.ZodObject<{
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
}, {
    createdAt: string;
    updatedAt: string;
}>;

declare const categoryColorSchema: z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>;
declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    color: z.ZodDefault<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
    icon: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    color: "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "gray";
    icon?: string | undefined;
}, {
    name: string;
    color?: "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "gray" | undefined;
    icon?: string | undefined;
}>;
declare const updateCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodDefault<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>>;
    icon: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    color?: "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "gray" | undefined;
    icon?: string | undefined;
}, {
    name?: string | undefined;
    color?: "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "gray" | undefined;
    icon?: string | undefined;
}>;
declare const categorySchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    color: z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>;
    icon: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    name: string;
    color: "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "gray";
    icon: string | null;
    id: number;
}, {
    createdAt: string;
    updatedAt: string;
    name: string;
    color: "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "gray";
    icon: string | null;
    id: number;
}>;

declare const todoPrioritySchema: z.ZodEnum<["low", "medium", "high", "urgent"]>;
declare const todoStatusSchema: z.ZodEnum<["all", "active", "completed"]>;
declare const createTodoSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high", "urgent"]>>;
    dueDate: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    categoryIds: z.ZodDefault<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    priority: "low" | "medium" | "high" | "urgent";
    categoryIds: number[];
    description?: string | undefined;
    dueDate?: string | null | undefined;
}, {
    title: string;
    description?: string | undefined;
    priority?: "low" | "medium" | "high" | "urgent" | undefined;
    dueDate?: string | null | undefined;
    categoryIds?: number[] | undefined;
}>;
declare const updateTodoSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<["low", "medium", "high", "urgent"]>>>;
    dueDate: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    categoryIds: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodNumber, "many">>>;
} & {
    completed: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    completed?: boolean | undefined;
    title?: string | undefined;
    description?: string | undefined;
    priority?: "low" | "medium" | "high" | "urgent" | undefined;
    dueDate?: string | null | undefined;
    categoryIds?: number[] | undefined;
}, {
    completed?: boolean | undefined;
    title?: string | undefined;
    description?: string | undefined;
    priority?: "low" | "medium" | "high" | "urgent" | undefined;
    dueDate?: string | null | undefined;
    categoryIds?: number[] | undefined;
}>;
declare const toggleTodoSchema: z.ZodObject<{
    completed: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    completed: boolean;
}, {
    completed: boolean;
}>;
declare const todoQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["all", "active", "completed"]>>;
    priority: z.ZodOptional<z.ZodEnum<["low", "medium", "high", "urgent"]>>;
    categoryId: z.ZodOptional<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "dueDate", "priority", "title"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    status: "all" | "active" | "completed";
    sortBy: "createdAt" | "updatedAt" | "title" | "priority" | "dueDate";
    sortOrder: "asc" | "desc";
    priority?: "low" | "medium" | "high" | "urgent" | undefined;
    search?: string | undefined;
    categoryId?: number | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    status?: "all" | "active" | "completed" | undefined;
    priority?: "low" | "medium" | "high" | "urgent" | undefined;
    search?: string | undefined;
    categoryId?: number | undefined;
    sortBy?: "createdAt" | "updatedAt" | "title" | "priority" | "dueDate" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>;
declare const todoSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    priority: z.ZodEnum<["low", "medium", "high", "urgent"]>;
    dueDate: z.ZodNullable<z.ZodString>;
    completed: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    categories: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        color: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        color: string;
        id: number;
    }, {
        name: string;
        color: string;
        id: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    id: number;
    completed: boolean;
    title: string;
    description: string | null;
    priority: "low" | "medium" | "high" | "urgent";
    dueDate: string | null;
    categories: {
        name: string;
        color: string;
        id: number;
    }[];
}, {
    createdAt: string;
    updatedAt: string;
    id: number;
    completed: boolean;
    title: string;
    description: string | null;
    priority: "low" | "medium" | "high" | "urgent";
    dueDate: string | null;
    categories: {
        name: string;
        color: string;
        id: number;
    }[];
}>;

type Id = z.infer<typeof idSchema>;
type Pagination = z.infer<typeof paginationSchema>;
type SortOrder = z.infer<typeof sortOrderSchema>;

type CategoryColor = z.infer<typeof categoryColorSchema>;
type Category = z.infer<typeof categorySchema>;
type CreateCategoryInput = z.infer<typeof createCategorySchema>;
type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

type TodoPriority = z.infer<typeof todoPrioritySchema>;
type TodoStatus = z.infer<typeof todoStatusSchema>;
type Todo = z.infer<typeof todoSchema>;
type CreateTodoInput = z.infer<typeof createTodoSchema>;
type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
type TodoQuery = z.infer<typeof todoQuerySchema>;

interface ApiResponse<T> {
    success: true;
    data: T;
}
interface ApiErrorResponse {
    success: false;
    error: {
        message: string;
        code?: string;
        details?: Record<string, string[]>;
    };
}
type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;
interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
interface ListResponse<T> {
    success: true;
    data: PaginatedResponse<T>;
}

export { type ApiErrorResponse, type ApiResponse, type ApiResult, type Category, type CategoryColor, type CreateCategoryInput, type CreateTodoInput, type Id, type ListResponse, type PaginatedResponse, type Pagination, type SortOrder, type Todo, type TodoPriority, type TodoQuery, type TodoStatus, type UpdateCategoryInput, type UpdateTodoInput, categoryColorSchema, categorySchema, createCategorySchema, createTodoSchema, idSchema, paginationSchema, sortOrderSchema, timestampSchema, todoPrioritySchema, todoQuerySchema, todoSchema, todoStatusSchema, toggleTodoSchema, updateCategorySchema, updateTodoSchema };
