"use client";
import { OrderDetails } from "@/actions/orders.actions";
import { createColumnHelper } from "@tanstack/react-table";

const ch = createColumnHelper<OrderDetails>();
export const columns = [
	ch.accessor("orderDetailId", {
		id: "orderDetailId",
	}),
	ch.accessor("product.productName", {
		id: "productName",
	}),
	ch.accessor("quantity", {
		id: "quantity",
	}),
	ch.accessor("unitPrice", {
		id: "unitPrice",
	}),
	ch.accessor("discount", {
		id: "discount",
	}),
	ch.accessor((row) => Number(row.quantity) * Number(row.unitPrice), {
		id: "price",
	}),
];
