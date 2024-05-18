"use client";
import { Order } from "@/actions/orders.actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
	ChevronsDownIcon,
	ChevronsRightIcon,
	MoreHorizontalIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTableColumnHeader from "../DataTableColumnHeader";

const ch = createColumnHelper<Order>();

export const clientOrderColumns = [
	ch.display({
		id: "actions",
		header: ({ table }) => (
			<Checkbox
				className="flex items-center justify-center"
				checked={
					table.getIsAllRowsSelected() ||
					(table.getIsSomeRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				className="flex items-center justify-center"
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
	}),
	ch.accessor("orderId", {
		header: () => <div>Order Id</div>,
		cell: ({ cell }) => (
			<Link href={`/client-orders/details/${cell.getValue()}`}>
				{cell.getValue()}
			</Link>
		),
	}),
	ch.accessor((row) => row.status.orderStatusCode, {
		id: "orderStatusCode",
		header: () => <div>Status</div>,
	}),
	ch.accessor((row) => row.customer.companyName, {
		id: "customerName",
		header: () => <div>Customer</div>,
	}),
	ch.accessor((row) => `${row.employee.firstName} ${row.employee.lastName}`, {
		id: "employeeName",
		header: () => <div>Employee</div>,
	}),
	ch.accessor("orderDate", {
		id: "orderDate",
		header: () => <div>Order Date</div>,
		cell: ({ cell }) => <div>{formatDate(cell.getValue())}</div>,
	}),
	ch.accessor("invoiceDate", {
		id: "invoiceDate",
		header: () => <div>Invoice Date</div>,
		cell: ({ cell }) => <div>{formatDate(cell.getValue())}</div>,
	}),
	ch.accessor("paidDate", {
		id: "paidDate",
		header: () => <div>Paid Date</div>,
		cell: ({ cell }) => <div>{formatDate(cell.getValue())}</div>,
	}),
	ch.accessor((row) => row.shipper.companyName, {
		id: "shipperName",
		header: () => <div>Shipper</div>,
	}),
	ch.accessor("shippingFee", {
		id: "shippingFee",
		header: () => <div>Shipping Fee</div>,
	}),
	ch.accessor("shippedDate", {
		id: "shippedDate",
		header: () => <div>Shipped Date</div>,
		cell: ({ cell }) => <div>{formatDate(cell.getValue())}</div>,
	}),
	ch.accessor("notes", {
		id: "notes",
		header: () => <div>Notes</div>,
	}),
];

// {
//   "employee": {
//     "employeeId": 12,
//   },
//   "taxStatus": {
//     "taxStatus": "Tax Exempt"
//   },
//   "status": {
//     "orderStatusName": "New"
//   }
// }
