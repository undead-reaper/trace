import ResponsiveModal from "@/components/ResponsiveModal"
import AddIncomeForm from "@/features/transactions/components/AddIncomeForm"

type Props = Readonly<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>

const AddIncomeDialog = ({ onOpenChange, open }: Props) => {
  return (
    <ResponsiveModal
      title="Create New Income"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AddIncomeForm onChange={onOpenChange} />
    </ResponsiveModal>
  )
}

export default AddIncomeDialog
