import IncomeBreakdownCard from "@/features/dashboard/components/IncomeBreakdownCard"
import ReportsStats from "@/features/dashboard/components/ReportsStats"
import ExpensesBreakdownCard from "@/features/dashboard/components/ExpensesBreakdownCard"
import { useGetCategoryBreakdownQuery } from "@/features/dashboard/hooks/useGetCategoryBreakdownQuery"
import { serializeDateRange, exportToCSV, formatCurrency } from "@/lib/utils"
import { getRouteApi } from "@tanstack/react-router"
import DateRangePicker from "@/features/dashboard/components/DateRangePicker"
import TrendBarCard from "@/features/dashboard/components/TrendBarCard"
import ExportButton from "@/features/dashboard/components/ExportButton"
import { useGetTimeTrendsDataQuery } from "../hooks/useGetTimeTrendsDataQuery"

const ReportsView = () => {
  const routeApi = getRouteApi("/dashboard/reports")
  const search = routeApi.useSearch()
  const { startDate, endDate } = serializeDateRange(search)
  const { data: categoryData } = useGetCategoryBreakdownQuery({
    startDate: startDate,
    endDate: endDate,
  })
  const { data: trendsData } = useGetTimeTrendsDataQuery({
    startDate,
    endDate,
  })

  const handleExport = async () => {
    const trendRows = trendsData.map((trend) => ({
      "Report Type": "Monthly Trend",
      Detail: trend.month,
      Income: formatCurrency(trend.income),
      Expenses: formatCurrency(trend.expenses),
      Net: formatCurrency(trend.income - trend.expenses),
    }))

    const categoryIncomeRows = categoryData.income.map((income) => ({
      "Report Type": "Income by Category",
      Detail: income.name,
      Income: formatCurrency(income.value),
      Expenses: formatCurrency(0),
      Net: formatCurrency(income.value),
    }))

    const categoryExpensesRows = categoryData.expenses.map((expense) => ({
      "Report Type": "Expenses by Category",
      Detail: expense.name,
      Income: formatCurrency(0),
      Expenses: formatCurrency(expense.value),
      Net: formatCurrency(-expense.value),
    }))

    const csvData = [
      ...trendRows,
      { "Report Type": "", Detail: "", Income: "", Expenses: "", Net: "" },
      ...categoryIncomeRows,
      ...categoryExpensesRows,
    ]

    exportToCSV({
      data: csvData,
      fileName: `full_report_${startDate.toISOString()}_to_${endDate.toISOString()}.csv`,
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-10">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div className="flex flex-col gap-2">
          <h1 className="font-noto-serif text-5xl font-bold">Reports</h1>
          <p className="text-sm text-muted-foreground">
            View detailed reports and insights about your financial data.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangePicker startDate={startDate} endDate={endDate} />
          <ExportButton onClick={handleExport} />
        </div>
      </div>
      <ReportsStats />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <IncomeBreakdownCard incomes={categoryData.income} />
        <ExpensesBreakdownCard expenses={categoryData.expenses} />
      </div>
      <TrendBarCard transactions={trendsData} />
    </div>
  )
}

export default ReportsView
