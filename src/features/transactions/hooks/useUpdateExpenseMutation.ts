import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllExpensesBaseOptions } from "@/features/transactions/queryOptions/getAllExpensesOptions"
import { updateExpenseOptions } from "@/features/transactions/queryOptions/updateExpenseOptions"
import { getDashboardStatsOptions } from "@/features/dashboard/queryOptions/getDashboardStatsOptions"
import { getRecentTransactionOptions } from "@/features/dashboard/queryOptions/getRecentTransactionsOptions"
import { getCashflowDataBaseOptions } from "@/features/dashboard/queryOptions/getCashflowDataOptions"

export const useUpdateExpenseMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateExpenseOptions.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(getAllExpensesBaseOptions)
      queryClient.invalidateQueries(getDashboardStatsOptions)
      queryClient.invalidateQueries(getRecentTransactionOptions)
      queryClient.invalidateQueries(getCashflowDataBaseOptions)
    },
  })
}
