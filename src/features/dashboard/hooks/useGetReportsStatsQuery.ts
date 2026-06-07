import { useSuspenseQuery } from "@tanstack/react-query"
import { getReportsStatsOptions } from "@/features/dashboard/queryOptions/getReportsStatsOptions"
import type { DateRange } from "@/features/dashboard/schemas/dateRangeSchema"

export const useGetReportsDataQuery = ({ endDate, startDate }: DateRange) => {
  return useSuspenseQuery(getReportsStatsOptions({ endDate, startDate }))
}
