import { relations } from "drizzle-orm";
import {
	date,
	integer,
	pgTable,
	primaryKey,
	real,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const usStates = pgTable("us_states", {
	stateId: serial("region_id").primaryKey().notNull(),
	stateName: varchar("region_name", { length: 100 }),
	stateAbbr: varchar("state_abbr", { length: 2 }),
	stateRegion: varchar("state_region", { length: 50 }),
});

export const customers = pgTable("customers", {
	customerId: serial("customer_id").primaryKey().notNull(),
	shortName: varchar("short_name", { length: 5 }).notNull(),
	companyName: varchar("company_name", { length: 40 }).notNull(),
	contactName: varchar("contact_name", { length: 30 }),
	contactTitle: varchar("contact_title", { length: 30 }),
	address: varchar("address", { length: 60 }),
	city: varchar("city", { length: 15 }),
	region: varchar("region", { length: 15 }),
	postalCode: varchar("postal_code", { length: 10 }),
	country: varchar("country", { length: 15 }),
	phone: varchar("phone", { length: 24 }),
	fax: varchar("fax", { length: 24 }),
});

export const orders = pgTable("orders", {
	orderId: serial("order_id").primaryKey().notNull(),
	customerId: integer("customer_id"),
	employeeId: integer("employee_id"),
	orderDate: date("order_date"),
	requiredDate: date("required_date"),
	shippedDate: date("shipped_date"),
	shipVia: integer("ship_via"),
	freight: real("freight"),
	shipName: varchar("ship_name", { length: 40 }),
	shipAddress: varchar("ship_address", { length: 60 }),
	shipCity: varchar("ship_city", { length: 15 }),
	shipRegion: varchar("ship_region", { length: 15 }),
	shipPostalCode: varchar("ship_postal_code", { length: 10 }),
	shipCountry: varchar("ship_country", { length: 15 }),
});

export const shippers = pgTable("shippers", {
	shipperId: serial("shipper_id").primaryKey().notNull(),
	companyName: varchar("company_name", { length: 40 }).notNull(),
	phone: varchar("phone", { length: 24 }),
});

export const suppliers = pgTable("suppliers", {
	supplierId: serial("supplier_id").primaryKey().notNull(),
	companyName: varchar("company_name", { length: 40 }).notNull(),
	contactName: varchar("contact_name", { length: 30 }),
	contactTitle: varchar("contact_title", { length: 30 }),
	address: varchar("address", { length: 60 }),
	city: varchar("city", { length: 15 }),
	region: varchar("region", { length: 15 }),
	postalCode: varchar("postal_code", { length: 10 }),
	country: varchar("country", { length: 15 }),
	phone: varchar("phone", { length: 24 }),
	fax: varchar("fax", { length: 24 }),
	homepage: text("homepage"),
});

export const region = pgTable("region", {
	regionId: serial("region_id").primaryKey().notNull(),
	regionDescription: varchar("region_description", { length: 60 }).notNull(),
});

export const products = pgTable("products", {
	productId: serial("product_id").primaryKey().notNull(),
	productName: varchar("product_name", { length: 40 }).notNull(),
	supplierId: integer("supplier_id"),
	categoryId: integer("category_id"),
	quantityPerUnit: varchar("quantity_per_unit", { length: 20 }),
	unitPrice: real("unit_price"),
	unitsInStock: integer("units_in_stock"),
	unitsOnOrder: integer("units_on_order"),
	reorderLevel: integer("reorder_level"),
	discontinued: integer("discontinued").notNull(),
});

export const territories = pgTable("territories", {
	territoryId: varchar("territory_id", { length: 5 }).primaryKey().notNull(),
	territoryName: varchar("territory_name", { length: 20 }).notNull(),
	territoryDescription: varchar("territory_description", {
		length: 60,
	}).notNull(),
	regionId: integer("region_id"),
});

export const customerDemographics = pgTable("customer_demographics", {
	customerTypeId: serial("customer_type_id").primaryKey().notNull(),
	customerTypeName: varchar("customer_type_name", { length: 10 }),
	customerDesc: text("customer_desc"),
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	username: text("username").unique().notNull(),
	hashedPassword: text("hashed_password").notNull(),
});

export const userRelations = relations(user, ({ one }) => ({
	sessions: one(session, {
		fields: [user.id],
		references: [session.userId],
	}),
	employee: one(employees, {
		fields: [user.id],
		references: [employees.userId],
	}),
}));

export const session = pgTable("session", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id")
		.notNull()
		.unique()
		.references(() => user.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const employees = pgTable("employees", {
	employeeId: serial("employee_id").primaryKey().notNull(),
	lastName: varchar("last_name", { length: 20 }).notNull(),
	firstName: varchar("first_name", { length: 10 }).notNull(),
	title: varchar("title", { length: 30 }),
	titleOfCourtesy: varchar("title_of_courtesy", { length: 25 }),
	birthDate: date("birth_date"),
	hireDate: date("hire_date"),
	address: varchar("address", { length: 60 }),
	city: varchar("city", { length: 15 }),
	region: varchar("region", { length: 15 }),
	postalCode: varchar("postal_code", { length: 10 }),
	country: varchar("country", { length: 15 }),
	homePhone: varchar("home_phone", { length: 24 }),
	extension: varchar("extension", { length: 4 }),
	photo: text("photo"),
	notes: text("notes"),
	reportsTo: integer("reports_to"),
	photoPath: varchar("photo_path", { length: 255 }),
	userId: text("user_id")
		.unique()
		.references(() => user.id),
});

export const employeeRelations = relations(employees, ({ one }) => ({
	user: one(user, {
		fields: [employees.userId],
		references: [user.id],
	}),
	reportsTo: one(employees, {
		fields: [employees.reportsTo],
		references: [employees.employeeId],
	}),
}));

export const categories = pgTable("categories", {
	categoryId: serial("category_id").primaryKey().notNull(),
	categoryName: varchar("category_name", { length: 15 }).notNull(),
	description: text("description"),
	picture: text("picture"),
});

export const employeeTerritories = pgTable(
	"employee_territories",
	{
		employeeId: integer("employee_id").notNull(),
		territoryId: varchar("territory_id", { length: 5 }).notNull(),
	},
	(table) => {
		return {
			pkEmployeeTerritories: primaryKey({
				columns: [table.employeeId, table.territoryId],
				name: "pk_employee_territories",
			}),
		};
	},
);

export const customerCustomerDemo = pgTable(
	"customer_customer_demo",
	{
		customerId: integer("customer_id").notNull(),
		customerTypeId: integer("customer_type_id").notNull(),
	},
	(table) => {
		return {
			pkCustomerCustomerDemo: primaryKey({
				columns: [table.customerId, table.customerTypeId],
				name: "pk_customer_customer_demo",
			}),
		};
	},
);

export const orderDetails = pgTable(
	"order_details",
	{
		orderId: integer("order_id").notNull(),
		productId: integer("product_id").notNull(),
		unitPrice: real("unit_price").notNull(),
		quantity: real("quantity").notNull(),
		discount: real("discount").notNull(),
	},
	(table) => {
		return {
			pkOrderDetails: primaryKey({
				columns: [table.orderId, table.productId],
				name: "pk_order_details",
			}),
		};
	},
);
