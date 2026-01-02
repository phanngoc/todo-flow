import { create } from "zustand";
import { api } from "@/lib/api";
import type {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
  TodoQuery,
  TodoPriority,
  TodoStatus,
  PaginatedResponse,
} from "@demo/shared";

interface TodoFilters {
  search: string;
  status: TodoStatus;
  priority?: TodoPriority;
  categoryId?: number;
  sortBy: "createdAt" | "updatedAt" | "dueDate" | "priority" | "title";
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
}

interface TodoState {
  todos: Todo[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  filters: TodoFilters;

  // Actions
  fetchTodos: () => Promise<void>;
  addTodo: (data: CreateTodoInput) => Promise<void>;
  updateTodo: (id: number, data: UpdateTodoInput) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  setFilters: (filters: Partial<TodoFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: TodoFilters = {
  search: "",
  status: "all",
  priority: undefined,
  categoryId: undefined,
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
  limit: 20,
};

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  total: 0,
  totalPages: 0,
  isLoading: false,
  error: null,
  filters: defaultFilters,

  fetchTodos: async () => {
    set({ isLoading: true, error: null });

    try {
      const { filters } = get();
      const params: Record<string, string | number | undefined> = {
        page: filters.page,
        limit: filters.limit,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        status: filters.status,
      };

      if (filters.search) params.search = filters.search;
      if (filters.priority) params.priority = filters.priority;
      if (filters.categoryId) params.categoryId = filters.categoryId;

      const response = await api.get<PaginatedResponse<Todo>>("/todos", params);

      set({
        todos: response.items,
        total: response.total,
        totalPages: response.totalPages,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch todos",
        isLoading: false,
      });
    }
  },

  addTodo: async (data: CreateTodoInput) => {
    set({ isLoading: true, error: null });

    try {
      await api.post<Todo>("/todos", data);
      await get().fetchTodos();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add todo",
        isLoading: false,
      });
      throw error;
    }
  },

  updateTodo: async (id: number, data: UpdateTodoInput) => {
    set({ error: null });

    try {
      const updatedTodo = await api.patch<Todo>(`/todos/${id}`, data);
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update todo",
      });
      throw error;
    }
  },

  deleteTodo: async (id: number) => {
    set({ error: null });

    try {
      await api.delete(`/todos/${id}`);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        total: state.total - 1,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete todo",
      });
      throw error;
    }
  },

  toggleTodo: async (id: number) => {
    set({ error: null });

    try {
      const updatedTodo = await api.patch<Todo>(`/todos/${id}/toggle`, {});
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to toggle todo",
      });
      throw error;
    }
  },

  setFilters: (newFilters: Partial<TodoFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: 1 },
    }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },
}));
