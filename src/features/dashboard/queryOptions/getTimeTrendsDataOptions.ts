import { queryOptions } from "@tanstack/react-query"
import { getTimeTrendsData } from "@/features/dashboard/functions/getTimeTrendsData"
import type { DateRange } from "@/features/dashboard/schemas/dateRangeSchema"

export const getTimeTrendsDataBaseOptions = queryOptions({
  queryKey: ["reports", "timeTrendsData"],
})

export const getTimeTrendsDataOptions = ({ startDate, endDate }: DateRange) =>
  queryOptions({
    queryKey: [
      ...getTimeTrendsDataBaseOptions.queryKey,
      { startDate, endDate },
    ],
    queryFn: async () => {
      return await getTimeTrendsData({ data: { startDate, endDate } })
    },
  })
