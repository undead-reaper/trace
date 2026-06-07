import { queryOptions } from "@tanstack/react-query"
import { getRecentTransactions } from "@/features/dashboard/functions/getRecentTransactions"

export const getRecentTransactionOptions = queryOptions({
  queryKey: ["recentTransactions"],
  queryFn: async () => {
    return await getRecentTransactions()
  },
})
