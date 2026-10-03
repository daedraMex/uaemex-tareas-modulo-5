import { createFileRoute } from "@tanstack/react-router";
import { TaskShowcasePage } from "../components/pages/TaskShowcasePage";

const title = "Universidad Autónoma del Estado de México — Tareas módulo 5";
const description = "Universidad Autónoma del Estado de México — portafolio de tareas: redes neuronales con PyTorch, series de tiempo RNN/LSTM y aplicaciones interactivas con Panel.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: TaskShowcasePage,
});
