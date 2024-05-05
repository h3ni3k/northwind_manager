import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
	AnyPgColumn,
	boolean,
	date,
	index,
	integer,
	numeric,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const paymentMethodsEnum = pgEnum("payment_method", [
	"Credit Card",
	"Check",
	"Cash",
	"Bank Transfer",
]);

export const privileges = pgTable("privileges", {
	privilegeId: serial("privilege_id").primaryKey(),
	privileveName: varchar("privilege_name", { length: 50 }),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const employeePrivileges = pgTable("employee_privileges", {
	employeePrivilegeId: serial("employee_privilege_id").primaryKey(),
	employeeId: integer("employee_id").references(() => employees.employeeId),
	privilegeId: integer("privilege_id").references(() => privileges.privilegeId),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const employees = pgTable(
	"employees",
	{
		employeeId: serial("employee_id").primaryKey(),
		lastName: varchar("last_name", { length: 30 }).notNull().default(" "),
		firstName: varchar("first_name", { length: 30 }).notNull().default(" "),
		emailAddress: varchar("email", { length: 255 }),
		jobTitle: varchar("job_title", { length: 50 }),
		primaryPhone: varchar("primary_phone", { length: 12 }),
		secondaryPhone: varchar("secondary_phone", { length: 12 }),
		titleId: integer("title_id").references(() => titles.titleId),
		notes: text("notes"),
		attachments: text("attachments"),
		supervisorId: integer("supervisor_id").references(
			(): AnyPgColumn => employees.employeeId,
		),
		createdAt: timestamp("created_at", {
			mode: "date",
			withTimezone: true,
		})
			.notNull()
			.notNull()
			.defaultNow(),
		modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => ({
		employeeNameIdx: index("employee_name_idx").on(
			table.firstName,
			table.lastName,
		),
	}),
);

export const titles = pgTable("titles", {
	titleId: serial("title_id").primaryKey(),
	title: varchar("title", { length: 255 }),
});

export const contacts = pgTable(
	"contacts",
	{
		contactId: serial("contact_id").primaryKey(),
		companyId: integer("company_id").references(() => companies.companyId),
		lastName: varchar("last_name", { length: 30 }),
		firstName: varchar("first_name", { length: 30 }),
		emailAddress: varchar("email", { length: 255 }),
		jobTitle: varchar("job_title", { length: 50 }),
		primaryPhone: varchar("primary_phone", { length: 12 }),
		secondaryPhone: varchar("secondary_phone", { length: 12 }),
		notes: text("notes"),
		createdAt: timestamp("created_at", {
			mode: "date",
			withTimezone: true,
		})
			.notNull()
			.defaultNow(),
		modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => ({
		contactNameIdx: index("contact_name_idx").on(
			table.firstName,
			table.lastName,
		),
	}),
);

export const companies = pgTable(
	"companies",
	{
		companyId: serial("company_id").primaryKey(),
		companyName: varchar("company_name", { length: 50 }).notNull(),
		companyTypeId: integer("company_type_id").references(
			() => companyTypes.companyTypeId,
		),
		businessPhone: varchar("business_phone", { length: 20 }),
		address: varchar("address", { length: 255 }),
		city: varchar("city", { length: 255 }),
		regionId: integer("region_id").references(() => regions.regionId),
		postalCode: varchar("postal_code", { length: 10 }),
		website: text("website"),
		notes: text("notes"),
		taxStatusId: integer("tax_status_id").references(
			() => taxStatus.taxStatusId,
		),
		contactId: integer("contact_id"),
		createdAt: timestamp("created_at", {
			mode: "date",
			withTimezone: true,
		})
			.notNull()
			.defaultNow(),
		modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => ({
		companyNameIdx: index("company_name_idx").on(table.companyName),
	}),
);

export const companyTypes = pgTable("company_types", {
	companyTypeId: serial("company_type_id").primaryKey(),
	companyType: varchar("company_type", { length: 50 }),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const regions = pgTable("regions", {
	regionId: serial("region_id").primaryKey(),
	regionAbbrev: varchar("region_abbrev", { length: 3 }),
	regionName: varchar("region_name", { length: 50 }),
});

export const productVendors = pgTable("product_vendors", {
	productVendorId: serial("product_vendor_id").primaryKey(),
	productId: integer("product_id").references(() => products.productId),
	vendorId: integer("vendor_id").references(() => companies.companyId),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const taxStatus = pgTable("tax_status", {
	taxStatusId: serial("tax_status_id").primaryKey(),
	taxStatus: varchar("tax_status", { length: 50 }).notNull(),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", {
		mode: "date",
		withTimezone: true,
	}),
});

export const products = pgTable(
	"products",
	{
		productId: serial("product_id").primaryKey(),
		productCode: varchar("product_code", { length: 20 }).unique(),
		productName: varchar("product_name", { length: 50 }),
		productDesc: varchar("product_desc", { length: 255 }),
		unitCost: numeric("unit_cost", {
			precision: 10,
			scale: 4,
		}).default(sql`0::numeric`),
		unitPrice: numeric("unit_price", {
			precision: 10,
			scale: 4,
		}).default(sql`0::numeric`),
		reorderLevel: integer("reorder_level"),
		targetLevel: integer("target_level"),
		quantityPerUnit: varchar("quantity_per_unit", { length: 50 }),
		discontinued: boolean("discontinued").default(false),
		minimumReorderQuantity: integer("minimum_reorder_quantity"),
		categoryId: integer("category_id").references(() => categories.categoryId),
		createdAt: timestamp("created_at", {
			mode: "date",
			withTimezone: true,
		})
			.notNull()
			.defaultNow(),
		modifiedAt: timestamp("modified_at", {
			mode: "date",
			withTimezone: true,
		}),
	},
	(table) => ({
		productCodeIdx: index("product_code_idx").on(table.productCode),
	}),
);

export const categories = pgTable("categories", {
	categoryId: serial("category_id").primaryKey(),
	categoryName: varchar("category_name", { length: 255 }),
	categoryCode: varchar("category_code", { length: 3 }),
	categoryDesc: varchar("category_desc", { length: 255 }),
	categoryImage: text("category_image"),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const stockTakes = pgTable("stock_take", {
	stockTakeId: serial("stock_take_id").primaryKey(),
	stockTakeDate: date("stock_take_date", { mode: "date" })
		.notNull()
		.defaultNow(),
	productId: integer("product_id").references(() => products.productId),
	quantityOnHand: integer("quantity_on_hand"),
	expectedQuantity: integer("expected_quantity"),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
});

export const orders = pgTable("orders", {
	orderId: serial("order_id").primaryKey(),
	employeeId: integer("employee_id")
		.references(() => employees.employeeId)
		.notNull(),
	customerId: integer("customer_id")
		.references(() => companies.companyId)
		.notNull(),
	orderDate: date("order_date", { mode: "date" }).notNull().defaultNow(),
	invoiceDate: date("invoice_date", { mode: "date" }),
	shippedDate: date("shipped_date", { mode: "date" }),
	shipperId: integer("shipper_id").references(() => companies.companyId),
	shippingFee: numeric("shipping_fee", { precision: 10, scale: 2 }).default(
		"0.00",
	),
	taxRate: integer("tax_rate"),
	taxStatusId: integer("tax_status_id")
		.references(() => taxStatus.taxStatusId)
		.notNull(),
	paymentMethod: paymentMethodsEnum("payment_method").notNull(),
	paidDate: date("paid_date", { mode: "date" }),
	notes: text("notes"),
	orderStatusId: integer("order_status_id")
		.references(() => orderStatus.orderStatusId)
		.notNull(),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export type OrderTableSelect = InferSelectModel<typeof orders>;

export const orderStatus = pgTable("order_status", {
	orderStatusId: serial("order_status_id").primaryKey(),
	orderStatusCode: varchar("order_status_code", { length: 4 }).notNull(),
	orderStatusName: varchar("order_status_name", { length: 50 }).notNull(),
	sortOrder: integer("sord_order").default(0),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const orderDetails = pgTable("order_details", {
	orderDetailId: serial("order_detail_id").primaryKey(),
	orderId: integer("order_id")
		.notNull()
		.references(() => orders.orderId),
	productId: integer("product_id")
		.notNull()
		.references(() => products.productId),
	quantity: integer("quantity").default(0),
	unitPrice: numeric("unit_price", { precision: 10, scale: 4 }),
	discount: numeric("discount", { precision: 4, scale: 2 }),
	orderDetailStatusId: integer("order_details_status_id").references(
		() => orderDetailsStatus.orderDetailsStatusId,
	),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const orderDetailsStatus = pgTable("order_details_status", {
	orderDetailsStatusId: serial("order_details_status_id").primaryKey(),
	orderDetailsStatusName: varchar("order_details_status_name", { length: 50 }),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const purchaseOrders = pgTable("purchase_orders", {
	purchaseOrderId: serial("purchase_order_id").primaryKey(),
	vendorId: integer("vendor_id").references(() => companies.companyId),
	submittedBy: integer("submitted_by").references(() => employees.employeeId),
	submittedDate: date("submitted_date", { mode: "date" }),
	approvedBy: integer("approved_by").references(() => employees.employeeId),
	approvedDate: date("approved_date", { mode: "date" }),
	statusId: integer("status_id").references(() => purchaseOrderStatus.statusId),
	receivedDate: date("received_date", { mode: "date" }),
	shippingFee: numeric("shipping_fee", { precision: 10, scale: 4 }),
	paymentDate: date("payment_date", { mode: "date" }),
	paymentAmount: numeric("payment_amount", { precision: 10, scale: 4 }),
	paymentMethod: paymentMethodsEnum("payment_method"),
	notes: text("notes"),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});
export const purchaseOrderDetails = pgTable("purchase_order_details", {
	purchaseOrderDetailId: serial("purchase_order_detail_id").primaryKey(),
	purchaseOrderId: integer("purchase_order_id").references(
		() => purchaseOrders.purchaseOrderId,
	),
	productId: integer("product_id").references(() => products.productId),
	quantity: integer("quantity").default(0),
	unitCost: numeric("unit_cost", { precision: 10, scale: 4 }),
	receivedDate: date("received_date", { mode: "date" }),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const purchaseOrderStatus = pgTable("purchase_order_status", {
	statusId: serial("status_id").primaryKey(),
	statusName: varchar("status_name", { length: 50 }),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const systemSetting = pgTable("system_settings", {
	settingId: serial("setting_id").primaryKey(),
	settingName: varchar("setting_name", { length: 50 }),
	settingValue: varchar("setting_value", { length: 255 }),
	settingDesc: varchar("setting_desc", { length: 255 }),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	modifiedAt: timestamp("modified_at", { mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const userTable = pgTable("user", {
	id: text("user_id").primaryKey(),
	username: text("username").notNull().unique(),
	hashedPassword: text("hashed_password").notNull().default(""),
});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

export const sessionRelations = relations(sessionTable, ({ one }) => ({
	user: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.id],
	}),
}));

export const userRelations = relations(userTable, ({ one }) => ({
	session: one(sessionTable, {
		fields: [userTable.id],
		references: [sessionTable.userId],
	}),
}));

// Relations
export const companiesRelations = relations(companies, ({ one, many }) => ({
	contacts: many(contacts),
	region: one(regions, {
		fields: [companies.regionId],
		references: [regions.regionId],
	}),
	productVendors: many(productVendors),
	companyType: one(companyTypes, {
		fields: [companies.companyTypeId],
		references: [companyTypes.companyTypeId],
	}),
	taxStatus: one(taxStatus, {
		fields: [companies.taxStatusId],
		references: [taxStatus.taxStatusId],
	}),
	customer: many(orders, { relationName: "customer" }),
	shipper: many(orders, { relationName: "shipper" }),
}));

export const taxStatusRelations = relations(taxStatus, ({ many }) => ({
	companies: many(companies),
	orders: many(orders),
}));

export const companyTypesRelations = relations(companyTypes, ({ many }) => ({
	companies: many(companies),
}));

export const contactRelations = relations(contacts, ({ one }) => ({
	company: one(companies, {
		fields: [contacts.companyId],
		references: [companies.companyId],
	}),
}));

export const regionRelations = relations(regions, ({ one, many }) => ({
	company: many(companies),
}));

export const productVendorsRelations = relations(
	productVendors,
	({ one, many }) => ({
		companies: one(companies, {
			fields: [productVendors.vendorId],
			references: [companies.companyId],
		}),
		products: one(products, {
			fields: [productVendors.productId],
			references: [products.productId],
		}),
	}),
);

export const categoriesRelations = relations(categories, ({ one, many }) => ({
	products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
	vendor: many(productVendors),
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.categoryId],
	}),
	orders: many(orderDetails),
	purchaseOrders: many(purchaseOrderDetails),
	stockTake: many(stockTakes),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
	customer: one(companies, {
		fields: [orders.customerId],
		references: [companies.companyId],
		relationName: "customer",
	}),
	employee: one(employees, {
		fields: [orders.employeeId],
		references: [employees.employeeId],
	}),
	status: one(orderStatus, {
		fields: [orders.orderStatusId],
		references: [orderStatus.orderStatusId],
	}),
	shipper: one(companies, {
		fields: [orders.customerId],
		references: [companies.companyId],
		relationName: "shipper",
	}),
	taxStatus: one(taxStatus, {
		fields: [orders.taxStatusId],
		references: [taxStatus.taxStatusId],
	}),
	orderDetails: many(orderDetails),
}));

export const orderStatusRelations = relations(orderStatus, ({ many }) => ({
	orders: many(orders),
}));

export const orderDetailsRelations = relations(
	orderDetails,
	({ one, many }) => ({
		order: one(orders, {
			fields: [orderDetails.orderId],
			references: [orders.orderId],
		}),
		status: one(orderDetailsStatus, {
			fields: [orderDetails.orderDetailStatusId],
			references: [orderDetailsStatus.orderDetailsStatusId],
		}),
		product: one(products, {
			fields: [orderDetails.productId],
			references: [products.productId],
		}),
	}),
);

export const orderDetailsStatusRelations = relations(
	orderDetailsStatus,
	({ one, many }) => ({
		orderDetails: many(orderDetails),
	}),
);

export const employeePrivilegesRelations = relations(
	employeePrivileges,
	({ one }) => ({
		employee: one(employees, {
			fields: [employeePrivileges.employeeId],
			references: [employees.employeeId],
		}),
		privilege: one(privileges, {
			fields: [employeePrivileges.employeePrivilegeId],
			references: [privileges.privilegeId],
		}),
	}),
);

export const privilegeRelations = relations(privileges, ({ many }) => ({
	privileges: many(employeePrivileges),
}));

export const employeeRelations = relations(employees, ({ one, many }) => ({
	privileges: many(employeePrivileges),
	titles: one(titles, {
		fields: [employees.titleId],
		references: [titles.titleId],
	}),
	supervisor: one(employees, {
		fields: [employees.supervisorId],
		references: [employees.employeeId],
	}),
	orders: many(orders),
	purchaseOrdersSubmitted: many(purchaseOrders, {
		relationName: "submitted_by",
	}),
	purchaseOrdersApproved: many(purchaseOrders, { relationName: "approved_by" }),
}));

export const titleRelations = relations(titles, ({ one, many }) => ({
	employees: many(employees),
}));

export const purchaseOrderRelations = relations(
	purchaseOrders,
	({ one, many }) => ({
		vendor: one(companies, {
			fields: [purchaseOrders.vendorId],
			references: [companies.companyId],
		}),
		purchaseOrderStatus: one(purchaseOrderStatus, {
			fields: [purchaseOrders.statusId],
			references: [purchaseOrderStatus.statusId],
		}),
		submittedBy: one(employees, {
			fields: [purchaseOrders.submittedBy],
			references: [employees.employeeId],
			relationName: "submitted_by",
		}),
		approvedBy: one(employees, {
			fields: [purchaseOrders.approvedBy],
			references: [employees.employeeId],
			relationName: "approved_by",
		}),
		orderDetails: many(purchaseOrderDetails),
	}),
);

export const purchaseOrderStatusRelations = relations(
	purchaseOrderStatus,
	({ one, many }) => ({
		purchaseOrders: many(purchaseOrders),
	}),
);

export const purchaseOrderDetailsRelations = relations(
	purchaseOrderDetails,
	({ one, many }) => ({
		purchaseOrderId: one(purchaseOrders, {
			fields: [purchaseOrderDetails.purchaseOrderId],
			references: [purchaseOrders.purchaseOrderId],
		}),
		product: one(products, {
			fields: [purchaseOrderDetails.productId],
			references: [products.productId],
		}),
	}),
);

export const stockTakeRelations = relations(stockTakes, ({ one, many }) => ({
	products: one(products, {
		fields: [stockTakes.productId],
		references: [products.productId],
	}),
}));
