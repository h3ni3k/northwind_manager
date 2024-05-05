"use client";

import { Order } from "@/actions/orders.actions";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table";

const ch = createColumnHelper<Order>();

export const defaultColumns = [
	ch.display({
		id: "checkbox",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(v) => row.toggleSelected(!!v)}
			/>
		),
		enableHiding: false,
		enableSorting: false,
	}),
	ch.accessor("orderId", {
		id: "Order Id",
		header: "Order Id",
	}),

	ch.accessor("status.orderStatusCode", {
		id: "Order status",
		header: "Order status",
		// cell: ({ cell }) => {
		// 	return (
		// 		<DropdownMenu>
		// 			<DropdownMenuTrigger>
		// 				{cell.getContext().getValue()}
		// 			</DropdownMenuTrigger>
		// 			<DropdownMenuContent>
		// 				<DropdownMenuItem>New</DropdownMenuItem>
		// 				<DropdownMenuItem>Shipped</DropdownMenuItem>
		// 			</DropdownMenuContent>
		// 		</DropdownMenu>
		// 	);
		// },
	}),
	ch.accessor("customer.companyName", {
		id: "Customer",
		header: "Customer",
	}),
	ch.accessor("employee", {
		id: "Employee",
		header: "Employee",
		cell: ({ cell }) =>
			`${cell.getValue().firstName} ${cell.getValue().lastName}`,
	}),
	ch.accessor("orderDate", {
		id: "Order date",
		header: "Order date",
		cell: ({ cell }) => cell.getValue().toLocaleDateString(),
	}),
	ch.accessor("invoiceDate", {
		id: "Invoice date",
		header: "Invoice date",
		cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
	}),

	ch.accessor("shippedDate", {
		id: "Shipped date",
		header: "Shipped date",
		cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
	}),
	ch.accessor("shipper.companyName", {
		id: "Shipper",
		header: "Shipper",
	}),
	ch.accessor("shippingFee", {
		id: "Shipping Fee",
		header: "Shipping Fee",
	}),
	ch.accessor("taxRate", {
		id: "taxRate",
		header: "Tax",
	}),
	ch.accessor("taxStatus.taxStatus", {
		id: "Tax status",
		header: "Tax status",
	}),
	ch.accessor("paymentMethod", {
		id: "Payment",
		header: "Payment",
	}),
	ch.accessor("paidDate", {
		id: "paidDate",
		header: "Paid date",
		cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
	}),
	ch.accessor("notes", {
		id: "Notes",
		header: "Notes",
	}),
	// ch.accessor("createdAt", {
	// 	id: "createdAt",
	// 	header: "Created",
	// 	cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
	// }),
];
