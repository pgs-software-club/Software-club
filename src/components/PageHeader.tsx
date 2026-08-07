import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
  /** Small pill above the title, e.g. "Our Community". */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
}

/**
 * The shared title block for top-level pages, so every page opens with the
 * same rhythm: eyebrow pill, large title, supporting line.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  align = "center",
}: PageHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`mb-16 ${centered ? "text-center" : "text-left"} animate-in fade-in slide-in-from-bottom-4 duration-700`}
    >
      {eyebrow && (
        <Badge
          variant="outline"
          className="mb-5 border-primary/20 bg-primary/5 text-primary backdrop-blur-sm"
        >
          {eyebrow}
        </Badge>
      )}
      <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description && (
        <p
          className={`mt-6 max-w-2xl text-lg text-muted-foreground ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
      {children && <div className={`mt-8 ${centered ? "flex justify-center" : ""}`}>{children}</div>}
    </div>
  );
}
