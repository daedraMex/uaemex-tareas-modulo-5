import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { tasksData } from "../../data/tasksData";
import { MainLayout } from "../templates/MainLayout";
import { SearchBar } from "../molecules/SearchBar";
import { TaskGrid } from "../organisms/TaskGrid";
import { Heading } from "../atoms/Heading";

export function TaskShowcasePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tasksData;
    return tasksData.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }, [query]);


  return (
    <MainLayout total={tasksData.length}>
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">dashboard</p>
          <Heading as="h2" className="mt-2 text-2xl sm:text-3xl">
            Listado de tareas módulo 5
          </Heading>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Cada tarjeta incluye descripción, una vista previa en vivo del HTML y código fuente. Puedes filtrar por título, descripción o etiquetas. Haz clic en "Ver detalle" para ver la tarea completa.
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-xs text-muted-foreground">
          {filtered.length} / {tasksData.length} resultados
        </span>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="mt-4">
        <TaskGrid
          tasks={filtered}
          onDetail={(t) => navigate({ to: "/tarea/$id", params: { id: String(t.id) } })}
        />
      </div>
    </MainLayout>
  );
}
