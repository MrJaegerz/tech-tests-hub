import { Loader } from "@/components/loader";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-6 py-12">
        <Loader size="lg" text="Chargement des tests..." />
      </div>
    </div>
  );
}
