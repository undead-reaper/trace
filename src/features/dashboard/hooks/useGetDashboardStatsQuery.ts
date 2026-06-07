import { useSuspenseQuery } from "@tanstack/react-query"
import { getDashboardStatsOptions } from "@/features/dashboard/queryOptions/getDashboardStatsOptions"

export const useGetDashboardStatsQuery = () => {
  return useSuspenseQuery(getDashboardStatsOptions)
}
