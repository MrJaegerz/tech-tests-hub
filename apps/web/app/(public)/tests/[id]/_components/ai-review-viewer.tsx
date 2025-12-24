"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MarkdownViewer } from "./markdown-viewer";

interface AIReviewViewerProps {
  content: string;
}

interface ScoreCriteria {
  critere: string;
  note: string;
  commentaire: string;
}

function extractScoreData(content: string): {
  finalScore: number | null;
  criteria: ScoreCriteria[];
} {
  const scoreMatch = content.match(/\*\*Note finale\s*:\s*([\d.]+)\/5\*\*/);
  const finalScore = scoreMatch ? parseFloat(scoreMatch[1]) : null;

  const criteria: ScoreCriteria[] = [];
  const tableMatch = content.match(
    /## 📊 Score Global[\s\S]*?\| Critère \| Note \| Commentaire \|[\s\S]*?\n((?:\|[^\n]+\n)+)/
  );

  if (tableMatch) {
    const rows = tableMatch[1].trim().split("\n");
    rows.forEach((row) => {
      const cells = row.split("|").filter((cell) => cell.trim());
      if (cells.length >= 3 && !cells[0].includes("---")) {
        criteria.push({
          critere: cells[0].trim(),
          note: cells[1].trim(),
          commentaire: cells[2].trim(),
        });
      }
    });
  }

  return { finalScore, criteria };
}

function getScoreColor(score: number): string {
  if (score >= 4.5) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 4) return "text-blue-600 dark:text-blue-400";
  if (score >= 3) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

function getScoreBadgeVariant(
  note: string
): "default" | "secondary" | "destructive" | "outline" {
  const score = parseFloat(note);
  if (score >= 4.5) return "default";
  if (score >= 4) return "secondary";
  if (score >= 3) return "outline";
  return "destructive";
}

export function AIReviewViewer({ content }: AIReviewViewerProps) {
  const { finalScore, criteria } = extractScoreData(content);

  return (
    <div className="space-y-6">
      {/* Header avec score */}
      <Card className="border-blue-200 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl text-blue-900 dark:text-blue-100">
                  Code Review par Claude (Anthropic)
                </CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-300 mt-1">
                  Analyse approfondie avec recommandations d'amélioration
                </CardDescription>
              </div>
            </div>

            {finalScore !== null && (
              <div className="flex flex-col items-center justify-center px-6 py-4 rounded-xl bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-800 shadow-sm min-w-[130px]">
                <div
                  className={`text-4xl font-bold ${getScoreColor(finalScore)}`}
                >
                  {finalScore}
                </div>
                <div className="text-sm font-medium text-muted-foreground mt-1">
                  sur 5.0
                </div>
                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(finalScore)
                          ? "text-yellow-400 drop-shadow-sm"
                          : "text-zinc-300 dark:text-zinc-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        {criteria.length > 0 && (
          <CardContent className="pt-0">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {criteria.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 p-4 rounded-lg bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {item.critere}
                    </span>
                    <Badge
                      variant={getScoreBadgeVariant(item.note)}
                      className="shrink-0"
                    >
                      {item.note}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.commentaire}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Contenu markdown */}
      <Card>
        <CardContent className="pt-6">
          <MarkdownViewer content={content} />
        </CardContent>
      </Card>
    </div>
  );
}
