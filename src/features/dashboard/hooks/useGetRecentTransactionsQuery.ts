import { useSuspenseQuery } from "@tanstack/react-query"
import { getRecentTransactionOptions } from "@/features/dashboard/queryOptions/getRecentTransactionsOptions"

export const useGetRecentTransactionsQuery = () => {
  return useSuspenseQuery(getRecentTransactionOptions)
}
