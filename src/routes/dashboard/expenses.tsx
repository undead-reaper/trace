import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/expenses")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Expenses</div>
}
