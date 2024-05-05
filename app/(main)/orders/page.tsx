import { getAllOrders } from "@/actions/orders.actions";
import DataTable from "@/components/data-table/DataTable";
import { defaultColumns } from "@/components/data-table/column-def/orders";

export default async function OrdersPage() {
	const orders = await getAllOrders();
	return (
		<div>
			{/* <pre>{JSON.stringify(orders[0], null, 2)}</pre> */}
			<DataTable data={orders} columns={defaultColumns} />
		</div>
	);
}
