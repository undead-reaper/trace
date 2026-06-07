import { queryOptions } from "@tanstack/react-query"
import { getDashboardStats } from "@/features/dashboard/functions/getDashboardStats"

export const getDashboardStatsOptions = queryOptions({
  queryKey: ["dashboard", "stats"],
  queryFn: async () => {
    return await getDashboardStats()
  },
})
