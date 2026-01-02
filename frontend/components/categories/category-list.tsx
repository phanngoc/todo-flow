"use client";

import { useEffect, useState } from "react";
import { useCategoryStore } from "@/stores/category-store";
import { useTodoStore } from "@/stores/todo-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "./category-badge";
import { CategoryFormDialog } from "./category-form-dialog";
import { Plus, Loader2, Tags } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryList() {
  const { categories, isLoading, fetchCategories } = useCategoryStore();
  const { filters, setFilters } = useTodoStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <Tags className="h-4 w-4" />
              <span>Categories</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsFormOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add category</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : categories.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No categories yet
            </p>
          ) : (
            <div className="space-y-1">
              {/* All categories button */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start",
                  !filters.categoryId && "bg-accent"
                )}
                onClick={() => setFilters({ categoryId: undefined })}
              >
                All Categories
              </Button>

              {/* Category list */}
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start gap-2",
                    filters.categoryId === category.id && "bg-accent"
                  )}
                  onClick={() => setFilters({ categoryId: category.id })}
                >
                  <CategoryBadge category={category} showName={false} />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CategoryFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} />
    </>
  );
}
