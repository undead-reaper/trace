import { useGetDashboardStatsQuery } from "@/features/dashboard/hooks/useGetDashboardStatsQuery"
import StatCard from "@/features/dashboard/components/StatCard"
import { format } from "date-fns"

const DashboardStats = () => {
  const { data } = useGetDashboardStatsQuery()

  const cashflowPositive = data.monthlyCashflow > 0
  const cashflowNegative = data.monthlyCashflow < 0
  const prefix = cashflowPositive ? "+" : cashflowNegative ? "-" : ""
  const cashflowColor = cashflowPositive
    ? "text-green-400"
    : cashflowNegative
      ? "text-red-400"
      : "text-foreground"
  const formatAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return (
    <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Net Balance"
        description="All Time"
        content={formatAmount.format(data.netBalance)}
      />
      <StatCard
        title="Monthly Cashflow"
        content={`${prefix}${formatAmount.format(Math.abs(data.monthlyCashflow))}`}
        description={format(new Date(), "MMMM yyyy")}
        contentClassName={cashflowColor}
      />
      <StatCard
        title="Top Spending Category"
        description={`${formatAmount.format(data.topCategoryAmount)} this month`}
        content={data.topCategory ?? "None"}
        className="md:col-span-2 lg:col-span-1"
      />
    </div>
  )
}

export default DashboardStats
