import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteExpenseOptions } from "@/features/transactions/queryOptions/deleteExpenseOptions"
import { getAllExpensesBaseOptions } from "../queryOptions/getAllExpensesOptions"
import { getDashboardStatsOptions } from "@/features/dashboard/queryOptions/getDashboardStatsOptions"
import { getRecentTransactionOptions } from "@/features/dashboard/queryOptions/getRecentTransactionsOptions"
import { getCashflowDataBaseOptions } from "@/features/dashboard/queryOptions/getCashflowDataOptions"

export const useDeleteExpenseMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteExpenseOptions.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(getAllExpensesBaseOptions)
      queryClient.invalidateQueries(getDashboardStatsOptions)
      queryClient.invalidateQueries(getRecentTransactionOptions)
      queryClient.invalidateQueries(getCashflowDataBaseOptions)
    },
  })
}
