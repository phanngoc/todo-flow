import { TodoList } from "@/components/todos/todo-list";
import { TodoFilters } from "@/components/todos/todo-filters";
import { TodoForm } from "@/components/todos/todo-form";
import { CategoryList } from "@/components/categories/category-list";
import { CheckSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <CheckSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Todo App</h1>
        </div>
        <p className="text-muted-foreground">
          Manage your tasks efficiently with priorities, due dates, and categories.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Categories */}
        <aside className="lg:col-span-1">
          <CategoryList />
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Add Todo Form */}
          <TodoForm />

          {/* Filters */}
          <TodoFilters />

          {/* Todo List */}
          <TodoList />
        </div>
      </div>
    </div>
  );
}
