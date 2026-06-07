import IncomeBreakdownCard from "@/features/dashboard/components/IncomeBreakdownCard"
import ReportsStats from "@/features/dashboard/components/ReportsStats"
import ExpensesBreakdownCard from "@/features/dashboard/components/ExpensesBreakdownCard"
import { useGetCategoryBreakdownQuery } from "@/features/dashboard/hooks/useGetCategoryBreakdownQuery"
import { serializeDateRange } from "@/lib/utils"
import { getRouteApi } from "@tanstack/react-router"
import DateRangePicker from "@/features/dashboard/components/DateRangePicker"

const ReportsView = () => {
  const routeApi = getRouteApi("/dashboard/reports")
  const search = routeApi.useSearch()
  const { startDate, endDate } = serializeDateRange(search)
  const { data } = useGetCategoryBreakdownQuery({
    startDate: startDate,
    endDate: endDate,
  })

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-10">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div className="flex flex-col gap-2">
          <h1 className="font-noto-serif text-5xl font-bold">Reports</h1>
          <p className="text-sm text-muted-foreground">
            View detailed reports and insights about your financial data.
          </p>
        </div>
        <DateRangePicker startDate={startDate} endDate={endDate} />
      </div>
      <ReportsStats />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <IncomeBreakdownCard incomes={data.income} />
        <ExpensesBreakdownCard expenses={data.expenses} />
      </div>
    </div>
  )
}

export default ReportsView
