interface NotebookCell {
  cell_type: string;
  source: string[] | string;
}

interface NotebookJson {
  cells?: NotebookCell[];
}

/** Convierte el JSON crudo de un .ipynb a texto tipo Jupytext (solo código y markdown, sin metadata de ejecución). */
export function notebookJsonToSource(raw: string): string {
  let notebook: NotebookJson;
  try {
    notebook = JSON.parse(raw);
  } catch {
    return raw;
  }

  const cells = notebook.cells ?? [];
  if (cells.length === 0) return raw;

  return cells
    .map((cell) => {
      const source = Array.isArray(cell.source) ? cell.source.join("") : (cell.source ?? "");
      const lines = source.replace(/\n$/, "").split("\n");

      if (cell.cell_type === "markdown") {
        return ["# %% [markdown]", ...lines.map((l) => (l ? `# ${l}` : "#"))].join("\n");
      }

      return ["# %%", ...lines].join("\n");
    })
    .join("\n\n");
}
