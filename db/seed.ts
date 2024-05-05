import { faker } from "@faker-js/faker";
import { InferInsertModel, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
	connectionString: String(process.env.CONNECTION_STRING),
});

const db = drizzle(pool, { schema: schema, logger: true });

async function resetSequence() {
	const sequences = await db.execute(sql`SELECT sequence_schema, sequence_name 
FROM information_schema.sequences;`);

	for (const row of sequences.rows) {
		if (row?.sequence_schema === "public") {
			const name = row?.sequence_name;
			await db.execute(sql.raw(`ALTER SEQUENCE ${name} RESTART WITH 1;`));
		}
	}
}

async function createTemplate() {
	await db.execute(sql.raw("ALTER DATABASE northwind WITH is_template TRUE;"));
}

async function dropDatabase() {
	await db.execute(sql.raw("DROP DATABASE northwind;"));
}

async function recreateDatabase() {
	await db.execute(sql.raw("CREATE DATABASE northwind1 TEMPLATE northwind;"));
}

async function clearData() {
	//TODO: Rewrite this to nuke database and recreate it from template
	await db.delete(schema.sessionTable);
	await db.delete(schema.userTable);
	await db.delete(schema.orderDetailsTable);
	await db.delete(schema.ordersTable);
	await db.delete(schema.orderDetailsStatusTable);
	await db.delete(schema.purchaseOrderDetailsTable);
	await db.delete(schema.purchaseOrdersTable);
	await db.delete(schema.purchaseOrderStatusTable);
	await db.delete(schema.productVendorsTable);
	await db.delete(schema.contactsTable);
	await db.delete(schema.companiesTable);
	await db.delete(schema.companyTypesTable);
	await db.delete(schema.regionsTable);
	await db.delete(schema.taxStatusTable);
	await db.delete(schema.orderStatusTable);
	await db.delete(schema.stockTakesTable);
	await db.delete(schema.productsTable);
	await db.delete(schema.categoriesTable);
	await db.delete(schema.employeePrivilegesTable);
	await db.delete(schema.privilegesTable);
	await db.delete(schema.employeesTable);
	await db.delete(schema.titlesTable);
}

