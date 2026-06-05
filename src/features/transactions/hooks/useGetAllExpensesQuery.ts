import type { PaginationOptionsData } from "@/features/dashboard/schemas/paginationOptionsSchema"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getAllExpensesOptions } from "@/features/transactions/queryOptions/getAllExpensesOptions"

export const useGetAllExpensesQuery = ({
  limit,
  page,
}: PaginationOptionsData) => {
  return useSuspenseQuery(getAllExpensesOptions({ limit, page }))
}
