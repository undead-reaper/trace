import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateIncomeOptions } from "@/features/transactions/queryOptions/updateIncomeOptions"
import { getAllIncomesBaseOptions } from "@/features/transactions/queryOptions/getAllIncomesOptions"
import { getDashboardStatsOptions } from "@/features/dashboard/queryOptions/getDashboardStatsOptions"
import { getRecentTransactionOptions } from "@/features/dashboard/queryOptions/getRecentTransactionsOptions"
import { getCashflowDataBaseOptions } from "@/features/dashboard/queryOptions/getCashflowDataOptions"

export const useUpdateIncomeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateIncomeOptions.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(getAllIncomesBaseOptions)
      queryClient.invalidateQueries(getDashboardStatsOptions)
      queryClient.invalidateQueries(getRecentTransactionOptions)
      queryClient.invalidateQueries(getCashflowDataBaseOptions)
    },
  })
}
