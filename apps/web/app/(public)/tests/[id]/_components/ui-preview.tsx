"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { SolutionFile } from "@/lib/types";

interface UIPreviewProps {
  files: SolutionFile[];
}

export function UIPreview({ files }: UIPreviewProps) {
  // Convertir les fichiers au format Sandpack
  const sandpackFiles: Record<string, string> = {};

  files.forEach((file) => {
    // Ajuster le chemin pour Sandpack (ajouter / au début si absent)
    const path = file.path.startsWith("/") ? file.path : `/${file.path}`;
    sandpackFiles[path] = file.content;
  });

  // Ajouter un fichier App.tsx qui importe la page principale si elle existe
  const hasPageTsx = files.some((f) => f.path === "page.tsx");
  if (hasPageTsx && !sandpackFiles["/App.tsx"]) {
    sandpackFiles[
      "/App.tsx"
    ] = `import Page from "./page";\n\nexport default function App() {\n  return <Page />;\n}`;
  }

  return (
    <div className="w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
      <Sandpack
        template="react-ts"
        files={sandpackFiles}
        theme="auto"
        options={{
          showNavigator: false,
          showTabs: true,
          showLineNumbers: true,
          editorHeight: 600,
          editorWidthPercentage: 55,
          showInlineErrors: true,
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        customSetup={{
          dependencies: {
            react: "^18.2.0",
            "react-dom": "^18.2.0",
          },
        }}
      />
    </div>
  );
}
