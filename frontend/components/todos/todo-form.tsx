"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodoStore } from "@/stores/todo-store";
import { useCategoryStore } from "@/stores/category-store";
import { useToast } from "@/hooks/use-toast";
import { createTodoSchema, type CreateTodoInput } from "@demo/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2, ChevronDown, ChevronUp } from "lucide-react";

export function TodoForm() {
  const { addTodo } = useTodoStore();
  const { categories } = useCategoryStore();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      dueDate: undefined,
      categoryIds: [],
    },
  });

  const priority = watch("priority");

  const onSubmit = async (data: CreateTodoInput) => {
    setIsSubmitting(true);
    try {
      // Transform dueDate to ISO 8601 format if present and not empty
      const transformedData = {
        ...data,
        dueDate: data.dueDate && data.dueDate.trim() !== "" 
          ? new Date(data.dueDate).toISOString() 
          : null,
      };
      await addTodo(transformedData);
      reset();
      setIsExpanded(false);
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Add New Task</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title - always visible */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="What needs to be done?"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Expanded fields */}
          {isExpanded && (
            <>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add more details..."
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={priority}
                    onValueChange={(value) =>
                      setValue("priority", value as CreateTodoInput["priority"])
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
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
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
                          const current = watch("categoryIds") || [];
                          if (current.includes(category.id)) {
                            setValue(
                              "categoryIds",
                              current.filter((id) => id !== category.id)
                            );
                          } else {
                            setValue("categoryIds", [...current, category.id]);
                          }
                        }}
                        className={
                          watch("categoryIds")?.includes(category.id)
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
            </>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
