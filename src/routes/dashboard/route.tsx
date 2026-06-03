import { requireAuth } from "@/features/auth/middlewares/requireAuth"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => requireAuth(),
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
