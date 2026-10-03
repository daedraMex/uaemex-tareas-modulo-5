import { ArrowRight } from "lucide-react";
import type { Task } from "../../data/tasksData";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { Heading } from "../atoms/Heading";
import { Icon } from "../atoms/Icon";

export function TaskCard({
  task,
  onDetail,
}: {
  task: Task;
  onDetail: (task: Task) => void;
}) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <Heading as="h3" className="min-w-0 text-base">
          {task.title}
        </Heading>
        <span className="shrink-0 rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] text-primary">
          #{String(task.id).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{task.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {task.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-border">
        <Button onClick={() => onDetail(task)}>
          Ver detalle
          <Icon icon={ArrowRight} />
        </Button>
        {task.liveUrl ? (
          <a
            href={task.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary"
          >
            App en vivo
          </a>
        ) : null}
      </div>
    </article>
  );
}
