import { Search } from "lucide-react";
import { Input } from "../atoms/Input";
import { Icon } from "../atoms/Icon";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
        <Icon icon={Search} />
      </span>
      <label className="sr-only" htmlFor="task-search">
        Buscar tarea
      </label>
      <Input
        id="task-search"
        type="search"
        value={value}
        placeholder="Buscar tarea o etiqueta…"
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
