import AddExpenseButton from "@/features/transactions/components/AddExpenseButton"
import { useDeleteExpenseMutation } from "@/features/transactions/hooks/useDeleteExpenseMutation"
import { useGetAllExpensesQuery } from "@/features/transactions/hooks/useGetAllExpensesQuery"
import { getRouteApi } from "@tanstack/react-router"
import { useState, useTransition } from "react"
import { useDeleteManyExpensesMutation } from "@/features/transactions/hooks/useDeleteManyExpensesMutation"
import { toast } from "sonner"
import DataTable from "@/features/dashboard/components/DataTable"
import { ExpenseColumns } from "@/features/transactions/tables/ExpenseTables"
import ConfirmDialog from "@/components/ConfirmDialog"
import UpdateExpenseDialog from "@/features/transactions/components/UpdateExpenseDialog"
import { useQueryClient } from "@tanstack/react-query"
import { getAllExpensesOptions } from "@/features/transactions/queryOptions/getAllExpensesOptions"

const ExpensesView = () => {
  const routeApi = getRouteApi("/dashboard/expenses")
  const { page = 1 } = routeApi.useSearch()
  const [isPending, startTransition] = useTransition()
  const { data } = useGetAllExpensesQuery({ page })
  const deleteExpenseMutation = useDeleteExpenseMutation()
  const deleteManyExpensesMutation = useDeleteManyExpensesMutation()

  const [deleteSelectedConfig, setDeleteSelectedConfig] = useState<{
    ids: string[]
    clearSelection: () => void
  } | null>(null)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  const [idToUpdate, setIdToUpdate] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const handleDelete = (id: string) => {
    deleteExpenseMutation.mutate(
      { data: { expenseId: id } },
      {
        onSuccess: () => {
          toast.success("Expense Entry Deleted", {
            description: "Your expense entry has been successfully deleted.",
          })
          setIdToDelete(null)
        },
        onError: (error) => {
          toast.error("Failed to Delete Expense Entry", {
            description: error.message,
          })
        },
      }
    )
  }

  const handleDeleteSelected = () => {
    if (!deleteSelectedConfig) return
    deleteManyExpensesMutation.mutate(
      { ids: deleteSelectedConfig.ids },
      {
        onSuccess: () => {
          toast.success("Expense Entries Deleted", {
            description:
              "Your selected expense entries have been successfully deleted.",
          })
          deleteSelectedConfig.clearSelection()
          setDeleteSelectedConfig(null)
        },
        onError: (error) => {
          toast.error("Failed to Delete Expense Entries", {
            description: error.message,
          })
        },
      }
    )
  }

  return (
    <>
      <ConfirmDialog
        open={!!idToDelete}
        onOpenChange={(isOpen) => {
          if (!isOpen) setIdToDelete(null)
        }}
        title="Delete Expense Entry"
        description="Are you sure you want to delete the expense entry? This action is not reversible"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (idToDelete) handleDelete(idToDelete)
        }}
      />
      {idToUpdate && (
        <UpdateExpenseDialog
          expenseId={idToUpdate}
          open={!!idToUpdate}
          onOpenChange={(isOpen) => {
            if (!isOpen) setIdToUpdate(null)
          }}
        />
      )}
      <ConfirmDialog
        open={!!deleteSelectedConfig}
        onOpenChange={(isOpen) => {
          if (!isOpen) setDeleteSelectedConfig(null)
        }}
        title="Delete Multiple Entries"
        description={`Are you sure you want to delete ${deleteSelectedConfig?.ids.length ?? 0} entries? This action is not reversible.`}
        confirmLabel="Delete All"
        cancelLabel="Cancel"
        onConfirm={handleDeleteSelected}
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-noto-serif text-5xl font-bold">Expenses</h1>
            <p className="text-sm text-muted-foreground">
              Manage your expense categories and track your spending.
            </p>
          </div>
          <AddExpenseButton />
        </div>
        <DataTable
          data={data.items}
          columns={ExpenseColumns}
          page={page}
          totalPages={data.totalPages}
          isPending={isPending}
          startTransition={startTransition}
          onDelete={setIdToDelete}
          onUpdate={setIdToUpdate}
          onDeleteSelected={(ids, clearSelection) => {
            setDeleteSelectedConfig({ ids, clearSelection })
          }}
          getRowId={(row) => row.id}
          searchColumn="merchant"
          nextPrefetch={() => {
            queryClient.prefetchQuery(getAllExpensesOptions({ page: page + 1 }))
          }}
          nextLoader={{
            to: "/dashboard/expenses",
            search: (prev) => ({
              ...prev,
              page: page + 1,
            }),
            resetScroll: false,
          }}
          previousPrefetch={() => {
            queryClient.prefetchQuery(getAllExpensesOptions({ page: page - 1 }))
          }}
          previousLoader={{
            to: "/dashboard/expenses",
            search: (prev) => ({
              ...prev,
              page: Math.max(page - 1, 1),
            }),
            resetScroll: false,
          }}
        />
      </div>
    </>
  )
}

export default ExpensesView
