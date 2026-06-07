import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGetRecentTransactionsQuery } from "@/features/dashboard/hooks/useGetRecentTransactionsQuery"
import TransactionsList from "@/features/dashboard/components/TransactionsList"
import EmptyCard from "@/features/dashboard/components/EmptyCard"

const RecentTransactionsCard = () => {
  const { data: recentTransactions } = useGetRecentTransactionsQuery()

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="font-noto-serif text-lg font-bold">
          Recent Transactions
        </CardTitle>
        <CardDescription>
          View your recent transactions and track your spending
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recentTransactions.length === 0 ? (
          <EmptyCard />
        ) : (
          <TransactionsList transactions={recentTransactions} />
        )}
      </CardContent>
    </Card>
  )
}

export default RecentTransactionsCard
