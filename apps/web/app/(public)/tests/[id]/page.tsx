import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchTestById } from "@/lib/api";
import { ArrowLeft, Calendar, Code2, ExternalLink, Play } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AIReviewViewer } from "./_components/ai-review-viewer";
import { CodeViewer } from "./_components/code-viewer";
import { MarkdownViewer } from "./_components/markdown-viewer";
import { UIPreview } from "./_components/ui-preview";

interface TestDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const resultConfig = {
  SUCCESS: {
    label: "Réussi",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  PARTIAL: {
    label: "Partiel",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  FAIL: {
    label: "Échoué",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
};

export default async function TestDetailPage({ params }: TestDetailPageProps) {
  const { id } = await params;
  let test;

  try {
    test = await fetchTestById(id);
  } catch (error) {
    notFound();
  }

  const config = resultConfig[test.result];
  const createdDate = new Date(test.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updatedDate = new Date(test.updated_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      <div className="container mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/tests">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux tests
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-3xl">{test.title}</CardTitle>
                {test.description && (
                  <CardDescription className="mt-2 text-base">
                    {test.description}
                  </CardDescription>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Badge className={config.color}>{config.label}</Badge>
                {test.test_type && (
                  <Badge variant="outline" className="text-xs">
                    {test.test_type}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Créé le
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{createdDate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Modifié le
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{updatedDate}</span>
                </div>
              </div>
            </div>

            <Separator />

            {test.requirements_markdown ||
            test.solution_files ||
            test.review_ia ? (
              <Tabs
                defaultValue={
                  test.test_type === "UI"
                    ? "preview"
                    : test.requirements_markdown
                    ? "requirements"
                    : "solution"
                }
                className="w-full"
              >
                <TabsList
                  className="grid w-full"
                  style={{
                    gridTemplateColumns: `repeat(${
                      [
                        test.requirements_markdown,
                        test.solution_files && test.solution_files.length > 0,
                        test.test_type === "UI" &&
                          test.solution_files &&
                          test.solution_files.length > 0,
                        test.review_ia,
                        true,
                      ].filter(Boolean).length
                    }, minmax(0, 1fr))`,
                  }}
                >
                  {test.requirements_markdown && (
                    <TabsTrigger value="requirements">Exigences</TabsTrigger>
                  )}
                  {test.test_type === "UI" &&
                    test.solution_files &&
                    test.solution_files.length > 0 && (
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    )}
                  {test.solution_files && test.solution_files.length > 0 && (
                    <TabsTrigger value="solution">Code</TabsTrigger>
                  )}
                  {test.review_ia && (
                    <TabsTrigger value="recommendations">
                      Améliorations
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="github">GitHub</TabsTrigger>
                </TabsList>

                {test.requirements_markdown && (
                  <TabsContent value="requirements" className="mt-6">
                    <MarkdownViewer content={test.requirements_markdown} />
                  </TabsContent>
                )}

                {test.test_type === "UI" &&
                  test.solution_files &&
                  test.solution_files.length > 0 && (
                    <TabsContent value="preview" className="mt-6">
                      <UIPreview files={test.solution_files} />
                    </TabsContent>
                  )}

                {test.solution_files && test.solution_files.length > 0 && (
                  <TabsContent value="solution" className="mt-6">
                    <CodeViewer files={test.solution_files} />
                  </TabsContent>
                )}

                {test.review_ia && (
                  <TabsContent value="recommendations" className="mt-6">
                    <AIReviewViewer content={test.review_ia} />
                  </TabsContent>
                )}

                <TabsContent value="github" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Code Source</h3>
                    <div className="flex gap-3">
                      <Button asChild className="flex-1">
                        <a
                          href={test.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Code2 className="mr-2 h-4 w-4" />
                          Voir sur GitHub
                        </a>
                      </Button>

                      <Button asChild variant="outline">
                        <a
                          href={test.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    {/* {test.example_path && ( */}
                    <div className="mt-4">
                      <Button asChild variant="secondary" className="w-full">
                        <Link href={`/examples/${test?.example_path}`}>
                          <Play className="mr-2 h-4 w-4" />
                          Voir l'exemple tel que présenté
                        </Link>
                      </Button>
                    </div>
                    {/* )} */}
                    {test.demo_url && (
                      <div className="mt-4">
                        <Button asChild variant="outline" className="w-full">
                          <a
                            href={test.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Voir la démo en ligne
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Code Source</h3>
                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <a
                      href={test.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Code2 className="mr-2 h-4 w-4" />
                      Voir sur GitHub
                    </a>
                  </Button>

                  <Button asChild variant="outline">
                    <a
                      href={test.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                {test.example_path && (
                  <div className="mt-4">
                    <Button asChild variant="secondary" className="w-full">
                      <Link
                        href={`/examples/${test.example_path}?testId=${test.id}`}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Voir l'exemple tel que présenté
                      </Link>
                    </Button>
                  </div>
                )}
                {test.demo_url && (
                  <div className="mt-4">
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href={test.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Voir la démo en ligne
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
