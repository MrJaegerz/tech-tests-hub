"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId");

  const handleBack = () => {
    if (testId) {
      router.push(`/tests/${testId}`);
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      <div className="container max-w-5xl mx-auto px-6 py-12 sm:px-8">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au test
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
