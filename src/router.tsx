import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

let isInitialRender = true;

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: () => {
      // On SSR and initial client hydration, suppress TanStack's forced scrollTo(0, 0)
      // so neither the SSR inline script nor initial client hydration wipes out the user's
      // intentional early scroll before or during hydration.
      if (typeof window === "undefined") {
        return false;
      }
      if (isInitialRender) {
        isInitialRender = false;
        return false;
      }
      return true;
    },
    defaultPreloadStaleTime: 0,
  });

  return router;
};
