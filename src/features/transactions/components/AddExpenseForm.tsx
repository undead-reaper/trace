import type { AddExpenseData } from "@/features/transactions/schemas/addExpenseSchema"
import { useAddExpenseMutation } from "@/features/transactions/hooks/useAddExpenseMutation"
import { toast } from "sonner"
import BaseExpenseForm from "@/features/transactions/components/BaseExpenseForm"

type Props = Readonly<{
  onChange: (open: boolean) => void
}>

const AddExpenseForm = ({ onChange }: Props) => {
  const addExpenseMutation = useAddExpenseMutation()

  const defaultValues: AddExpenseData = {
    amount: 0,
    merchant: "",
    category: "Shopping",
    date: new Date(),
    description: "",
  }

  const handleSubmit = (data: AddExpenseData) => {
    addExpenseMutation.mutate(
      { data: data },
      {
        onSuccess: () => {
          onChange(false)
          toast.success("Expense Entry Created", {
            description: "Your expense entry has been successfully created.",
          })
        },
        onError: (error) => {
          toast.error("Failed to Create Expense Entry", {
            description: error.message,
          })
        },
      }
    )
  }

  return (
    <BaseExpenseForm
      initialValues={defaultValues}
      onSubmit={handleSubmit}
      isPending={addExpenseMutation.isPending}
      onCancel={() => onChange(false)}
    />
  )
}

export default AddExpenseForm
