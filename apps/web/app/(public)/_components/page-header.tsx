import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface PageHeaderProps {
  badge?: {
    label: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  title: string | ReactNode;
  description: string;
}

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      {badge && (
        <div className="inline-flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <Badge variant={badge.variant || "secondary"} className="font-medium">
            {badge.label}
          </Badge>
        </div>
      )}

      <h1 className="text-5xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl md:text-7xl">
        {title}
      </h1>

      <p className="max-w-2xl text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}
