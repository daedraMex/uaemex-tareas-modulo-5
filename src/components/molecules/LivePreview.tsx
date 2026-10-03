export function LivePreview({
  html,
  url,
  height = 220,
}: {
  html?: string | undefined;
  url?: string | undefined;
  height?: number | undefined;
}) {
  const doc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:18px;background:#ffffff;display:flex;align-items:center;justify-content:center;min-height:calc(100vh - 36px)}</style></head><body>${html ?? ""}</body></html>`;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <iframe
        title="Vista previa de la tarea"
        {...(url ? { src: url } : { srcDoc: doc })}
        sandbox="allow-scripts"
        loading="lazy"
        referrerPolicy="no-referrer"
        style={{ height }}
        className="w-full border-0"
      />
    </div>
  );
}
