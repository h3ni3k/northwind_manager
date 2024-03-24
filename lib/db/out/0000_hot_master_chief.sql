-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "us_states" (
	"state_id" serial PRIMARY KEY NOT NULL,
	"state_name" varchar(100),
	"state_abbr" varchar(2),
	"state_region" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"customer_id" serial PRIMARY KEY NOT NULL,
	"short_name" varchar(5) NOT NULL,
	"company_name" varchar(40) NOT NULL,
	"contact_name" varchar(30),
	"contact_title" varchar(30),
	"address" varchar(60),
	"city" varchar(15),
	"region" varchar(15),
	"postal_code" varchar(10),
	"country" varchar(15),
	"phone" varchar(24),
	"fax" varchar(24)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"order_id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer,
	"employee_id" integer,
	"order_date" date,
	"required_date" date,
	"shipped_date" date,
	"ship_via" integer,
	"freight" real,
	"ship_name" varchar(40),
	"ship_address" varchar(60),
	"ship_city" varchar(15),
	"ship_region" varchar(15),
	"ship_postal_code" varchar(10),
	"ship_country" varchar(15)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shippers" (
	"shipper_id" serial PRIMARY KEY NOT NULL,
	"company_name" varchar(40) NOT NULL,
	"phone" varchar(24)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "suppliers" (
	"supplier_id" serial PRIMARY KEY NOT NULL,
	"company_name" varchar(40) NOT NULL,
	"contact_name" varchar(30),
	"contact_title" varchar(30),
	"address" varchar(60),
	"city" varchar(15),
	"region" varchar(15),
	"postal_code" varchar(10),
	"country" varchar(15),
	"phone" varchar(24),
	"fax" varchar(24),
	"homepage" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "region" (
	"region_id" serial PRIMARY KEY NOT NULL,
	"region_description" varchar(60) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"product_id" serial PRIMARY KEY NOT NULL,
	"product_name" varchar(40) NOT NULL,
	"supplier_id" integer,
	"category_id" integer,
	"quantity_per_unit" varchar(20),
	"unit_price" real,
	"units_in_stock" integer,
	"units_on_order" integer,
	"reorder_level" integer,
	"discontinued" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "territories" (
	"territory_id" varchar(5) PRIMARY KEY NOT NULL,
	"territory_name" varchar(20) NOT NULL,
	"territory_description" varchar(60) NOT NULL,
	"region_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer_demographics" (
	"customer_type_id" serial PRIMARY KEY NOT NULL,
	"customer_type_name" varchar(10),
	"customer_desc" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"hashed_password" text NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"employee_id" serial PRIMARY KEY NOT NULL,
	"last_name" varchar(20) NOT NULL,
	"first_name" varchar(10) NOT NULL,
	"title" varchar(30),
	"title_of_courtesy" varchar(25),
	"birth_date" date,
	"hire_date" date,
	"address" varchar(60),
	"city" varchar(15),
	"region" varchar(15),
	"postal_code" varchar(10),
	"country" varchar(15),
	"home_phone" varchar(24),
	"extension" varchar(4),
	"photo" text,
	"notes" text,
	"reports_to" integer,
	"photo_path" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"category_name" varchar(15) NOT NULL,
	"description" text,
	"picture" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee_territories" (
	"employee_id" integer NOT NULL,
	"territory_id" varchar(5) NOT NULL,
	CONSTRAINT "pk_employee_territories" PRIMARY KEY("employee_id","territory_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer_customer_demo" (
	"customer_id" integer NOT NULL,
	"customer_type_id" integer NOT NULL,
	CONSTRAINT "pk_customer_customer_demo" PRIMARY KEY("customer_id","customer_type_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"unit_price" real NOT NULL,
	"quantity" real NOT NULL,
	"discount" real NOT NULL,
	CONSTRAINT "pk_order_details" PRIMARY KEY("order_id","product_id")
);

*/