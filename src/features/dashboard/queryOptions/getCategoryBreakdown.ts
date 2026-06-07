import { queryOptions } from "@tanstack/react-query"
import type { DateRange } from "@/features/dashboard/schemas/dateRangeSchema"
import { getCategoryBreakdown } from "@/features/dashboard/functions/getCategoryBreakdown"

export const getCategoryBreakdownBaseOptions = queryOptions({
  queryKey: ["reports", "categoryBreakdown"],
})

export const getCategoryBreakdownOptions = ({
  endDate,
  startDate,
}: DateRange) =>
  queryOptions({
    queryKey: [
      ...getCategoryBreakdownBaseOptions.queryKey,
      { startDate, endDate },
    ],
    queryFn: async () => {
      return await getCategoryBreakdown({ data: { startDate, endDate } })
    },
  })
