import { Badge } from "@/components/ui/badge";

interface TechStackProps {
  technologies: string[];
}

export function TechStack({ technologies }: TechStackProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Stack Technique
      </h2>
      <div className="flex flex-wrap gap-3">
        {technologies.map((tech) => (
          <Badge key={tech} variant="secondary" className="px-4 py-2 text-sm font-medium">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}
