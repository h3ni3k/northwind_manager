import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
	categories,
	companies,
	companyTypes,
	contacts,
	employeePrivileges,
	employees,
	orderDetails,
	orderDetailsStatus,
	orderStatus,
	orders,
	paymentMethodsEnum,
	privileges,
	products,
	purchaseOrderDetails,
	purchaseOrders,
	regions,
	stock,
	systemSetting,
	taxStatus,
	titles,
	users,
} from "./schema";

export type PrivilegesSelect = InferSelectModel<typeof privileges>;
export type PrivilegesInsert = InferInsertModel<typeof privileges>;

export type EmployeePrivilegesSelect = InferSelectModel<
	typeof employeePrivileges
>;
export type EmployeePrivilegesInsert = InferInsertModel<
	typeof employeePrivileges
>;

export type EmployeesSelect = InferSelectModel<typeof employees>;
export type EmployeesInsert = InferInsertModel<typeof employees>;

export type TitlesSelect = InferSelectModel<typeof titles>;
export type TitlesInsert = InferInsertModel<typeof titles>;

export type ContactsSelect = InferSelectModel<typeof contacts>;
export type ContactsInsert = InferInsertModel<typeof contacts>;

export type CompaniesSelect = InferSelectModel<typeof companies>;
export type CompaniesInsert = InferInsertModel<typeof companies>;

export type CompanyTypesSelect = InferSelectModel<typeof companyTypes>;
export type CompanyTypesInsert = InferInsertModel<typeof companyTypes>;

export type RegionsSelect = InferSelectModel<typeof regions>;
export type RegionsInsert = InferInsertModel<typeof regions>;

export type TaxStatusSelect = InferSelectModel<typeof taxStatus>;
export type TaxStatusInsert = InferInsertModel<typeof taxStatus>;

export type ProductsSelect = InferSelectModel<typeof products>;
export type ProductsInsert = InferInsertModel<typeof products>;

export type CategoriesSelect = InferSelectModel<typeof categories>;
export type CategoriesInsert = InferInsertModel<typeof categories>;

export type StockTakesSelect = InferSelectModel<typeof stock>;
export type StockTakesInsert = InferInsertModel<typeof stock>;

export type OrderStatusSelect = InferSelectModel<typeof orderStatus>;
export type OrderStatusInsert = InferInsertModel<typeof orderStatus>;

export type OrdersSelect = InferSelectModel<typeof orders>;
export type OrdersInsert = InferInsertModel<typeof orders>;

export type OrderDetailsStatusSelect = InferSelectModel<
	typeof orderDetailsStatus
>;
export type OrderDetailsStatusInsert = InferInsertModel<
	typeof orderDetailsStatus
>;

export type OrderDetailsSelect = InferSelectModel<typeof orderDetails>;
export type OrderDetailsInsert = InferInsertModel<typeof orderDetails>;

export type PurchaseOrderStatusSelect = InferSelectModel<
	typeof purchaseOrderDetails
>;
export type PurchaseOrderStatusInsert = InferInsertModel<
	typeof purchaseOrderDetails
>;

export type PurchaseOrdersSelect = InferSelectModel<typeof purchaseOrders>;
export type PurchaseOrdersInsert = InferInsertModel<typeof purchaseOrders>;

export type PurchaseOrderDetailsStatusSelect = InferSelectModel<
	typeof purchaseOrderDetails
>;
export type PurchaseOrderDetailsStatusInsert = InferInsertModel<
	typeof purchaseOrderDetails
>;

export type PurchaseOrderDetailsSelect = InferSelectModel<
	typeof purchaseOrderDetails
>;
export type PurchaseOrderDetailsInsert = InferInsertModel<
	typeof purchaseOrderDetails
>;

export type SystemSettingsSelect = InferSelectModel<typeof systemSetting>;
export type SystemSettingsInsert = InferInsertModel<typeof systemSetting>;

export type UsersSelect = InferSelectModel<typeof users>;
export type UsersInsert = InferInsertModel<typeof users>;
