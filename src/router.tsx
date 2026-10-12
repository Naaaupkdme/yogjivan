import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // Instance-scoped lifecycle flag: Scoped to this router instance to avoid
  // leaking state across multiple router creations (tests, HMR, SSR requests).
  let isInitialClientRender = true;

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: () => {
      // 1. SSR Server Render: Suppress the inline blocking scrollTo(0,0) script
      // from being injected into the HTML document stream.
      if (typeof window === "undefined") {
        return false;
      }

      // 2. Initial Client Hydration / First Render:
      // Return false on this router's initial render to prevent TanStack from
      // force-resetting early user scroll back to (0, 0) during hydration.
      if (isInitialClientRender) {
        isInitialClientRender = false;
        return false;
      }

      // 3. Subsequent Client Navigations (link clicks, back/forward history):
      // Return true so TanStack restores saved history scroll or resets new pages to top.
      return true;
    },
    defaultPreloadStaleTime: 0,
  });

  return router;
};
