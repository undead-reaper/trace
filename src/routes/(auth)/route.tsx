import { requireUnauth } from "@/features/auth/middlewares/requireUnauth"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth)")({
  beforeLoad: async () => requireUnauth(),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <Outlet />
    </main>
  )
}
