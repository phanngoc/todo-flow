"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useTodoStore } from "@/stores/todo-store";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "./priority-badge";
import { CategoryBadge } from "@/components/categories/category-badge";
import { TodoEditDialog } from "./todo-edit-dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Pencil, Calendar, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Todo } from "@demo/shared";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore();
  const { toast } = useToast();
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await toggleTodo(todo.id);
    } catch {
      toast({
        title: "Error",
        description: "Failed to toggle todo",
        variant: "destructive",
      });
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTodo(todo.id);
      toast({
        title: "Deleted",
        description: "Task has been deleted",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete todo",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const isOverdue =
    todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <>
      <div
        className={cn(
          "flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors",
          todo.completed && "opacity-60"
        )}
      >
        {/* Checkbox */}
        <div className="pt-0.5">
          {isToggling ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Checkbox
              checked={todo.completed}
              onCheckedChange={handleToggle}
              aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                "font-medium text-sm leading-tight",
                todo.completed && "line-through text-muted-foreground"
              )}
            >
              {todo.title}
            </h3>
            <PriorityBadge priority={todo.priority} />
          </div>

          {todo.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-2">
            {/* Due date */}
            {todo.dueDate && (
              <Badge
                variant={isOverdue ? "destructive" : "outline"}
                className="text-xs"
              >
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(todo.dueDate), "MMM d, yyyy")}
              </Badge>
            )}

            {/* Categories */}
            {todo.categories?.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsEditOpen(true)}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>

      <TodoEditDialog
        todo={todo}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}
