import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { useGetRecentTransactionsQuery } from "@/features/dashboard/hooks/useGetRecentTransactionsQuery"
import { CreditCardIcon } from "lucide-react"
import TransactionsList from "@/features/dashboard/components/TransactionsList"

const EmptyTransactionsCard = () => {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader className="h-auto">
        <EmptyMedia variant="icon">
          <CreditCardIcon />
        </EmptyMedia>
        <EmptyTitle className="font-noto-serif text-sm">
          No Transactions Yet
        </EmptyTitle>
        <EmptyDescription className="text-xs">
          Add a transaction to get started
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

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
          <EmptyTransactionsCard />
        ) : (
          <TransactionsList transactions={recentTransactions} />
        )}
      </CardContent>
    </Card>
  )
}

export default RecentTransactionsCard
