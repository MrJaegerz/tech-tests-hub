"use client";

import { useState, useMemo } from "react";
import { FileCode2 } from "lucide-react";
import { TestCard } from "./test-card";
import { TestFilters, FilterResult } from "./test-filters";
import { TechnicalTest } from "@/lib/types";

interface TestsListProps {
  tests: TechnicalTest[];
}

export function TestsList({ tests }: TestsListProps) {
  const [filter, setFilter] = useState<FilterResult>("ALL");
  const [search, setSearch] = useState("");

  // Calculate counts
  const counts = useMemo(() => {
    return {
      total: tests.length,
      success: tests.filter((t) => t.result === "SUCCESS").length,
      partial: tests.filter((t) => t.result === "PARTIAL").length,
      fail: tests.filter((t) => t.result === "FAIL").length,
    };
  }, [tests]);

  // Filter and search tests
  const filteredTests = useMemo(() => {
    let filtered = tests;

    // Apply result filter
    if (filter !== "ALL") {
      filtered = filtered.filter((test) => test.result === filter);
    }

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (test) =>
          test.title.toLowerCase().includes(searchLower) ||
          test.description?.toLowerCase().includes(searchLower) ||
          test.github_url.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [tests, filter, search]);

  return (
    <div className="space-y-8">
      <TestFilters
        onFilterChange={setFilter}
        onSearchChange={setSearch}
        currentFilter={filter}
        currentSearch={search}
        counts={counts}
      />

      {filteredTests.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
          <FileCode2 className="mb-4 h-12 w-12 text-zinc-400" />
          <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Aucun test trouvé
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {search
              ? `Aucun résultat pour "${search}"`
              : "Essayez de changer les filtres ou la recherche."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      )}
    </div>
  );
}
