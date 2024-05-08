"use server";

import { db } from "@/db/client";
import {
	companiesTable,
	employeesTable,
	orderStatusTable,
	ordersTable,
	taxStatusTable,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export async function getOrders() {
	const customer = alias(companiesTable, "customer");
	const shipper = alias(companiesTable, "shipper");

	return await db
		.select({
			order: {
				orderId: ordersTable.orderId,
				orderDate: ordersTable.orderDate,
				invoiceDate: ordersTable.invoiceDate,
				shippedDate: ordersTable.shippedDate,
				shippingFee: ordersTable.shippingFee,
				taxRate: ordersTable.taxRate,
				paymentMethod: ordersTable.paymentMethod,
				paidDate: ordersTable.paidDate,
				notes: ordersTable.notes,
			},
			employee: {
				firstName: employeesTable.firstName,
				lastName: employeesTable.lastName,
			},
			customer: {
				companyName: customer.companyName,
			},
			shipper: {
				shipperName: shipper.companyName,
			},
			taxStatus: {
				taxStatus: taxStatusTable.taxStatus,
			},
			orderStatus: {
				orderStatus: orderStatusTable.orderStatusCode,
			},
		})
		.from(ordersTable)
		.leftJoin(
			employeesTable,
			eq(employeesTable.employeeId, ordersTable.employeeId),
		)
		.leftJoin(customer, eq(customer.companyId, ordersTable.customerId))
		.leftJoin(shipper, eq(shipper.companyId, ordersTable.shipperId))
		.leftJoin(
			taxStatusTable,
			eq(taxStatusTable.taxStatusId, ordersTable.taxStatusId),
		)
		.leftJoin(
			orderStatusTable,
			eq(orderStatusTable.orderStatusId, ordersTable.orderStatusId),
		);
}
