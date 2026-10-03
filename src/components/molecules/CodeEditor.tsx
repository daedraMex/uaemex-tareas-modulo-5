import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Download, WrapText } from "lucide-react";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";

export function CodeEditor({
  code,
  url,
  fileName = "index.html",
  mimeType = "text/html",
  transform,
}: {
  code?: string | undefined;
  url?: string | undefined;
  fileName?: string | undefined;
  mimeType?: string | undefined;
  transform?: ((raw: string) => string) | undefined;
}) {
  const [copied, setCopied] = useState(false);
  const [wrap, setWrap] = useState(false);
  const [remote, setRemote] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(url));

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((t) => !cancelled && setRemote(t))
      .catch(() => !cancelled && setRemote("<!-- No se pudo cargar el código fuente. -->"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [url]);

  const raw = url ? (remote ?? "") : (code ?? "");
  const source = useMemo(() => (transform ? transform(raw) : raw), [raw, transform]);
  const lines = useMemo(() => source.split("\n"), [source]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const download = () => {
    const blob = new Blob([source], { type: `${mimeType};charset=utf-8` });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(href);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          </span>
          <span className="truncate font-mono text-xs text-muted-foreground">{fileName}</span>
          <span className="shrink-0 rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            {lines.length} líneas
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" onClick={() => setWrap((w) => !w)} className="px-2 py-1 text-xs">
            <Icon icon={WrapText} size={14} />
            {wrap ? "No ajustar" : "Ajustar"}
          </Button>
          <Button variant="ghost" onClick={download} className="px-2 py-1 text-xs">
            <Icon icon={Download} size={14} />
            Descargar
          </Button>
          <Button variant="outline" onClick={copy} className="px-2 py-1 text-xs">
            <Icon icon={copied ? Check : Copy} size={14} />
            {copied ? "Copiado" : "Copiar"}
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="p-4 font-mono text-xs text-muted-foreground">Cargando código…</p>
      ) : (
        <div className="max-h-[70vh] overflow-auto">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] font-mono text-xs leading-relaxed">
            <div className="sticky left-0 select-none border-r border-border bg-surface px-3 py-4 text-right text-muted-foreground/60">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre
              className={`px-4 py-4 text-muted-foreground ${wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"}`}
            >
              <code>
                {lines.map((l, i) => (
                  <div key={i}>{l === "" ? " " : l}</div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
