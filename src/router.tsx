import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routeTree } from "@/routeTree.gen"
import { QueryClient } from "@tanstack/react-query"
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query"

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
      },
    },
  })
  const router = createTanStackRouter({
    routeTree,
    context: { queryClient },
    defaultNotFoundComponent: () => <div>Not Found</div>,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 30_000,
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
    hydrateOptions: {
      defaultOptions: {
        queries: {
          gcTime: 5 * 60 * 1000,
        },
      },
    },
  })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
