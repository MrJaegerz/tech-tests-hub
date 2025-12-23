"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4 mt-6">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mb-3 mt-5">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>
          ),
          p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="ml-4">{children}</li>,
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return <code className={className}>{children}</code>;
          },
          pre: ({ children }) => (
            <pre className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="my-6 w-full overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-zinc-100 dark:bg-zinc-800/50">
              {children}
            </thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
