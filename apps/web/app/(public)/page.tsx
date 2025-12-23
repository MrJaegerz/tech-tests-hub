import Link from "next/link";
import { Eye, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "./_components/page-header";
import { FeatureCard } from "./_components/feature-card";
import { TechStack } from "./_components/tech-stack";

export default function Home() {
  const technologies = [
    "Next.js 16",
    "FastAPI",
    "PostgreSQL",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn UI",
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 font-sans dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      <main className="flex w-full max-w-5xl flex-col gap-16 px-6 py-20 sm:px-8 md:px-12">
        <PageHeader
          badge={{
            label: "Bibliothèque de Tests Techniques",
            variant: "secondary",
          }}
          title={
            <>
              Partagez vos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                tests techniques
              </span>
            </>
          }
          description="Une plateforme simple et élégante pour partager, consulter et archiver vos exercices de tests techniques. Accessible publiquement, facile à maintenir."
        />

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-base">
            <Link href="/tests">Voir les tests</Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="text-base">
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation API
            </a>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Eye className="h-6 w-6" />}
            title="Accès Public"
            description="Tous les tests sont consultables librement sans authentification. Parfait pour partager votre travail."
            iconBgColor="bg-blue-100 dark:bg-blue-900/30"
            iconColor="text-blue-600 dark:text-blue-400"
          />

          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Gestion Sécurisée"
            description="L'ajout et la modification de tests sont protégés par API key. Vous gardez le contrôle total."
            iconBgColor="bg-violet-100 dark:bg-violet-900/30"
            iconColor="text-violet-600 dark:text-violet-400"
          />

          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="API FastAPI"
            description="Backend moderne avec FastAPI et PostgreSQL. Documentation Swagger interactive incluse."
            iconBgColor="bg-green-100 dark:bg-green-900/30"
            iconColor="text-green-600 dark:text-green-400"
          />
        </div>

        <TechStack technologies={technologies} />
      </main>
    </div>
  );
}
