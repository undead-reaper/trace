import { queryOptions } from "@tanstack/react-query"

export const getTopSpendingCategoriesOptions = queryOptions({
  queryKey: ["topSpendingCategories"],
})
