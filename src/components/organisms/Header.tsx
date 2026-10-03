import { Terminal } from "lucide-react";
import { Icon } from "../atoms/Icon";
import { Heading } from "../atoms/Heading";

export function Header({ total }: { total: number }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:flex sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-surface text-primary">
            <Icon icon={Terminal} size={18} />
          </span>
          <div className="min-w-0">
            <Heading as="h1" className="truncate text-base sm:text-lg">
              Universidad Autónoma del Estado de México
            </Heading>
            <p className="truncate font-mono text-[11px] text-muted-foreground">
              diplomado de machine learning
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground">
          {total} tareas
        </span>
      </div>
    </header>
  );
}
