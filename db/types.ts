import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
	categoriesTable,
	companiesTable,
	companyTypesTable,
	contactsTable,
	employeePrivilegesTable,
	employeesTable,
	orderDetailsStatusTable,
	orderDetailsTable,
	orderStatusTable,
	ordersTable,
	paymentMethodsEnum,
	privilegesTable,
	productVendorsTable,
	productsTable,
	purchaseOrderDetailsTable,
	purchaseOrdersTable,
	regionsTable,
	stockTakesTable,
	systemSettingTable,
	taxStatusTable,
	titlesTable,
	userTable,
} from "./schema";

export type PrivilegesSelect = InferSelectModel<typeof privilegesTable>;
export type PrivilegesInsert = InferInsertModel<typeof privilegesTable>;

export type EmployeePrivilegesSelect = InferSelectModel<
	typeof employeePrivilegesTable
>;
export type EmployeePrivilegesInsert = InferInsertModel<
	typeof employeePrivilegesTable
>;

export type EmployeesSelect = InferSelectModel<typeof employeesTable>;
export type EmployeesInsert = InferInsertModel<typeof employeesTable>;

export type TitlesSelect = InferSelectModel<typeof titlesTable>;
export type TitlesInsert = InferInsertModel<typeof titlesTable>;

export type ContactsSelect = InferSelectModel<typeof contactsTable>;
export type ContactsInsert = InferInsertModel<typeof contactsTable>;

export type CompaniesSelect = InferSelectModel<typeof companiesTable>;
export type CompaniesInsert = InferInsertModel<typeof companiesTable>;

export type CompanyTypesSelect = InferSelectModel<typeof companyTypesTable>;
export type CompanyTypesInsert = InferInsertModel<typeof companyTypesTable>;

export type RegionsSelect = InferSelectModel<typeof regionsTable>;
export type RegionsInsert = InferInsertModel<typeof regionsTable>;

export type ProductVendorsSelect = InferSelectModel<typeof productVendorsTable>;
export type ProductVendorsInsert = InferInsertModel<typeof productVendorsTable>;

export type TaxStatusSelect = InferSelectModel<typeof taxStatusTable>;
export type TaxStatusInsert = InferInsertModel<typeof taxStatusTable>;

export type ProductsSelect = InferSelectModel<typeof productsTable>;
export type ProductsInsert = InferInsertModel<typeof productsTable>;

export type CategoriesSelect = InferSelectModel<typeof categoriesTable>;
export type CategoriesInsert = InferInsertModel<typeof categoriesTable>;

export type StockTakesSelect = InferSelectModel<typeof stockTakesTable>;
export type StockTakesInsert = InferInsertModel<typeof stockTakesTable>;

export type OrderStatusSelect = InferSelectModel<typeof orderStatusTable>;
export type OrderStatusInsert = InferInsertModel<typeof orderStatusTable>;

export type OrdersSelect = InferSelectModel<typeof ordersTable>;
export type OrdersInsert = InferInsertModel<typeof ordersTable>;

export type OrderDetailsStatusSelect = InferSelectModel<
	typeof orderDetailsStatusTable
>;
export type OrderDetailsStatusInsert = InferInsertModel<
	typeof orderDetailsStatusTable
>;

export type OrderDetailsSelect = InferSelectModel<typeof orderDetailsTable>;
export type OrderDetailsInsert = InferInsertModel<typeof orderDetailsTable>;

export type PurchaseOrderStatusSelect = InferSelectModel<
	typeof purchaseOrderDetailsTable
>;
export type PurchaseOrderStatusInsert = InferInsertModel<
	typeof purchaseOrderDetailsTable
>;

export type PurchaseOrdersSelect = InferSelectModel<typeof purchaseOrdersTable>;
export type PurchaseOrdersInsert = InferInsertModel<typeof purchaseOrdersTable>;

export type PurchaseOrderDetailsStatusSelect = InferSelectModel<
	typeof purchaseOrderDetailsTable
>;
export type PurchaseOrderDetailsStatusInsert = InferInsertModel<
	typeof purchaseOrderDetailsTable
>;

export type PurchaseOrderDetailsSelect = InferSelectModel<
	typeof purchaseOrderDetailsTable
>;
export type PurchaseOrderDetailsInsert = InferInsertModel<
	typeof purchaseOrderDetailsTable
>;

export type SystemSettingsSelect = InferSelectModel<typeof systemSettingTable>;
export type SystemSettingsInsert = InferInsertModel<typeof systemSettingTable>;

export type UsersSelect = InferSelectModel<typeof userTable>;
export type UsersInsert = InferInsertModel<typeof userTable>;
