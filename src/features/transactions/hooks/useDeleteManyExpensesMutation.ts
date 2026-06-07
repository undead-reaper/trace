import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { DeleteManyExpensesData } from "@/features/transactions/schemas/deleteManyExpensesSchema"
import { deleteManyExpenses } from "@/features/transactions/functions/deleteManyExpenses"
import { getAllExpensesBaseOptions } from "@/features/transactions/queryOptions/getAllExpensesOptions"
import { getDashboardStatsOptions } from "@/features/dashboard/queryOptions/getDashboardStatsOptions"
import { getRecentTransactionOptions } from "@/features/dashboard/queryOptions/getRecentTransactionsOptions"
import { getCashflowDataBaseOptions } from "@/features/dashboard/queryOptions/getCashflowDataOptions"
import { getCategoryBreakdownBaseOptions } from "@/features/dashboard/queryOptions/getCategoryBreakdown"
import { getReportsStatsBaseOptions } from "@/features/dashboard/queryOptions/getReportsStatsOptions"

export const useDeleteManyExpensesMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ ids }: DeleteManyExpensesData) => {
      return await deleteManyExpenses({ data: { ids } })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(getAllExpensesBaseOptions)
      queryClient.invalidateQueries(getDashboardStatsOptions)
      queryClient.invalidateQueries(getRecentTransactionOptions)
      queryClient.invalidateQueries(getCashflowDataBaseOptions)
      queryClient.invalidateQueries(getCategoryBreakdownBaseOptions)
      queryClient.invalidateQueries(getReportsStatsBaseOptions)
    },
  })
}