async function main() {
	await clearData();
	await resetSequence();
	// await createTemplate();
	// await dropDatabase();
	// await recreateDatabase();

	//* Users
	await db.insert(schema.userTable).values([
		{
			id: generateId(15),
			username: "admin",
			hashedPassword: await new Argon2id().hash(
				process.env.DEFAULT_ADMIN_PASSWORD ?? "admin",
			),
		},
	]);

	//* Company types
	const companyTypes: InferInsertModel<typeof schema.companyTypesTable>[] = [
		{
			companyType: "Customer",
		},
		{
			companyType: "Shipper",
		},
		{
			companyType: "Vendor",
		},
	];
	await db.insert(schema.companyTypesTable).values(companyTypes);

	//* Regions
	const regions = [
		{
			name: "Alabama",
			abbreviation: "AL",
		},
		{
			name: "Alaska",
			abbreviation: "AK",
		},
		{
			name: "American Samoa",
			abbreviation: "AS",
		},
		{
			name: "Arizona",
			abbreviation: "AZ",
		},
		{
			name: "Arkansas",
			abbreviation: "AR",
		},
		{
			name: "California",
			abbreviation: "CA",
		},
		{
			name: "Colorado",
			abbreviation: "CO",
		},
		{
			name: "Connecticut",
			abbreviation: "CT",
		},
		{
			name: "Delaware",
			abbreviation: "DE",
		},
		{
			name: "District Of Columbia",
			abbreviation: "DC",
		},
		{
			name: "Federated States Of Micronesia",
			abbreviation: "FM",
		},
		{
			name: "Florida",
			abbreviation: "FL",
		},
		{
			name: "Georgia",
			abbreviation: "GA",
		},
		{
			name: "Guam",
			abbreviation: "GU",
		},
		{
			name: "Hawaii",
			abbreviation: "HI",
		},
		{
			name: "Idaho",
			abbreviation: "ID",
		},
		{
			name: "Illinois",
			abbreviation: "IL",
		},
		{
			name: "Indiana",
			abbreviation: "IN",
		},
		{
			name: "Iowa",
			abbreviation: "IA",
		},
		{
			name: "Kansas",
			abbreviation: "KS",
		},
		{
			name: "Kentucky",
			abbreviation: "KY",
		},
		{
			name: "Louisiana",
			abbreviation: "LA",
		},
		{
			name: "Maine",
			abbreviation: "ME",
		},
		{
			name: "Marshall Islands",
			abbreviation: "MH",
		},
		{
			name: "Maryland",
			abbreviation: "MD",
		},
		{
			name: "Massachusetts",
			abbreviation: "MA",
		},
		{
			name: "Michigan",
			abbreviation: "MI",
		},
		{
			name: "Minnesota",
			abbreviation: "MN",
		},
		{
			name: "Mississippi",
			abbreviation: "MS",
		},
		{
			name: "Missouri",
			abbreviation: "MO",
		},
		{
			name: "Montana",
			abbreviation: "MT",
		},
		{
			name: "Nebraska",
			abbreviation: "NE",
		},
		{
			name: "Nevada",
			abbreviation: "NV",
		},
		{
			name: "New Hampshire",
			abbreviation: "NH",
		},
		{
			name: "New Jersey",
			abbreviation: "NJ",
		},
		{
			name: "New Mexico",
			abbreviation: "NM",
		},
		{
			name: "New York",
			abbreviation: "NY",
		},
		{
			name: "North Carolina",
			abbreviation: "NC",
		},
		{
			name: "North Dakota",
			abbreviation: "ND",
		},
		{
			name: "Northern Mariana Islands",
			abbreviation: "MP",
		},
		{
			name: "Ohio",
			abbreviation: "OH",
		},
		{
			name: "Oklahoma",
			abbreviation: "OK",
		},
		{
			name: "Oregon",
			abbreviation: "OR",
		},
		{
			name: "Palau",
			abbreviation: "PW",
		},
		{
			name: "Pennsylvania",
			abbreviation: "PA",
		},
		{
			name: "Puerto Rico",
			abbreviation: "PR",
		},
		{
			name: "Rhode Island",
			abbreviation: "RI",
		},
		{
			name: "South Carolina",
			abbreviation: "SC",
		},
		{
			name: "South Dakota",
			abbreviation: "SD",
		},
		{
			name: "Tennessee",
			abbreviation: "TN",
		},
		{
			name: "Texas",
			abbreviation: "TX",
		},
		{
			name: "Utah",
			abbreviation: "UT",
		},
		{
			name: "Vermont",
			abbreviation: "VT",
		},
		{
			name: "Virgin Islands",
			abbreviation: "VI",
		},
		{
			name: "Virginia",
			abbreviation: "VA",
		},
		{
			name: "Washington",
			abbreviation: "WA",
		},
		{
			name: "West Virginia",
			abbreviation: "WV",
		},
		{
			name: "Wisconsin",
			abbreviation: "WI",
		},
		{
			name: "Wyoming",
			abbreviation: "WY",
		},
	];
	for (const region of regions) {
		await db.insert(schema.regionsTable).values({
			regionName: region.name,
			regionAbbrev: region.abbreviation,
		});
	}

	//* Tax status
	const taxStatuses: InferInsertModel<typeof schema.taxStatusTable>[] = [
		{
			taxStatus: "Tax Exempt",
		},
		{
			taxStatus: "Taxable",
		},
	];
	await db.insert(schema.taxStatusTable).values(taxStatuses);

	//* Order status
	const orderStatuses: InferInsertModel<typeof schema.orderStatusTable>[] = [
		{
			orderStatusCode: "CLO",
			orderStatusName: "Closed",
			sortOrder: 40,
		},
		{
			orderStatusCode: "INV",
			orderStatusName: "Invoiced",
			sortOrder: 20,
		},
		{
			orderStatusCode: "NEW",
			orderStatusName: "New",
			sortOrder: 10,
		},
		{
			orderStatusCode: "SHI",
			orderStatusName: "Shipped",
			sortOrder: 30,
		},
		{
			orderStatusCode: "PAY",
			orderStatusName: "Paid",
			sortOrder: 35,
		},
	];
	await db.insert(schema.orderStatusTable).values(orderStatuses);

	//* Purchase order statuses
	const purchaseOrderStatuses: InferInsertModel<
		typeof schema.purchaseOrderStatusTable
	>[] = [
		{ statusName: "New", sortOrder: 10 },
		{ statusName: "Submitted", sortOrder: 20 },
		{ statusName: "Approved", sortOrder: 30 },
		{ statusName: "Received", sortOrder: 40 },
		{ statusName: "Closed", sortOrder: 50 },
	];
	await db
		.insert(schema.purchaseOrderStatusTable)
		.values(purchaseOrderStatuses);

	//* Titles
	const titles: InferInsertModel<typeof schema.titlesTable>[] = [
		{
			title: "Mr",
		},
		{
			title: "Mrs",
		},
	];
	await db.insert(schema.titlesTable).values(titles);

	//* Categories
	const categories: InferInsertModel<typeof schema.categoriesTable>[] = [];
	for (let i = 0; i < 20; i++) {
		const categoryName = faker.commerce.department();
		const category: InferInsertModel<typeof schema.categoriesTable> = {
			categoryName,
			categoryDesc: faker.commerce.productDescription(),
			categoryCode: categoryName.substring(0, 3),
		};
		categories.push(category);
	}
	await db.insert(schema.categoriesTable).values(categories);

	//* Products
	const products: InferInsertModel<typeof schema.productsTable>[] = [];
	for (let i = 0; i < 20; i++) {
		const product: InferInsertModel<typeof schema.productsTable> = {
			categoryId: faker.number.int({ min: 1, max: 20 }),
			discontinued: false,
			minimumReorderQuantity: faker.number.int({ min: 20, max: 50 }),
			productName: faker.commerce.product(),
			productDesc: faker.commerce.productDescription(),
			productCode: faker.word.verb(6),
			quantityPerUnit: "1",
			reorderLevel: faker.number.int({ min: 10, max: 20 }),
			unitCost: faker.commerce.price(),
			targetLevel: faker.number.int({ min: 10, max: 50 }),
			unitPrice: faker.commerce.price(),
		};
		products.push(product);
	}
	const createdProducts = await db
		.insert(schema.productsTable)
		.values(products)
		.onConflictDoNothing({ target: schema.productsTable.productCode })
		.returning();

	//* Companies
	const companies: InferInsertModel<typeof schema.companiesTable>[] = [];
	for (let i = 0; i < 20; i++) {
		const company: InferInsertModel<typeof schema.companiesTable> = {
			companyName: faker.company.name().substring(0, 50),
			companyTypeId: faker.number.int({ min: 1, max: 3 }),
			businessPhone: faker.string.numeric(9),
			address: `${faker.location.street()} ${faker.location.buildingNumber()}`,
			city: faker.location.city(),
			regionId: faker.number.int({ min: 1, max: 51 }),
			postalCode: faker.location.zipCode({ format: "#####" }),
			website: faker.internet.url(),
			taxStatusId: faker.number.int({ min: 1, max: 2 }),
		};
		companies.push(company);
	}
	const createdCompanies = await db
		.insert(schema.companiesTable)
		.values(companies)
		.returning();

	//* Product vendors
	const productVendors: InferInsertModel<typeof schema.productVendorsTable>[] =
		[];
	const vendors = createdCompanies.filter((c) => c.companyTypeId === 3);
	for (let i = 0; i < 20; i++) {
		const productId =
			createdProducts[Math.floor(Math.random() * createdProducts.length)]
				.productId;
		const vendorId =
			vendors[Math.floor(Math.random() * vendors.length)].companyId;
		const productVendor: InferInsertModel<typeof schema.productVendorsTable> = {
			productId: productId,
			vendorId: vendorId,
		};
		productVendors.push(productVendor);
	}
	await db.insert(schema.productVendorsTable).values(productVendors);

	//* Contacts
	const contacts: InferInsertModel<typeof schema.contactsTable>[] = [];
	for (let i = 0; i < 20; i++) {
		const contact: InferInsertModel<typeof schema.contactsTable> = {
			companyId:
				createdCompanies[Math.floor(Math.random() * createdCompanies.length)]
					.companyId,
			lastName: faker.person.lastName(),
			firstName: faker.person.firstName(),
			emailAddress: faker.internet.email(),
			primaryPhone: faker.string.numeric(9),
			secondaryPhone: faker.string.numeric(9),
			jobTitle: faker.person.jobTitle(),
		};
		contacts.push(contact);
	}
	await db.insert(schema.contactsTable).values(contacts);

	//* Employees
	const employees: InferInsertModel<typeof schema.employeesTable>[] = [];
	for (let i = 0; i < 20; i++) {
		const employee: InferInsertModel<typeof schema.employeesTable> = {
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			emailAddress: faker.internet.email(),
			jobTitle: faker.person.jobTitle(),
			primaryPhone: faker.string.numeric(9),
			secondaryPhone: faker.string.numeric(9),
			titleId: faker.number.int({ min: 1, max: 2 }),
		};
		employees.push(employee);
	}
	const createdEmployees = await db
		.insert(schema.employeesTable)
		.values(employees)
		.returning();

	//* Privleges
	await db.insert(schema.privilegesTable).values([
		{
			privileveName: "Purchase Approvals",
		},
	]);

	//* Employee privileges
	for (let i = 0; i < 6; i++) {
		await db.insert(schema.employeePrivilegesTable).values([
			{
				employeeId:
					createdEmployees[Math.floor(Math.random() * createdEmployees.length)]
						.employeeId,
				privilegeId: 1,
			},
		]);
	}

	//* Orders
	const orders: InferInsertModel<typeof schema.ordersTable>[] = [];
	const nonVendors = createdCompanies.filter((c) => c.companyTypeId !== 3);
	for (let i = 0; i < 20; i++) {
		const order: InferInsertModel<typeof schema.ordersTable> = {
			employeeId:
				createdEmployees[Math.floor(Math.random() * createdEmployees.length)]
					.employeeId,
			customerId:
				nonVendors[Math.floor(Math.random() * nonVendors.length)].companyId,
			orderDate: faker.date.recent({ days: 10 }),
			taxRate: 23,
			orderStatusId: 3,
			taxStatusId: faker.number.int({ min: 1, max: 2 }),
			paymentMethod:
				schema.paymentMethodsEnum.enumValues[
					faker.number.int({ min: 0, max: 3 })
				],
		};
		orders.push(order);
	}
	const createdOrders = await db
		.insert(schema.ordersTable)
		.values(orders)
		.returning();

	//* Order details status
	await db.insert(schema.orderDetailsStatusTable).values([
		{
			orderDetailsStatusName: "New",
			sortOrder: 10,
		},
		{
			orderDetailsStatusName: "Allocated",
			sortOrder: 40,
		},
		{
			orderDetailsStatusName: "On order",
			sortOrder: 30,
		},
		{
			orderDetailsStatusName: "No stock",
			sortOrder: 20,
		},
		{
			orderDetailsStatusName: "Invoiced",
			sortOrder: 50,
		},
		{
			orderDetailsStatusName: "Shipped",
			sortOrder: 60,
		},
	]);

	//* Order details
	const orderDetails: InferInsertModel<typeof schema.orderDetailsTable>[] = [];
	for (let i = 0; i < createdOrders.length * 2; i++) {
		const orderDetail: InferInsertModel<typeof schema.orderDetailsTable> = {
			orderId:
				createdOrders[Math.floor(Math.random() * createdOrders.length)].orderId,
			productId:
				createdProducts[Math.floor(Math.random() * createdProducts.length)]
					.productId,
			quantity: faker.number.int({ min: 1, max: 30 }),
			unitPrice: faker.commerce.price({ min: 10, max: 100 }),
			discount: faker.number
				.float({ min: -15, max: 20, fractionDigits: 2 })
				.toString(),
			orderDetailStatusId: 1,
		};
		orderDetails.push(orderDetail);
	}
	await db.insert(schema.orderDetailsTable).values(orderDetails);

	//* Purchase orders
	const purchaseOrders: InferInsertModel<typeof schema.purchaseOrdersTable>[] =
		[];
	for (let i = 0; i < 20; i++) {
		const purchaseOrder: InferInsertModel<typeof schema.purchaseOrdersTable> = {
			vendorId: vendors[Math.floor(Math.random() * vendors.length)].companyId,
			submittedBy:
				createdEmployees[Math.floor(Math.random() * createdEmployees.length)]
					.employeeId,
			submittedDate: faker.date.recent({ days: 15 }),
			approvedBy:
				createdEmployees[Math.floor(Math.random() * createdEmployees.length)]
					.employeeId,
			approvedDate: faker.date.recent({ days: 10 }),
			statusId: faker.number.int({ min: 1, max: 5 }),
			shippingFee: faker.commerce.price(),
			paymentDate: faker.date.recent({ days: 8 }),
			paymentAmount: faker.commerce.price(),
			paymentMethod:
				schema.paymentMethodsEnum.enumValues[
					faker.number.int({ min: 0, max: 3 })
				],
			receivedDate: faker.date.recent({ days: 3 }),
		};
		purchaseOrders.push(purchaseOrder);
	}
	const createdPurchaseOrders = await db
		.insert(schema.purchaseOrdersTable)
		.values(purchaseOrders)
		.returning();

	//* Purchase orders details
	const purchaseOrdersDetails: InferInsertModel<
		typeof schema.purchaseOrderDetailsTable
	>[] = [];
	for (let i = 0; i < 40; i++) {
		const purchaseOrderDetail: InferInsertModel<
			typeof schema.purchaseOrderDetailsTable
		> = {
			purchaseOrderId:
				createdPurchaseOrders[
					Math.floor(Math.random() * createdPurchaseOrders.length)
				].purchaseOrderId,
			productId:
				createdProducts[Math.floor(Math.random() * createdProducts.length)]
					.productId,
			quantity: faker.number.int({ min: 40, max: 100 }),
			unitCost: faker.commerce.price({ min: 5, max: 35 }),
			receivedDate: faker.date.recent({ days: 3 }),
		};
		purchaseOrdersDetails.push(purchaseOrderDetail);
	}
	await db
		.insert(schema.purchaseOrderDetailsTable)
		.values(purchaseOrdersDetails);

	//* Stock take
	const stockTakes: InferInsertModel<typeof schema.stockTakesTable>[] = [];
	for (let i = 0; i < createdProducts.length; i++) {
		const stockTake: InferInsertModel<typeof schema.stockTakesTable> = {
			productId:
				createdProducts[Math.floor(Math.random() * createdProducts.length)]
					.productId,
			expectedQuantity: faker.number.int({ min: 50, max: 150 }),
			quantityOnHand: faker.number.int({ min: 50, max: 150 }),
			stockTakeDate: faker.date.recent({ days: 3 }),
		};
		stockTakes.push(stockTake);
	}
	await db.insert(schema.stockTakesTable).values(stockTakes);

	await pool.end();
}

main();
