import { createFileRoute } from "@tanstack/react-router";
import { TaskDetailPage } from "../components/pages/TaskDetailPage";

const title = "Detalle de la tarea — Universidad Autónoma del Estado de México";
const description =
  "Vista previa en vivo, código HTML y notebook .ipynb de cada tarea del portafolio.";

export const Route = createFileRoute("/tarea/$id")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <TaskDetailPage id={id} />;
}
