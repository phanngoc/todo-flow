import { cn } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/constants";

interface CategoryBadgeProps {
  category: {
    id: number;
    name: string;
    color: string;
  };
  showName?: boolean;
}

export function CategoryBadge({ category, showName = true }: CategoryBadgeProps) {
  const colorClass = CATEGORY_COLORS[category.color as keyof typeof CATEGORY_COLORS] || "bg-gray-500";

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn("h-2 w-2 rounded-full", colorClass)}
        aria-hidden="true"
      />
      {showName && (
        <span className="text-xs text-muted-foreground">{category.name}</span>
      )}
    </span>
  );
}
