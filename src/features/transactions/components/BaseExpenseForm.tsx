import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoadingSwap } from "@/components/ui/loading-swap"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { addExpenseSchema } from "@/features/transactions/schemas/addExpenseSchema"
import type { AddExpenseData } from "@/features/transactions/schemas/addExpenseSchema"
import { useForm } from "@tanstack/react-form"
import { format } from "date-fns"
import { NumericFormat } from "react-number-format"

type Props = Readonly<{
  initialValues: AddExpenseData
  onSubmit: (values: AddExpenseData) => void
  isPending: boolean
  onCancel: () => void
}>

const BaseExpenseForm = ({
  initialValues,
  isPending,
  onCancel,
  onSubmit,
}: Props) => {
  const form = useForm({
    defaultValues: initialValues,
    validators: {
      onSubmit: addExpenseSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value)
    },
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4"
    >
      <form.Field
        name="amount"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field aria-disabled={isPending} data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
              <NumericFormat
                customInput={Input}
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale
                disabled={isPending}
                allowNegative={false}
                onFocus={(e) => e.target.select()}
                prefix="$"
                value={field.state.value}
                id={field.name}
                name={field.name}
                onValueChange={(e) => {
                  if (e.floatValue !== undefined) {
                    field.handleChange(e.floatValue)
                  } else {
                    field.handleChange(0)
                  }
                }}
                placeholder="$0.00"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />
      <form.Field
        name="merchant"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field aria-disabled={isPending} data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Merchant</FieldLabel>
              <Input
                id={field.name}
                aria-invalid={isInvalid}
                value={field.state.value}
                disabled={isPending}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Netflix Subscription"
                autoComplete="off"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />
      <div className="flex flex-row items-center justify-between gap-4">
        <form.Field
          name="date"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field aria-disabled={isPending} data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                <Popover>
                  <PopoverTrigger
                    disabled={isPending}
                    render={
                      <Button
                        variant="outline"
                        id={field.name}
                        className="justify-start font-normal"
                      />
                    }
                  >
                    {field.state.value ? (
                      format(field.state.value, "PPP")
                    ) : (
                      <span>Select a Date</span>
                    )}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.state.value}
                      onSelect={(e) => {
                        if (e) {
                          field.handleChange(e)
                        }
                      }}
                      defaultMonth={field.state.value}
                    />
                  </PopoverContent>
                </Popover>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="category"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field
                aria-disabled={isPending}
                orientation="responsive"
                data-invalid={isInvalid}
              >
                <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                <Select
                  value={field.state.value}
                  disabled={isPending}
                  onValueChange={(val) => {
                    if (val) {
                      field.handleChange(val)
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                      {addExpenseSchema.shape.category.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </div>
      <form.Field
        name="description"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field aria-disabled={isPending} data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                id={field.name}
                disabled={isPending}
                aria-invalid={isInvalid}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Received a bonus for Q2 performance."
                autoComplete="off"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />
      <Field
        orientation="horizontal"
        className="flex flex-row items-center justify-end"
      >
        <Button
          disabled={isPending}
          onClick={onCancel}
          variant="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isPending} type="submit">
          <LoadingSwap isLoading={isPending}>Save Expense</LoadingSwap>
        </Button>
      </Field>
    </form>
  )
}

export default BaseExpenseForm
