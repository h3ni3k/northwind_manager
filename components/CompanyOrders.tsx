"use client";

import { CompanyOrder } from "@/actions/orders.actions";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

export default function CompanyOrders({ orders }: { orders: CompanyOrder[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Order Id</TableHead>
					<TableHead>Employee</TableHead>
					<TableHead>Order Date</TableHead>
					<TableHead>Order Total</TableHead>
					<TableHead>Order Status</TableHead>
					<TableHead>Shipper</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order) => (
					<TableRow key={order.orderId}>
						<TableCell>
							<Link href={`/orders/${order.orderId}`}>{order.orderId}</Link>
						</TableCell>
						<TableCell>{order.employee.firstName}</TableCell>
						<TableCell>{formatDate(order.orderDate)}</TableCell>
						<TableCell>$100</TableCell>
						<TableCell>{order.status.orderStatusName}</TableCell>
						<TableCell>{order.shipper.companyName}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
