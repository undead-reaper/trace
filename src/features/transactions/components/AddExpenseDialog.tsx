import ResponsiveModal from "@/components/ResponsiveModal"
import AddExpenseForm from "@/features/transactions/components/AddExpenseForm"

type Props = Readonly<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>

const AddExpenseDialog = ({ onOpenChange, open }: Props) => {
  return (
    <ResponsiveModal
      title="Add New Expense"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AddExpenseForm onChange={onOpenChange} />
    </ResponsiveModal>
  )
}

export default AddExpenseDialog
