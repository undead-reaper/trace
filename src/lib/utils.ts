import type { DateRange } from "@/features/dashboard/schemas/dateRangeSchema"
import type { TimeFrame } from "@/features/dashboard/schemas/timeFrameSchema"
import { clsx } from "clsx"
import type { ClassValue } from "clsx"
import { startOfMonth, subMonths } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export const getDateRange = (timeFrame: TimeFrame): DateRange => {
  const now = new Date()
  switch (timeFrame) {
    case "3m":
      return { startDate: startOfMonth(subMonths(now, 3)), endDate: now }
    case "6m":
      return { startDate: startOfMonth(subMonths(now, 6)), endDate: now }
    case "1y":
      return { startDate: startOfMonth(subMonths(now, 12)), endDate: now }
  }
}
