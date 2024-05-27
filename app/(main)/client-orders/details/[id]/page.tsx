import { getCompanyByType } from "@/actions/companies.actions";
import { getOrder, getOrderDetails } from "@/actions/orders.actions";
import CustomerSelect from "@/components/orders/CustomerSelect";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CompaniesSelect } from "@/db/types";
import { formatDate } from "@/lib/utils";

export default async function OrderDetailsPage({
	params,
}: { params: { id: string } }) {
	const order = await getOrder(Number(params.id));
	if (!order) return <div>No order </div>;

	const orderDetails = await getOrderDetails(Number(params.id));
	const customers = await getCompanyByType(1);
	return (
		<section className="flex-1 p-4 grid grid-rows-2 gap-4">
			<div className="grid grid-cols-3 gap-4">
				<div>
					<div>Order id: {order.orderId}</div>
					<div>
						<CustomerSelect
							currentCustomer={order.customer.companyName}
							customers={customers}
						/>
					</div>
					<div>
						Employee: {order.employee.firstName} {order.employee.lastName}
					</div>
					<div className="flex flex-col items-start justify-center">
						Notes:{" "}
						<textarea name="" id="" cols={30} rows={5} className="border">
							{order.notes}
						</textarea>
					</div>
				</div>
				<div>
					<div>Status: {order.status.orderStatusName}</div>
					<div>Order date: {formatDate(order.orderDate)}</div>
					<div>Invoice date: {formatDate(order.invoiceDate)}</div>
					<div>Shipped date: {formatDate(order.shippedDate)}</div>
					<div>Shipper: {order.shipper.companyName}</div>
					<div>Shipping fee: {order.shippingFee}</div>
				</div>
				<div>
					<div>Payment method: {order.paymentMethod}</div>
					<div>Paid date: {formatDate(order.paidDate)}</div>
				</div>

				{/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
			</div>
			<div>{/* <pre>{JSON.stringify(orderDetails, null, 2)}</pre> */}</div>
		</section>
	);
}
