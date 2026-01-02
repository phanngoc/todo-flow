"use client";

import { useEffect } from "react";
import { useTodoStore } from "@/stores/todo-store";
import { TodoItem } from "./todo-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ClipboardList } from "lucide-react";

export function TodoList() {
  const { todos, isLoading, error, fetchTodos, filters } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, filters]);

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Tasks</span>
          <span className="text-sm font-normal text-muted-foreground">
            {todos.length} task{todos.length !== 1 ? "s" : ""}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <ClipboardList className="h-12 w-12 mb-2" />
            <p>No tasks found</p>
            <p className="text-sm">Create a new task to get started</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
