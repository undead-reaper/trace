import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { DeleteManyIncomeData } from "@/features/transactions/schemas/deleteManyIncomeSchema"
import { deleteManyIncome } from "../functions/deleteManyIncome"
import { getAllIncomesBaseOptions } from "../queryOptions/getAllIncomesOptions"
import { getDashboardStatsOptions } from "@/features/dashboard/queryOptions/getDashboardStatsOptions"
import { getRecentTransactionOptions } from "@/features/dashboard/queryOptions/getRecentTransactionsOptions"
import { getCashflowDataBaseOptions } from "@/features/dashboard/queryOptions/getCashflowDataOptions"

export const useDeleteManyIncomeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ ids }: DeleteManyIncomeData) => {
      return await deleteManyIncome({ data: { ids } })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(getAllIncomesBaseOptions)
      queryClient.invalidateQueries(getDashboardStatsOptions)
      queryClient.invalidateQueries(getRecentTransactionOptions)
      queryClient.invalidateQueries(getCashflowDataBaseOptions)
    },
  })
}
