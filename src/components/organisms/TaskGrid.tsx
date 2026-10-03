import type { Task } from "../../data/tasksData";
import { TaskCard } from "../molecules/TaskCard";

export function TaskGrid({
  tasks,
  onDetail,
}: {
  tasks: Task[];
  onDetail: (task: Task) => void;
}) {
  if (tasks.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        No se encontraron tareas con ese criterio.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDetail={onDetail} />
      ))}
    </div>
  );
}
