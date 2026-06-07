import { useUpdateExpenseMutation } from "@/features/transactions/hooks/useUpdateExpenseMutation"
import { toast } from "sonner"
import type { AddExpenseData } from "@/features/transactions/schemas/addExpenseSchema"
import type { UpdateExpenseData } from "@/features/transactions/schemas/updateExpenseSchema"
import { useGetExpenseByIdQuery } from "@/features/transactions/hooks/useGetExpenseByIdQuery"
import BaseExpenseForm from "@/features/transactions/components/BaseExpenseForm"

type Props = Readonly<{
  expenseId: string
  onChange: (open: boolean) => void
}>

const UpdateExpenseForm = ({ expenseId, onChange }: Props) => {
  const { data: expense } = useGetExpenseByIdQuery({ expenseId })
  const updateExpenseMutation = useUpdateExpenseMutation()

  const initialValues: AddExpenseData = {
    amount: parseFloat(expense.amount),
    merchant: expense.merchant,
    category: expense.category,
    date: new Date(expense.date),
    description: expense.description ?? "",
  }

  const handleSubmit = (values: AddExpenseData) => {
    const payload: UpdateExpenseData = {
      expenseId,
      ...values,
    }
    updateExpenseMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          toast.success("Expense Entry Updated", {
            description: "Your expense entry has been successfully updated.",
          })
          onChange(false)
        },
      }
    )
  }

  return (
    <BaseExpenseForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isPending={updateExpenseMutation.isPending}
      onCancel={() => onChange(false)}
      descriptionPlaceholder="Dinner with Client"
    />
  )
}

export default UpdateExpenseForm
