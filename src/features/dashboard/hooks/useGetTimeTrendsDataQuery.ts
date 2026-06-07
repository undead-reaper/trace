import { useSuspenseQuery } from "@tanstack/react-query"
import { getTimeTrendsDataOptions } from "@/features/dashboard/queryOptions/getTimeTrendsDataOptions"
import type { DateRange } from "@/features/dashboard/schemas/dateRangeSchema"

export const useGetTimeTrendsDataQuery = ({
  startDate,
  endDate,
}: DateRange) => {
  return useSuspenseQuery(getTimeTrendsDataOptions({ startDate, endDate }))
}
