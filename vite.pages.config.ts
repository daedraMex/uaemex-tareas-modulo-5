// Configuración para el despliegue ESTÁTICO en GitHub Pages.
// La config principal (vite.config.ts) queda intacta para Lovable/Vercel:
// este archivo solo se usa desde el workflow de GitHub Pages.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/uaemex-tareas-modulo-5/",
  },
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      // crawlLinks se desactiva: las tarjetas navegan por JS y seguir
      // enlaces arrastraría el link de la app (public/app_personalidades/).
      crawlLinks: false,
    },
    pages: [
      { path: "/" },
      { path: "/tarea/1" },
      { path: "/tarea/2" },
      { path: "/tarea/3" },
      { path: "/tarea/4" },
    ],
  },
  nitro: { preset: "vercel" },
});
