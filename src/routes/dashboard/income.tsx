import { paginationOptionsSchema } from "@/features/dashboard/schemas/paginationOptionsSchema"
import IncomeView from "@/features/dashboard/views/IncomeView"
import { getAllIncomesOptions } from "@/features/transactions/queryOptions/getAllIncomesOptions"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/income")({
  validateSearch: paginationOptionsSchema.omit({ limit: true }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getAllIncomesOptions({}))
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <IncomeView />
}
