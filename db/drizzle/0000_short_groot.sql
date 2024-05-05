DO $$ BEGIN
 CREATE TYPE "payment_method" AS ENUM('Credit Card', 'Check', 'Cash', 'Bank Transfer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"category_name" varchar(255),
	"category_code" varchar(3),
	"category_desc" varchar(255),
	"category_image" text,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"company_id" serial PRIMARY KEY NOT NULL,
	"company_name" varchar(50),
	"company_type_id" integer,
	"business_phone" varchar(20),
	"address" varchar(255),
	"city" varchar(255),
	"region_id" integer,
	"postal_code" varchar(10),
	"website" text,
	"notes" text,
	"tax_status_id" integer,
	"contact_id" integer,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_types" (
	"company_type_id" serial PRIMARY KEY NOT NULL,
	"company_type" varchar(50),
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts" (
	"contact_id" serial PRIMARY KEY NOT NULL,
	"company_id" integer,
	"last_name" varchar(30),
	"first_name" varchar(30),
	"email" varchar(255),
	"job_title" varchar(50),
	"primary_phone" varchar(12),
	"secondary_phone" varchar(12),
	"notes" text,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee_privileges" (
	"employee_privilege_id" serial PRIMARY KEY NOT NULL,
	"employee_id" integer,
	"privilege_id" integer,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"employee_id" serial PRIMARY KEY NOT NULL,
	"last_name" varchar(30),
	"first_name" varchar(30),
	"email" varchar(255),
	"job_title" varchar(50),
	"primary_phone" varchar(12),
	"secondary_phone" varchar(12),
	"title_id" integer,
	"notes" text,
	"attachments" text,
	"supervisor_id" integer,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"order_detail_id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer DEFAULT 0,
	"unit_price" numeric(10, 4),
	"discount" numeric(1, 2) DEFAULT 0.00::numeric,
	"order_details_status_id" integer,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details_status" (
	"order_details_status_id" serial PRIMARY KEY NOT NULL,
	"order_details_status_name" varchar(50),
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_status" (
	"order_status_id" serial PRIMARY KEY NOT NULL,
	"order_status_code" varchar(4),
	"order_status_name" varchar(50),
	"sord_order" integer DEFAULT 0,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"order_id" serial PRIMARY KEY NOT NULL,
	"employee_id" integer,
	"customer_id" integer,
	"order_date" date DEFAULT now(),
	"invoice_date" date,
	"shipped_date" date,
	"shipper_id" integer,
	"shipping_fee" numeric(10, 4),
	"tax_rate" integer,
	"tax_status_id" integer,
	"payment_method" "payment_method",
	"paid_date" date,
	"notes" text,
	"order_status_id" integer,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "privileges" (
	"privilege_id" serial PRIMARY KEY NOT NULL,
	"privilege_name" varchar(50),
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_vendors" (
	"product_vendor_id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"vendor_id" integer,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"product_id" serial PRIMARY KEY NOT NULL,
	"product_code" varchar(20),
	"product_name" varchar(50),
	"product_desc" varchar(255),
	"standard_unit_cost" numeric(10, 4) DEFAULT 0::numeric,
	"reorder_level" integer,
	"targer_level" integer,
	"quantity_per_unit" varchar(50),
	"discontinued" boolean DEFAULT false,
	"minimum_reorder_quantity" integer,
	"category_id" integer,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone,
	CONSTRAINT "products_product_code_unique" UNIQUE("product_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "purchase_order_details" (
	"purchase_order_detail_id" serial PRIMARY KEY NOT NULL,
	"purchase_order_id" integer,
	"product_id" integer,
	"quantity" integer DEFAULT 0,
	"unit_cost" numeric(10, 4),
	"received_date" date,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "purchase_order_status" (
	"status_id" serial PRIMARY KEY NOT NULL,
	"status_name" varchar(50),
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "purchase_orders" (
	"purchase_order_id" serial PRIMARY KEY NOT NULL,
	"vendor_id" integer,
	"submitted_by" integer,
	"submitted_date" date,
	"approved_by" integer,
	"approved_date" date,
	"status_id" integer,
	"received_date" date,
	"shipping_fee" numeric(10, 4),
	"payment_date" date,
	"payment_amount" numeric(10, 4),
	"payment_method" "payment_method",
	"notes" text,
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "regions" (
	"region_id" serial PRIMARY KEY NOT NULL,
	"region_abbrev" varchar(3),
	"region_name" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stock_take" (
	"stock_take_id" serial PRIMARY KEY NOT NULL,
	"stock_take_date" date DEFAULT now(),
	"product_id" integer,
	"quantity_on_hand" integer,
	"expected_quantity" integer,
	"created_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "system_settings" (
	"setting_id" serial PRIMARY KEY NOT NULL,
	"setting_name" varchar(50),
	"setting_value" varchar(255),
	"setting_desc" varchar(255),
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tax_status" (
	"tax_status_id" serial PRIMARY KEY NOT NULL,
	"tax_status" varchar(50),
	"created_at" timestamp with time zone,
	"modified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "titles" (
	"title_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_name_idx" ON "companies" ("company_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "contact_name_idx" ON "contacts" ("first_name","last_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_name_idx" ON "employees" ("first_name","last_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_code_idx" ON "products" ("product_code");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_company_type_id_company_types_company_type_id_fk" FOREIGN KEY ("company_type_id") REFERENCES "company_types"("company_type_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_region_id_regions_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "regions"("region_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_tax_status_id_tax_status_tax_status_id_fk" FOREIGN KEY ("tax_status_id") REFERENCES "tax_status"("tax_status_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts" ADD CONSTRAINT "contacts_company_id_companies_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_privileges" ADD CONSTRAINT "employee_privileges_employee_id_employees_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "employees"("employee_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_privileges" ADD CONSTRAINT "employee_privileges_privilege_id_privileges_privilege_id_fk" FOREIGN KEY ("privilege_id") REFERENCES "privileges"("privilege_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_title_id_titles_title_id_fk" FOREIGN KEY ("title_id") REFERENCES "titles"("title_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_supervisor_id_employees_employee_id_fk" FOREIGN KEY ("supervisor_id") REFERENCES "employees"("employee_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_order_details_status_id_order_details_status_order_details_status_id_fk" FOREIGN KEY ("order_details_status_id") REFERENCES "order_details_status"("order_details_status_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_employee_id_employees_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "employees"("employee_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_companies_company_id_fk" FOREIGN KEY ("customer_id") REFERENCES "companies"("company_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_shipper_id_companies_company_id_fk" FOREIGN KEY ("shipper_id") REFERENCES "companies"("company_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_tax_status_id_tax_status_tax_status_id_fk" FOREIGN KEY ("tax_status_id") REFERENCES "tax_status"("tax_status_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_order_status_id_order_status_order_status_id_fk" FOREIGN KEY ("order_status_id") REFERENCES "order_status"("order_status_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_vendors" ADD CONSTRAINT "product_vendors_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_vendors" ADD CONSTRAINT "product_vendors_vendor_id_companies_company_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "companies"("company_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase_order_details" ADD CONSTRAINT "purchase_order_details_purchase_order_id_purchase_orders_purchase_order_id_fk" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_orders"("purchase_order_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase_order_details" ADD CONSTRAINT "purchase_order_details_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_vendor_id_companies_company_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "companies"("company_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_submitted_by_employees_employee_id_fk" FOREIGN KEY ("submitted_by") REFERENCES "employees"("employee_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_approved_by_employees_employee_id_fk" FOREIGN KEY ("approved_by") REFERENCES "employees"("employee_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_status_id_purchase_order_status_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "purchase_order_status"("status_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock_take" ADD CONSTRAINT "stock_take_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
