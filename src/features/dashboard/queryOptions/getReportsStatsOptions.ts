import { queryOptions } from "@tanstack/react-query"
import type { DateRange } from "@/features/dashboard/schemas/dateRangeSchema"
import { getReportsStats } from "@/features/dashboard/functions/getReportsStats"

export const getReportsStatsBaseOptions = queryOptions({
  queryKey: ["reports", "stats"],
})

export const getReportsStatsOptions = ({ endDate, startDate }: DateRange) =>
  queryOptions({
    queryKey: [...getReportsStatsBaseOptions.queryKey, { startDate, endDate }],
    queryFn: async () => {
      return await getReportsStats({ data: { startDate, endDate } })
    },
  })
