import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { requireAuth } from "@/features/auth/middlewares/requireAuth"
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar"
import Navbar from "@/features/dashboard/Navbar"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => requireAuth(),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
