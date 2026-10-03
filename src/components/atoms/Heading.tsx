export function Heading({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return <Tag className={`font-semibold tracking-tight text-foreground ${className}`}>{children}</Tag>;
}
