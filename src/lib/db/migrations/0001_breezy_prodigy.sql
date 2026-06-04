CREATE TYPE "public"."income_categories" AS ENUM('Employment', 'Self Employment', 'Business Revenue', 'Investments', 'Rental', 'Benefits', 'Gifts', 'Refunds', 'Asset Sales', 'Transfers', 'Royalties', 'Other');--> statement-breakpoint
CREATE TABLE "income" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"source" text NOT NULL,
	"category" "income_categories" NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "income" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "expenses" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "description" text;