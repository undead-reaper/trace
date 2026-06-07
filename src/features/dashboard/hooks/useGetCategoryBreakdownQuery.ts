import { useSuspenseQuery } from "@tanstack/react-query"
import type { DateRange } from "@/features/dashboard/schemas/dateRangeSchema"
import { getCategoryBreakdownOptions } from "@/features/dashboard/queryOptions/getCategoryBreakdown"

export const useGetCategoryBreakdownQuery = ({
  endDate,
  startDate,
}: DateRange) => {
  return useSuspenseQuery(getCategoryBreakdownOptions({ endDate, startDate }))
}
