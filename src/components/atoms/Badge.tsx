export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] tracking-tight text-muted-foreground">
      {children}
    </span>
  );
}
