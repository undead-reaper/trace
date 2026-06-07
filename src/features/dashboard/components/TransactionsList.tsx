import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import type { Transaction } from "@/features/dashboard/types/transaction"
import { cn, formatCurrency } from "@/lib/utils"
import { format } from "date-fns"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

type Props = Readonly<{
  transactions: Array<Transaction>
}>

const TransactionsList = ({ transactions }: Props) => {
  return (
    <div>
      {transactions.map((transaction) => {
        const isIncome = transaction.type === "income"
        const icon = isIncome ? (
          <TrendingUpIcon className="text-green-400" />
        ) : (
          <TrendingDownIcon className="text-red-400" />
        )

        const amount = formatCurrency(transaction.amount)
        const prefix = isIncome ? "+" : "-"

        return (
          <Item key={transaction.id}>
            <ItemMedia variant="icon">{icon}</ItemMedia>
            <ItemContent>
              <ItemTitle className="font-bold">{transaction.name}</ItemTitle>
              <ItemDescription className="text-xs">
                {format(transaction.date, "MMM dd, yyyy")}
              </ItemDescription>
            </ItemContent>
            <ItemContent className="flex-none text-center">
              <span
                className={cn(
                  "text-sm font-medium",
                  isIncome ? "text-green-400" : "text-red-400"
                )}
              >
                {prefix + amount}
              </span>
            </ItemContent>
          </Item>
        )
      })}
    </div>
  )
}

export default TransactionsList
