import { useSuspenseQuery } from "@tanstack/react-query"
import { getRecentTransactionOptions } from "../queryOptions/getRecentTransactionsOptions"

export const useGetRecentTransactionsQuery = () => {
  return useSuspenseQuery(getRecentTransactionOptions)
}
