import { getCategoryBreakdownOptions } from "@/features/dashboard/queryOptions/getCategoryBreakdown"
import { getReportsStatsOptions } from "@/features/dashboard/queryOptions/getReportsStatsOptions"
import { dateRangeSearchSchema } from "@/features/dashboard/schemas/dateRangeSearchSchema"
import ReportsView from "@/features/dashboard/views/ReportsView"
import { serializeDateRange } from "@/lib/utils"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/reports")({
  validateSearch: dateRangeSearchSchema,
  loaderDeps: ({ search: { startDate, endDate } }) => ({
    startDate,
    endDate,
  }),
  loader: async ({ context, deps }) => {
    const { endDate, startDate } = serializeDateRange(deps)
    await context.queryClient.ensureQueryData(
      getReportsStatsOptions({
        startDate: startDate,
        endDate: endDate,
      })
    )
    await context.queryClient.ensureQueryData(
      getCategoryBreakdownOptions({
        startDate: startDate,
        endDate: endDate,
      })
    )
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <ReportsView />
}
