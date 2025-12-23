"use client";

import { useState } from "react";
import { FileCode2 } from "lucide-react";
import { SolutionFile } from "@/lib/types";
import hljs from "highlight.js";

interface CodeViewerProps {
  files: SolutionFile[];
}

export function CodeViewer({ files }: CodeViewerProps) {
  const [selectedFile, setSelectedFile] = useState(files[0]?.path || "");

  if (!files || files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
        <FileCode2 className="mb-4 h-12 w-12 text-zinc-400" />
        <p className="text-sm text-muted-foreground">Aucun fichier de solution disponible</p>
      </div>
    );
  }

  const getHighlightedCode = (code: string, language: string) => {
    try {
      const highlighted = hljs.highlight(code, { language }).value;
      return highlighted;
    } catch {
      return hljs.highlightAuto(code).value;
    }
  };

  const selectedFileObj = files.find((f) => f.path === selectedFile);

  return (
    <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      {/* Tabs comme des fichiers */}
      <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-2 py-1.5 overflow-x-auto">
        {files.map((file) => (
          <button
            key={file.path}
            onClick={() => setSelectedFile(file.path)}
            className={`
              flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-t
              transition-colors duration-150
              ${
                selectedFile === file.path
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-t border-x border-zinc-200 dark:border-zinc-700"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
              }
            `}
          >
            <FileCode2 className="h-3 w-3" />
            {file.path}
          </button>
        ))}
      </div>

      {/* Code content */}
      <div className="bg-white dark:bg-zinc-950">
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {selectedFileObj?.path}
          </span>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {selectedFileObj?.language}
          </span>
        </div>
        <div className="overflow-x-auto">
          <pre className="p-4 text-sm">
            <code
              className={`language-${selectedFileObj?.language} hljs`}
              dangerouslySetInnerHTML={{
                __html: getHighlightedCode(selectedFileObj?.content || "", selectedFileObj?.language || ""),
              }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}
