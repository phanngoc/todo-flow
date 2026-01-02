import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PRIORITY_COLORS } from "@/lib/constants";
import type { TodoPriority } from "@demo/shared";

interface PriorityBadgeProps {
  priority: TodoPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("text-xs capitalize", PRIORITY_COLORS[priority])}
    >
      {priority}
    </Badge>
  );
}
