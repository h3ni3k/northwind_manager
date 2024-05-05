"use server";

import { db } from "@/db/client";
import { OrdersSelect } from "@/db/types";

export type Order = OrdersSelect & {
	employee: { firstName: string; lastName: string };
	customer: { companyName: string };
	taxStatus: { taxStatus: string };
	status: { orderStatusCode: string };
	shipper: { companyName: string };
};

export async function getAllOrders(): Promise<Order[]> {
	return await db.query.ordersTable.findMany({
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
