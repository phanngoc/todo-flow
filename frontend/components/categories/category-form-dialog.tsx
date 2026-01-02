"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoryStore } from "@/stores/category-store";
import { useToast } from "@/hooks/use-toast";
import { createCategorySchema, type CreateCategoryInput } from "@demo/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { cn } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/constants";

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const colorOptions = Object.keys(CATEGORY_COLORS) as Array<keyof typeof CATEGORY_COLORS>;

export function CategoryFormDialog({ open, onOpenChange }: CategoryFormDialogProps) {
  const { addCategory } = useCategoryStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      color: "blue",
      icon: "",
    },
  });

  const selectedColor = watch("color");

  const onSubmit = async (data: CreateCategoryInput) => {
    setIsSubmitting(true);
    try {
      await addCategory(data);
      reset();
      onOpenChange(false);
      toast({
        title: "Success",
        description: "Category created successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Name *</Label>
            <Input
              id="cat-name"
              placeholder="Category name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-all",
                    CATEGORY_COLORS[color],
                    selectedColor === color
                      ? "border-foreground scale-110"
                      : "border-transparent hover:scale-105"
                  )}
                  onClick={() => setValue("color", color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cat-icon">Icon (optional)</Label>
            <Input
              id="cat-icon"
              placeholder="e.g., briefcase, home, star"
              {...register("icon")}
            />
          </div>

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
              Create Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
