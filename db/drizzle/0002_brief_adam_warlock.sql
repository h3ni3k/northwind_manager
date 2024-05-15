CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"user_id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"hashed_password" text DEFAULT '' NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "standard_unit_cost" TO "unit_cost";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "targer_level" TO "target_level";--> statement-breakpoint
ALTER TABLE "order_details" ALTER COLUMN "discount" SET DATA TYPE numeric(4, 2);--> statement-breakpoint
ALTER TABLE "order_details" ALTER COLUMN "discount" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_fee" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_fee" SET DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "unit_price" numeric(10, 4) DEFAULT 0::numeric;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
