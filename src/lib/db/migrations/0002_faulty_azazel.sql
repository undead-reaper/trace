CREATE INDEX "idx_expenses_user_category" ON "expenses" USING btree ("user_id","category");--> statement-breakpoint
CREATE INDEX "idx_expenses_user_date" ON "expenses" USING btree ("date","user_id");--> statement-breakpoint
CREATE INDEX "idx_income_user_category" ON "income" USING btree ("user_id","category");--> statement-breakpoint
CREATE INDEX "idx_income_user_date" ON "income" USING btree ("date","user_id");