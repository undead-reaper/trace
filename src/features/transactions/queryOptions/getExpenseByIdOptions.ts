import type { GetExpenseByIdData } from "@/features/transactions/schemas/getExpenseByIdSchema"
import { queryOptions } from "@tanstack/react-query"
import { getExpenseById } from "@/features/transactions/functions/getExpenseById"

export const getExpenseByIdOptions = ({ expenseId }: GetExpenseByIdData) =>
  queryOptions({
    queryKey: ["expense", { expenseId }],
    queryFn: async () => {
      return await getExpenseById({ data: { expenseId } })
    },
  })
