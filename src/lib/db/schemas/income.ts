import {
  index,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"

export const incomeCategories = pgEnum("income_categories", [
  "Employment",
  "Self Employment",
  "Business Revenue",
  "Investments",
  "Rental",
  "Benefits",
  "Gifts",
  "Refunds",
  "Asset Sales",
  "Transfers",
  "Royalties",
  "Other",
])

export const income = pgTable(
  "income",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id").notNull(),
    source: text("source").notNull(),
    category: incomeCategories("category").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    date: timestamp("date").defaultNow().notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("idx_income_user_category").on(t.userId, t.category),
    index("idx_income_user_date").on(t.date, t.userId),
  ]
).enableRLS()
