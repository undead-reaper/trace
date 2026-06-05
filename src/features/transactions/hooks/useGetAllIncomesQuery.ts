import { useSuspenseQuery } from "@tanstack/react-query"
import { getAllIncomesOptions } from "@/features/transactions/queryOptions/getAllIncomesOptions"
import type { PaginationOptionsData } from "@/features/dashboard/schemas/paginationOptionsSchema"

export const useGetAllIncomesQuery = ({
  page = 1,
  limit = 10,
}: PaginationOptionsData) => {
  return useSuspenseQuery(getAllIncomesOptions({ page, limit }))
}
