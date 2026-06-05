import ResponsiveModal from "@/components/ResponsiveModal"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"
import UpdateExpenseForm from "@/features/transactions/components/UpdateExpenseForm"

type Props = Readonly<{
  open: boolean
  onOpenChange: (open: boolean) => void
  expenseId: string
}>

const UpdateExpenseDialog = ({ expenseId, onOpenChange, open }: Props) => {
  return (
    <ResponsiveModal
      title="Update Expense Entry"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Suspense
        fallback={
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        }
      >
        {expenseId && (
          <UpdateExpenseForm onChange={onOpenChange} expenseId={expenseId} />
        )}
      </Suspense>
    </ResponsiveModal>
  )
}

export default UpdateExpenseDialog
