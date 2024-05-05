"use server";

import { db } from "@/db/client";
import { OrderTableSelect, employees, orders } from "@/db/schema";

export type Order = OrderTableSelect & {
	employee: { firstName: string; lastName: string };
	customer: { companyName: string };
	taxStatus: { taxStatus: string };
	status: { orderStatusCode: string };
	shipper: { companyName: string };
};

export async function getAllOrders(): Promise<Order[]> {
	return await db.query.orders.findMany({
		with: {
			employee: {
				columns: {
					firstName: true,
					lastName: true,
				},
			},
			customer: {
				columns: {
					companyName: true,
				},
			},
			taxStatus: {
				columns: {
					taxStatus: true,
				},
			},
			status: {
				columns: {
					orderStatusCode: true,
				},
			},
			shipper: {
				columns: {
					companyName: true,
				},
			},
		},
	});
}
