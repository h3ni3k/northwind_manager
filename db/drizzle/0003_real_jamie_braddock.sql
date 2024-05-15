DROP TABLE "product_vendors";--> statement-breakpoint
ALTER TABLE "session" RENAME TO "user_sessions";--> statement-breakpoint
ALTER TABLE "stock_take" RENAME TO "stock";--> statement-breakpoint
ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "vendor_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_vendor_id_companies_company_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."companies"("company_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
