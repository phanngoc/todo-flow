import { create } from "zustand";
import { api } from "@/lib/api";
import type { Category, CreateCategoryInput, UpdateCategoryInput } from "@demo/shared";

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCategories: () => Promise<void>;
  addCategory: (data: CreateCategoryInput) => Promise<void>;
  updateCategory: (id: number, data: UpdateCategoryInput) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });

    try {
      const categories = await api.get<Category[]>("/categories");
      set({ categories, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch categories",
        isLoading: false,
      });
    }
  },

  addCategory: async (data: CreateCategoryInput) => {
    set({ isLoading: true, error: null });

    try {
      const newCategory = await api.post<Category>("/categories", data);
      set((state) => ({
        categories: [...state.categories, newCategory],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add category",
        isLoading: false,
      });
      throw error;
    }
  },

  updateCategory: async (id: number, data: UpdateCategoryInput) => {
    set({ error: null });

    try {
      const updatedCategory = await api.patch<Category>(`/categories/${id}`, data);
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? updatedCategory : cat
        ),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update category",
      });
      throw error;
    }
  },

  deleteCategory: async (id: number) => {
    set({ error: null });

    try {
      await api.delete(`/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete category",
      });
      throw error;
    }
  },
}));
