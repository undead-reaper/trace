import { paginationOptionsSchema } from "@/features/dashboard/schemas/paginationOptionsSchema"
import ExpensesView from "@/features/dashboard/views/ExpensesView"
import { getAllExpensesOptions } from "@/features/transactions/queryOptions/getAllExpensesOptions"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/expenses")({
  validateSearch: paginationOptionsSchema.omit({ limit: true }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getAllExpensesOptions({}))
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <ExpensesView />
}
