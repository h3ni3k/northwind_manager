"use server";

import { db } from "@/db/client";
import { employees, orderDetails, orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export type Order = {
	orderId: number;
	orderDate: Date;
	invoiceDate: Date | null;
	shippedDate: Date | null;
	shippingFee: string | null;
	paidDate: Date | null;
	paymentMethod: string;
	notes: string | null;
	employee: {
		employeeId: number;
		firstName: string;
		lastName: string;
	};
	customer: {
		companyName: string;
	};
	shipper: {
		companyName: string;
	};
	// taxStatus: {
	// 	taxStatus: string;
	// };
	status: {
		orderStatusCode: string;
		orderStatusName: string;
	};
};

export async function getOrders(): Promise<Order[]> {
	return await db.query.orders.findMany({
		columns: {
			orderId: true,
			orderDate: true,
			invoiceDate: true,
			shippedDate: true,
			shippingFee: true,
			paidDate: true,
			paymentMethod: true,
			notes: true,
		},
		with: {
			employee: {
				columns: {
					employeeId: true,
					firstName: true,
					lastName: true,
				},
			},
			customer: {
				columns: {
					companyName: true,
				},
			},
			shipper: {
				columns: {
					companyName: true,
				},
			},
			// taxStatus: {
			// 	columns: {
			// 		taxStatus: true,
			// 	},
			// },
			status: {
				columns: {
					orderStatusCode: true,
					orderStatusName: true,
				},
			},
		},
	});
}

export async function getOrder(orderId: number) {
	return await db.query.orders.findFirst({
		columns: {
			orderId: true,
			orderDate: true,
			invoiceDate: true,
			shippedDate: true,
			shippingFee: true,
			paidDate: true,
			paymentMethod: true,
			notes: true,
		},
		with: {
			employee: {
				columns: {
					employeeId: true,
					firstName: true,
					lastName: true,
				},
			},
			customer: {
				columns: {
					companyName: true,
				},
			},
			shipper: {
				columns: {
					companyName: true,
				},
			},
			// taxStatus: {
			// 	columns: {
			// 		taxStatus: true,
			// 	},
			// },
			status: {
				columns: {
					orderStatusCode: true,
					orderStatusName: true,
				},
			},
		},
		where: eq(orders.orderId, orderId),
	});
}

export type OrderDetails = {
	orderDetailId: number;
	orderId: number;
	productId: number;
	quantity: number | null;
	unitPrice: string | null;
	discount: string | null;
	product: {
		productCode: string | null;
		productName: string | null;
	};
};

export async function getOrderDetails(
	orderId: number,
): Promise<OrderDetails[]> {
	return await db.query.orderDetails.findMany({
		columns: {
			orderDetailStatusId: false,
			createdAt: false,
			modifiedAt: false,
		},
		with: {
			product: {
				columns: {
					productCode: true,
					productName: true,
				},
			},
		},
		where: eq(orderDetails.orderId, orderId),
	});
}
