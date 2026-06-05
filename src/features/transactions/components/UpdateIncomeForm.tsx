import { useGetIncomeByIdQuery } from "@/features/transactions/hooks/useGetIncomeByIdQuery"
import { useUpdateIncomeMutation } from "@/features/transactions/hooks/useUpdateIncomeMutation"
import type { AddIncomeData } from "@/features/transactions/schemas/addIncomeSchema"
import BaseIncomeForm from "@/features/transactions/components/BaseIncomeForm"
import { toast } from "sonner"
import type { UpdateIncomeData } from "@/features/transactions/schemas/updateIncomeSchema"

type Props = Readonly<{
  incomeId: string
  onChange: (open: boolean) => void
}>

const UpdateIncomeForm = ({ incomeId, onChange }: Props) => {
  const { data: income } = useGetIncomeByIdQuery({ incomeId })
  const updateIncomeMutation = useUpdateIncomeMutation()

  const initialValues: AddIncomeData = {
    amount: parseFloat(income.amount),
    source: income.source,
    category: income.category,
    date: new Date(income.date),
    description: income.description ?? "",
  }

  const handleSubmit = (values: AddIncomeData) => {
    const payload: UpdateIncomeData = {
      incomeId,
      ...values,
    }
    updateIncomeMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          toast.success("Income Entry Updated", {
            description: "Your income entry has been successfully updated.",
          })
          onChange(false)
        },
      }
    )
  }

  return (
    <BaseIncomeForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isPending={updateIncomeMutation.isPending}
      onCancel={() => onChange(false)}
    />
  )
}

export default UpdateIncomeForm
