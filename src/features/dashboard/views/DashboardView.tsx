import DashboardStats from "@/features/dashboard/components/DashboardStats"
import TransactionsChart from "@/features/dashboard/components/TransactionsChart"
import RecentTransactionsCard from "@/features/dashboard/components/RecentTransactionsCard"

const DashboardView = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-10">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div className="flex flex-col gap-1">
          <h1 className="font-noto-serif text-5xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Get an overview of your financial health, track your income and
            expenses.
          </p>
        </div>
      </div>
      <DashboardStats />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TransactionsChart />
        <RecentTransactionsCard />
      </div>
    </div>
  )
}

export default DashboardView
