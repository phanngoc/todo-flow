"use client";

import { useState, useEffect } from "react";
import { useTodoStore } from "@/stores/todo-store";
import { useCategoryStore } from "@/stores/category-store";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export function TodoFilters() {
  const { filters, setFilters, resetFilters, fetchTodos } = useTodoStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFilters({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, setFilters]);

  const hasActiveFilters =
    filters.search ||
    filters.status !== "all" ||
    filters.priority ||
    filters.categoryId;

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Status */}
          <Select
            value={filters.status}
            onValueChange={(value: "all" | "active" | "completed") =>
              setFilters({ status: value })
            }
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority */}
          <Select
            value={filters.priority || "all"}
            onValueChange={(value) =>
              setFilters({
                priority: value === "all" ? undefined : (value as "low" | "medium" | "high" | "urgent"),
              })
            }
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>

          {/* Category */}
          {categories.length > 0 && (
            <Select
              value={filters.categoryId?.toString() || "all"}
              onValueChange={(value) =>
                setFilters({
                  categoryId: value === "all" ? undefined : parseInt(value),
                })
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Sort */}
          <Select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onValueChange={(value) => {
              const [sortBy, sortOrder] = value.split("-") as [
                typeof filters.sortBy,
                typeof filters.sortOrder
              ];
              setFilters({ sortBy, sortOrder });
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest first</SelectItem>
              <SelectItem value="createdAt-asc">Oldest first</SelectItem>
              <SelectItem value="dueDate-asc">Due date (soon)</SelectItem>
              <SelectItem value="dueDate-desc">Due date (later)</SelectItem>
              <SelectItem value="priority-desc">Priority (high)</SelectItem>
              <SelectItem value="priority-asc">Priority (low)</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                resetFilters();
                setSearchInput("");
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear filters</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
