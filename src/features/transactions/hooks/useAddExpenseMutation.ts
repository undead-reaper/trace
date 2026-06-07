import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addExpenseOptions } from "@/features/transactions/queryOptions/addExpenseOptions"
import { getAllExpensesBaseOptions } from "@/features/transactions/queryOptions/getAllExpensesOptions"
import { getDashboardStatsOptions } from "@/features/dashboard/queryOptions/getDashboardStatsOptions"
import { getRecentTransactionOptions } from "@/features/dashboard/queryOptions/getRecentTransactionsOptions"
import { getCashflowDataBaseOptions } from "@/features/dashboard/queryOptions/getCashflowDataOptions"

export const useAddExpenseMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addExpenseOptions.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(getAllExpensesBaseOptions)
      queryClient.invalidateQueries(getDashboardStatsOptions)
      queryClient.invalidateQueries(getRecentTransactionOptions)
      queryClient.invalidateQueries(getCashflowDataBaseOptions)
    },
  })
}
