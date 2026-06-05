import type { GetExpenseByIdData } from "@/features/transactions/schemas/getExpenseByIdSchema"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { getExpenseByIdOptions } from "@/features/transactions/queryOptions/getExpenseByIdOptions"
import type { Expense } from "@/lib/db/schemas/expenses"
import { getAllExpensesBaseOptions } from "@/features/transactions/queryOptions/getAllExpensesOptions"

export const useGetExpenseByIdQuery = ({ expenseId }: GetExpenseByIdData) => {
  const queryClient = useQueryClient()
  return useSuspenseQuery({
    ...getExpenseByIdOptions({ expenseId }),
    initialData: () => {
      const allPages = queryClient.getQueriesData<{ items: Expense[] }>(
        getAllExpensesBaseOptions
      )
      for (const [_, data] of allPages) {
        const found = data?.items.find((expense) => expense.id === expenseId)
        if (found) {
          return found
        }
      }
      return undefined
    },
    initialDataUpdatedAt: () => {
      const allStates = queryClient.getQueriesData<{ items: Expense[] }>({
        queryKey: getAllExpensesBaseOptions.queryKey,
      })
      return Math.max(
        ...allStates.map(
          ([key]) => queryClient.getQueryState(key)?.dataUpdatedAt ?? 0
        )
      )
    },
  })
}
