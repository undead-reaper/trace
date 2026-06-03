import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <main className="p-4">Dashboard</main>
}
