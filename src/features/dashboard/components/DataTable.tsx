import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQueryClient } from "@tanstack/react-query"
import { getAllIncomesOptions } from "@/features/transactions/queryOptions/getAllIncomesOptions"
import { cn } from "@/lib/utils"
import { useNavigate } from "@tanstack/react-router"

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  totalPages: number
  isPending: boolean
  startTransition: (callback: () => void) => void
  onUpdate: (id: string) => void
  onDelete: (id: string) => void
}

const DataTable = <TData, TValue>({
  columns,
  data,
  page,
  isPending,
  totalPages,
  startTransition,
  onUpdate,
  onDelete,
}: Props<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      onUpdate: (id) => onUpdate(id),
      onDelete: (id) => onDelete(id),
    },
  })

  return (
    <div>
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter Items..."
          className="max-w-sm"
          value={(table.getColumn("source")?.getFilterValue() ?? "") as string}
          onChange={(e) =>
            table.getColumn("source")?.setFilterValue(e.target.value)
          }
        />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" className="ml-auto" />}
          >
            Columns
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table className={cn(isPending && "pointer-events-none animate-pulse")}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            startTransition(() => {
              navigate({
                to: "/dashboard/income",
                search: (prev) => ({
                  ...prev,
                  page: Math.max(page - 1, 1),
                }),
              })
            })
          }}
          onMouseEnter={() => {
            if (page > 1) {
              queryClient.prefetchQuery(
                getAllIncomesOptions({ page: page - 1 })
              )
            }
          }}
          disabled={page === 1 || isPending}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            startTransition(() => {
              navigate({
                to: "/dashboard/income",
                search: (prev) => ({
                  ...prev,
                  page: page + 1,
                }),
              })
            })
          }}
          onMouseEnter={() => {
            if (page < totalPages) {
              queryClient.prefetchQuery(
                getAllIncomesOptions({ page: page + 1 })
              )
            }
          }}
          disabled={page === totalPages || isPending}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default DataTable
