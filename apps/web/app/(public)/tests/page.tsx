import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/page-header";
import { TestsList } from "./_components/tests-list";
import { fetchTests } from "@/lib/api";

export default async function TestsPage() {
  const tests = await fetchTests();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      <div className="container max-w-5xl mx-auto px-6 py-12 sm:px-8">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>

          <PageHeader
            badge={{
              label: `${tests.length} test${tests.length > 1 ? "s" : ""}`,
              variant: "secondary",
            }}
            title="Tests Techniques"
            description="Découvrez tous les tests techniques disponibles. Utilisez les filtres pour affiner votre recherche."
          />
        </div>

        <TestsList tests={tests} />
      </div>
    </div>
  );
}
