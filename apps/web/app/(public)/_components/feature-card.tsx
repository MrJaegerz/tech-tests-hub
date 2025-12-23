import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconBgColor?: string;
  iconColor?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  iconBgColor = "bg-blue-100 dark:bg-blue-900/30",
  iconColor = "text-blue-600 dark:text-blue-400"
}: FeatureCardProps) {
  return (
    <Card className="transition-all hover:border-zinc-300 hover:shadow-lg dark:hover:border-zinc-700">
      <CardHeader>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBgColor} mb-3`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
