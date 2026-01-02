import { z } from 'zod';
import {
  createTodoSchema,
  todoPrioritySchema,
  todoQuerySchema,
  todoSchema,
  todoStatusSchema,
  updateTodoSchema,
} from '../schemas/todo.schema';

export type TodoPriority = z.infer<typeof todoPrioritySchema>;
export type TodoStatus = z.infer<typeof todoStatusSchema>;
export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoQuery = z.infer<typeof todoQuerySchema>;
