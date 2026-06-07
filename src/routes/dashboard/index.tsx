import { getCashflowDataOptions } from "@/features/dashboard/queryOptions/getCashflowDataOptions"
import { getDashboardStatsOptions } from "@/features/dashboard/queryOptions/getDashboardStatsOptions"
import { getRecentTransactionOptions } from "@/features/dashboard/queryOptions/getRecentTransactionsOptions"
import DashboardView from "@/features/dashboard/views/DashboardView"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getDashboardStatsOptions)
    await context.queryClient.ensureQueryData(getRecentTransactionOptions)
    await context.queryClient.ensureQueryData(
      getCashflowDataOptions({ timeFrame: "3m" })
    )
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardView />
}
