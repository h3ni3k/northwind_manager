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

export const privilegesTable = pgTable("privileges", {
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

export const employeePrivilegesTable = pgTable("employee_privileges", {
	employeePrivilegeId: serial("employee_privilege_id").primaryKey(),
	employeeId: integer("employee_id").references(
		() => employeesTable.employeeId,
	),
	privilegeId: integer("privilege_id").references(
		() => privilegesTable.privilegeId,
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

export const employeesTable = pgTable(
	"employees",
	{
		employeeId: serial("employee_id").primaryKey(),
		lastName: varchar("last_name", { length: 30 }).notNull().default(" "),
		firstName: varchar("first_name", { length: 30 }).notNull().default(" "),
		emailAddress: varchar("email", { length: 255 }),
		jobTitle: varchar("job_title", { length: 50 }),
		primaryPhone: varchar("primary_phone", { length: 12 }),
		secondaryPhone: varchar("secondary_phone", { length: 12 }),
		titleId: integer("title_id").references(() => titlesTable.titleId),
		notes: text("notes"),
		attachments: text("attachments"),
		supervisorId: integer("supervisor_id").references(
			(): AnyPgColumn => employeesTable.employeeId,
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

export const titlesTable = pgTable("titles", {
	titleId: serial("title_id").primaryKey(),
	title: varchar("title", { length: 255 }),
});

export const contactsTable = pgTable(
	"contacts",
	{
		contactId: serial("contact_id").primaryKey(),
		companyId: integer("company_id").references(() => companiesTable.companyId),
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

export const companiesTable = pgTable(
	"companies",
	{
		companyId: serial("company_id").primaryKey(),
		companyName: varchar("company_name", { length: 50 }).notNull(),
		companyTypeId: integer("company_type_id").references(
			() => companyTypesTable.companyTypeId,
		),
		businessPhone: varchar("business_phone", { length: 20 }),
		address: varchar("address", { length: 255 }),
		city: varchar("city", { length: 255 }),
		regionId: integer("region_id").references(() => regionsTable.regionId),
		postalCode: varchar("postal_code", { length: 10 }),
		website: text("website"),
		notes: text("notes"),
		taxStatusId: integer("tax_status_id").references(
			() => taxStatusTable.taxStatusId,
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

export const companyTypesTable = pgTable("company_types", {
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

export const regionsTable = pgTable("regions", {
	regionId: serial("region_id").primaryKey(),
	regionAbbrev: varchar("region_abbrev", { length: 3 }),
	regionName: varchar("region_name", { length: 50 }),
});

export const productVendorsTable = pgTable("product_vendors", {
	productVendorId: serial("product_vendor_id").primaryKey(),
	productId: integer("product_id").references(() => productsTable.productId),
	vendorId: integer("vendor_id").references(() => companiesTable.companyId),
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

export const taxStatusTable = pgTable("tax_status", {
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

export const productsTable = pgTable(
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
		categoryId: integer("category_id").references(
			() => categoriesTable.categoryId,
		),
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

export const categoriesTable = pgTable("categories", {
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

export const stockTakesTable = pgTable("stock_take", {
	stockTakeId: serial("stock_take_id").primaryKey(),
	stockTakeDate: date("stock_take_date", { mode: "date" })
		.notNull()
		.defaultNow(),
	productId: integer("product_id").references(() => productsTable.productId),
	quantityOnHand: integer("quantity_on_hand"),
	expectedQuantity: integer("expected_quantity"),
	createdAt: timestamp("created_at", {
		mode: "date",
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
});

export const ordersTable = pgTable("orders", {
	orderId: serial("order_id").primaryKey(),
	employeeId: integer("employee_id")
		.references(() => employeesTable.employeeId)
		.notNull(),
	customerId: integer("customer_id")
		.references(() => companiesTable.companyId)
		.notNull(),
	orderDate: date("order_date", { mode: "date" }).notNull().defaultNow(),
	invoiceDate: date("invoice_date", { mode: "date" }),
	shippedDate: date("shipped_date", { mode: "date" }),
	shipperId: integer("shipper_id").references(() => companiesTable.companyId),
	shippingFee: numeric("shipping_fee", { precision: 10, scale: 2 }).default(
		"0.00",
	),
	taxRate: integer("tax_rate"),
	taxStatusId: integer("tax_status_id")
		.references(() => taxStatusTable.taxStatusId)
		.notNull(),
	paymentMethod: paymentMethodsEnum("payment_method").notNull(),
	paidDate: date("paid_date", { mode: "date" }),
	notes: text("notes"),
	orderStatusId: integer("order_status_id")
		.references(() => orderStatusTable.orderStatusId)
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

export const orderStatusTable = pgTable("order_status", {
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

export const orderDetailsTable = pgTable("order_details", {
	orderDetailId: serial("order_detail_id").primaryKey(),
	orderId: integer("order_id")
		.notNull()
		.references(() => ordersTable.orderId),
	productId: integer("product_id")
		.notNull()
		.references(() => productsTable.productId),
	quantity: integer("quantity").default(0),
	unitPrice: numeric("unit_price", { precision: 10, scale: 4 }),
	discount: numeric("discount", { precision: 4, scale: 2 }),
	orderDetailStatusId: integer("order_details_status_id").references(
		() => orderDetailsStatusTable.orderDetailsStatusId,
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

export const orderDetailsStatusTable = pgTable("order_details_status", {
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

export const purchaseOrdersTable = pgTable("purchase_orders", {
	purchaseOrderId: serial("purchase_order_id").primaryKey(),
	vendorId: integer("vendor_id").references(() => companiesTable.companyId),
	submittedBy: integer("submitted_by").references(
		() => employeesTable.employeeId,
	),
	submittedDate: date("submitted_date", { mode: "date" }),
	approvedBy: integer("approved_by").references(
		() => employeesTable.employeeId,
	),
	approvedDate: date("approved_date", { mode: "date" }),
	statusId: integer("status_id").references(
		() => purchaseOrderStatusTable.statusId,
	),
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
export const purchaseOrderDetailsTable = pgTable("purchase_order_details", {
	purchaseOrderDetailId: serial("purchase_order_detail_id").primaryKey(),
	purchaseOrderId: integer("purchase_order_id").references(
		() => purchaseOrdersTable.purchaseOrderId,
	),
	productId: integer("product_id").references(() => productsTable.productId),
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

export const purchaseOrderStatusTable = pgTable("purchase_order_status", {
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

export const systemSettingTable = pgTable("system_settings", {
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
export const companiesRelations = relations(
	companiesTable,
	({ one, many }) => ({
		contacts: many(contactsTable),
		region: one(regionsTable, {
			fields: [companiesTable.regionId],
			references: [regionsTable.regionId],
		}),
		productVendors: many(productVendorsTable),
		companyType: one(companyTypesTable, {
			fields: [companiesTable.companyTypeId],
			references: [companyTypesTable.companyTypeId],
		}),
		taxStatus: one(taxStatusTable, {
			fields: [companiesTable.taxStatusId],
			references: [taxStatusTable.taxStatusId],
		}),
		customer: many(ordersTable, { relationName: "customer" }),
		shipper: many(ordersTable, { relationName: "shipper" }),
	}),
);

export const taxStatusRelations = relations(taxStatusTable, ({ many }) => ({
	companies: many(companiesTable),
	orders: many(ordersTable),
}));

export const companyTypesRelations = relations(
	companyTypesTable,
	({ many }) => ({
		companies: many(companiesTable),
	}),
);

export const contactRelations = relations(contactsTable, ({ one }) => ({
	company: one(companiesTable, {
		fields: [contactsTable.companyId],
		references: [companiesTable.companyId],
	}),
}));

export const regionRelations = relations(regionsTable, ({ one, many }) => ({
	company: many(companiesTable),
}));

export const productVendorsRelations = relations(
	productVendorsTable,
	({ one, many }) => ({
		companies: one(companiesTable, {
			fields: [productVendorsTable.vendorId],
			references: [companiesTable.companyId],
		}),
		products: one(productsTable, {
			fields: [productVendorsTable.productId],
			references: [productsTable.productId],
		}),
	}),
);

export const categoriesRelations = relations(
	categoriesTable,
	({ one, many }) => ({
		products: many(productsTable),
	}),
);

export const productsRelations = relations(productsTable, ({ one, many }) => ({
	vendor: many(productVendorsTable),
	category: one(categoriesTable, {
		fields: [productsTable.categoryId],
		references: [categoriesTable.categoryId],
	}),
	orders: many(orderDetailsTable),
	purchaseOrders: many(purchaseOrderDetailsTable),
	stockTake: many(stockTakesTable),
}));

export const orderRelations = relations(ordersTable, ({ one, many }) => ({
	customer: one(companiesTable, {
		fields: [ordersTable.customerId],
		references: [companiesTable.companyId],
		relationName: "customer",
	}),
	employee: one(employeesTable, {
		fields: [ordersTable.employeeId],
		references: [employeesTable.employeeId],
	}),
	status: one(orderStatusTable, {
		fields: [ordersTable.orderStatusId],
		references: [orderStatusTable.orderStatusId],
	}),
	shipper: one(companiesTable, {
		fields: [ordersTable.customerId],
		references: [companiesTable.companyId],
		relationName: "shipper",
	}),
	taxStatus: one(taxStatusTable, {
		fields: [ordersTable.taxStatusId],
		references: [taxStatusTable.taxStatusId],
	}),
	orderDetails: many(orderDetailsTable),
}));

export const orderStatusRelations = relations(orderStatusTable, ({ many }) => ({
	orders: many(ordersTable),
}));

export const orderDetailsRelations = relations(
	orderDetailsTable,
	({ one, many }) => ({
		order: one(ordersTable, {
			fields: [orderDetailsTable.orderId],
			references: [ordersTable.orderId],
		}),
		status: one(orderDetailsStatusTable, {
			fields: [orderDetailsTable.orderDetailStatusId],
			references: [orderDetailsStatusTable.orderDetailsStatusId],
		}),
		product: one(productsTable, {
			fields: [orderDetailsTable.productId],
			references: [productsTable.productId],
		}),
	}),
);

export const orderDetailsStatusRelations = relations(
	orderDetailsStatusTable,
	({ one, many }) => ({
		orderDetails: many(orderDetailsTable),
	}),
);

export const employeePrivilegesRelations = relations(
	employeePrivilegesTable,
	({ one }) => ({
		employee: one(employeesTable, {
			fields: [employeePrivilegesTable.employeeId],
			references: [employeesTable.employeeId],
		}),
		privilege: one(privilegesTable, {
			fields: [employeePrivilegesTable.employeePrivilegeId],
			references: [privilegesTable.privilegeId],
		}),
	}),
);

export const privilegeRelations = relations(privilegesTable, ({ many }) => ({
	privileges: many(employeePrivilegesTable),
}));

export const employeeRelations = relations(employeesTable, ({ one, many }) => ({
	privileges: many(employeePrivilegesTable),
	titles: one(titlesTable, {
		fields: [employeesTable.titleId],
		references: [titlesTable.titleId],
	}),
	supervisor: one(employeesTable, {
		fields: [employeesTable.supervisorId],
		references: [employeesTable.employeeId],
	}),
	orders: many(ordersTable),
	purchaseOrdersSubmitted: many(purchaseOrdersTable, {
		relationName: "submitted_by",
	}),
	purchaseOrdersApproved: many(purchaseOrdersTable, {
		relationName: "approved_by",
	}),
}));

export const titleRelations = relations(titlesTable, ({ one, many }) => ({
	employees: many(employeesTable),
}));

export const purchaseOrderRelations = relations(
	purchaseOrdersTable,
	({ one, many }) => ({
		vendor: one(companiesTable, {
			fields: [purchaseOrdersTable.vendorId],
			references: [companiesTable.companyId],
		}),
		purchaseOrderStatus: one(purchaseOrderStatusTable, {
			fields: [purchaseOrdersTable.statusId],
			references: [purchaseOrderStatusTable.statusId],
		}),
		submittedBy: one(employeesTable, {
			fields: [purchaseOrdersTable.submittedBy],
			references: [employeesTable.employeeId],
			relationName: "submitted_by",
		}),
		approvedBy: one(employeesTable, {
			fields: [purchaseOrdersTable.approvedBy],
			references: [employeesTable.employeeId],
			relationName: "approved_by",
		}),
		orderDetails: many(purchaseOrderDetailsTable),
	}),
);

export const purchaseOrderStatusRelations = relations(
	purchaseOrderStatusTable,
	({ one, many }) => ({
		purchaseOrders: many(purchaseOrdersTable),
	}),
);

export const purchaseOrderDetailsRelations = relations(
	purchaseOrderDetailsTable,
	({ one, many }) => ({
		purchaseOrderId: one(purchaseOrdersTable, {
			fields: [purchaseOrderDetailsTable.purchaseOrderId],
			references: [purchaseOrdersTable.purchaseOrderId],
		}),
		product: one(productsTable, {
			fields: [purchaseOrderDetailsTable.productId],
			references: [productsTable.productId],
		}),
	}),
);

export const stockTakeRelations = relations(
	stockTakesTable,
	({ one, many }) => ({
		products: one(productsTable, {
			fields: [stockTakesTable.productId],
			references: [productsTable.productId],
		}),
	}),
);
