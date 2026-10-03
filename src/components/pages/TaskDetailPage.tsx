import { Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, FileCode, FileBraces, Eye } from "lucide-react";
import { tasksData } from "../../data/tasksData";
import { MainLayout } from "../templates/MainLayout";
import { Heading } from "../atoms/Heading";
import { Badge } from "../atoms/Badge";
import { Icon } from "../atoms/Icon";
import { LivePreview } from "../molecules/LivePreview";
import { CodeEditor } from "../molecules/CodeEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { notebookJsonToSource } from "../../lib/notebook";

export function TaskDetailPage({ id }: { id: string }) {
  const task = tasksData.find((t) => String(t.id) === id);

  return (
    <MainLayout total={tasksData.length}>
      <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary">
        <Icon icon={ArrowLeft} size={14} />
        Volver al listado
      </Link>

      {!task ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-8">
          <Heading as="h1" className="text-xl">Tarea no encontrada</Heading>
          <p className="mt-2 text-sm text-muted-foreground">Revisa el enlace o vuelve al listado.</p>
        </div>
      ) : (
        <>
          <div className="mt-4">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              detalle · #{String(task.id).padStart(2, "0")}
            </p>
            <Heading as="h1" className="mt-2 text-2xl">{task.title}</Heading>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {task.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {task.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            {task.liveUrl ? (
              <a
                href={task.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3.5 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Icon icon={ExternalLink} size={14} />
                Abrir app en vivo
              </a>
            ) : null}
          </div>

          <Tabs defaultValue="preview" className="mt-6">
            <TabsList>
              <TabsTrigger value="preview" className="gap-1.5">
                <Icon icon={Eye} size={14} />
                Vista previa
              </TabsTrigger>
              <TabsTrigger value="html" className="gap-1.5">
                <Icon icon={FileCode} size={14} />
                Código HTML
              </TabsTrigger>
              <TabsTrigger value="ipynb" className="gap-1.5">
                <Icon icon={FileBraces} size={14} />
                Código .ipynb
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <LivePreview html={task.html} url={task.url} height={560} />
            </TabsContent>

            <TabsContent value="html">
              <CodeEditor code={task.html} url={task.url} fileName={task.fileName ?? "index.html"} />
            </TabsContent>

            <TabsContent value="ipynb">
              {task.ipynbUrl ? (
                <CodeEditor
                  url={task.ipynbUrl}
                  fileName={(task.ipynbFileName ?? "notebook.ipynb").replace(/\.ipynb$/, ".py")}
                  mimeType="text/x-python"
                  transform={notebookJsonToSource}
                />
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                  Notebook próximamente para esta tarea.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </MainLayout>
  );
}
