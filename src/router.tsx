import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // En GitHub Pages la app vive bajo /<repo>/; BASE_URL lo refleja y en
    // desarrollo/Vercel es "/", por lo que el basepath queda vacío.
    basepath: import.meta.env.BASE_URL.replace(/\/+$/, ""),
  });

  return router;
};
