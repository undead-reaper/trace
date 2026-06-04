CREATE TYPE "public"."expense_categories" AS ENUM('Food', 'Groceries', 'Transportation', 'Fuel', 'Shopping', 'Entertainment', 'Healthcare', 'Education', 'Utilities', 'Rent', 'Mortgage', 'Insurance', 'Subscriptions', 'Travel', 'Gifts', 'Personal Care', 'Family', 'Pets', 'Taxes', 'Debt Payment', 'Investments', 'Savings', 'Charity', 'Business', 'Fees and Charges', 'Cash Withdrawal', 'Transfer', 'Other');--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"merchant" text NOT NULL,
	"category" "expense_categories" NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
