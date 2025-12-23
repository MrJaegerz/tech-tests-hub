import Link from "next/link";
import { ExternalLink, Calendar, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechnicalTest } from "@/lib/types";

interface TestCardProps {
  test: TechnicalTest;
}

const resultConfig = {
  SUCCESS: {
    variant: "default" as const,
    label: "Réussi",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  PARTIAL: {
    variant: "secondary" as const,
    label: "Partiel",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  FAIL: {
    variant: "destructive" as const,
    label: "Échoué",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
};

export function TestCard({ test }: TestCardProps) {
  const config = resultConfig[test.result];
  const date = new Date(test.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl">{test.title}</CardTitle>
          <Badge className={config.color}>{config.label}</Badge>
        </div>
        {test.description && (
          <CardDescription className="line-clamp-2">{test.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <a href={test.github_url} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Voir le code
          </a>
        </Button>

        <Button asChild variant="ghost" size="sm">
          <Link href={`/tests/${test.id}`}>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
