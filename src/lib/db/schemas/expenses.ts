import { numeric, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"

export const expenseCategories = pgEnum("expense_categories", [
  "Food",
  "Groceries",
  "Transportation",
  "Fuel",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Education",
  "Utilities",
  "Rent",
  "Mortgage",
  "Insurance",
  "Subscriptions",
  "Travel",
  "Gifts",
  "Personal Care",
  "Family",
  "Pets",
  "Taxes",
  "Debt Payment",
  "Investments",
  "Savings",
  "Charity",
  "Business",
  "Fees and Charges",
  "Cash Withdrawal",
  "Transfer",
  "Other",
])

export const expenses = pgTable("expenses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text("user_id").notNull(),
  merchant: text("merchant").notNull(),
  category: expenseCategories("category").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  date: timestamp("date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
