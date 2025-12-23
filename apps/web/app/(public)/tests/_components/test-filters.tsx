"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";

export type FilterResult = "ALL" | "SUCCESS" | "PARTIAL" | "FAIL";

interface TestFiltersProps {
  onFilterChange: (filter: FilterResult) => void;
  onSearchChange: (search: string) => void;
  currentFilter: FilterResult;
  currentSearch: string;
  counts: {
    total: number;
    success: number;
    partial: number;
    fail: number;
  };
}

const filterOptions: { value: FilterResult; label: string; color: string }[] = [
  { value: "ALL", label: "Tous", color: "" },
  { value: "SUCCESS", label: "Réussi", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  { value: "PARTIAL", label: "Partiel", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  { value: "FAIL", label: "Échoué", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
];

export function TestFilters({
  onFilterChange,
  onSearchChange,
  currentFilter,
  currentSearch,
  counts,
}: TestFiltersProps) {
  const [searchValue, setSearchValue] = useState(currentSearch);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange(value);
  };

  const getCount = (filter: FilterResult) => {
    switch (filter) {
      case "ALL":
        return counts.total;
      case "SUCCESS":
        return counts.success;
      case "PARTIAL":
        return counts.partial;
      case "FAIL":
        return counts.fail;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Rechercher un test..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
            onClick={() => handleSearchChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Badges */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const count = getCount(option.value);
          const isActive = currentFilter === option.value;

          return (
            <Badge
              key={option.value}
              variant={isActive ? "default" : "outline"}
              className={`cursor-pointer transition-all hover:scale-105 ${
                isActive && option.color ? option.color : ""
              }`}
              onClick={() => onFilterChange(option.value)}
            >
              {option.label} ({count})
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
