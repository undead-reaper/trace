import StatCard from "@/features/dashboard/components/StatCard"
import { useGetReportsDataQuery } from "@/features/dashboard/hooks/useGetReportsStatsQuery"
import { dateFormat, formatCurrency, serializeDateRange } from "@/lib/utils"
import { getRouteApi } from "@tanstack/react-router"

const DashboardStats = () => {
  const routeApi = getRouteApi("/dashboard/reports")
  const search = routeApi.useSearch()
  const { startDate, endDate } = serializeDateRange(search)
  const { data } = useGetReportsDataQuery({
    startDate: startDate,
    endDate: endDate,
  })
  const isPostive = data.netBalance >= 0
  const isNegative = data.netBalance < 0
  const balanceColor = isPostive
    ? "text-green-500"
    : isNegative
      ? "text-red-500"
      : "text-foreground"
  const prefix = isPostive ? "+" : isNegative ? "-" : ""

  return (
    <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Income"
        description={`From ${dateFormat(startDate)} to ${dateFormat(endDate)}`}
        content={formatCurrency(data.income)}
        contentClassName="text-green-400"
      />
      <StatCard
        title="Total Expenses"
        content={formatCurrency(data.expenses)}
        description={`From ${dateFormat(startDate)} to ${dateFormat(endDate)}`}
        contentClassName="text-red-400"
      />
      <StatCard
        title="Net Balance"
        content={prefix + formatCurrency(data.netBalance)}
        description={`From ${dateFormat(startDate)} to ${dateFormat(endDate)}`}
        contentClassName={balanceColor}
        className="md:col-span-2 lg:col-span-1"
      />
    </div>
  )
}

export default DashboardStats
