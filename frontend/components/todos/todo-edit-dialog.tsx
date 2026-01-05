"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodoStore } from "@/stores/todo-store";
import { useCategoryStore } from "@/stores/category-store";
import { useToast } from "@/hooks/use-toast";
import { updateTodoSchema, type UpdateTodoInput, type Todo } from "@demo/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface TodoEditDialogProps {
  todo: Todo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TodoEditDialog({ todo, open, onOpenChange }: TodoEditDialogProps) {
  const { updateTodo } = useTodoStore();
  const { categories } = useCategoryStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateTodoInput>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description || "",
      priority: todo.priority,
      dueDate: todo.dueDate || undefined,
      categoryIds: todo.categories?.map((c) => c.id) || [],
    },
  });

  const priority = watch("priority");
  const categoryIds = watch("categoryIds") || [];

  const onSubmit = async (data: UpdateTodoInput) => {
    setIsSubmitting(true);
    try {
      await updateTodo(todo.id, data);
      onOpenChange(false);
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title *</Label>
            <Input id="edit-title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea id="edit-description" {...register("description")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={priority}
                onValueChange={(value) =>
                  setValue("priority", value as UpdateTodoInput["priority"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-dueDate">Due Date</Label>
              <Input
                id="edit-dueDate"
                type="datetime-local"
                {...register("dueDate")}
              />
            </div>
          </div>

          {categories.length > 0 && (
            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (categoryIds.includes(category.id)) {
                        setValue(
                          "categoryIds",
                          categoryIds.filter((id) => id !== category.id)
                        );
                      } else {
                        setValue("categoryIds", [...categoryIds, category.id]);
                      }
                    }}
                    className={
                      categoryIds.includes(category.id)
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
