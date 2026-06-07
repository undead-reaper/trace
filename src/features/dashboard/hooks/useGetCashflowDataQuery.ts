import { useSuspenseQuery } from "@tanstack/react-query"
import { getCashflowDataOptions } from "@/features/dashboard/queryOptions/getCashflowDataOptions"
import type { GetCashflowDataType } from "@/features/dashboard/schemas/getCashflowDataSchema"

export const useGetCashflowDataQuery = ({ timeFrame }: GetCashflowDataType) => {
  return useSuspenseQuery(getCashflowDataOptions({ timeFrame }))
}
