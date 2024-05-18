import { getOrders } from "@/actions/orders.actions";
import DataTable from "@/components/data-table/DataTable";
import { clientOrderColumns } from "@/components/data-table/columns/orders";

export default async function OrdersPage() {
	const orders = await getOrders();

	return (
		<section className="flex-1 p-4">
			{/* <pre>{JSON.stringify(orders[0], null, 2)}</pre> */}
			There will eventually be a table here
			<DataTable columns={clientOrderColumns} data={orders} />
		</section>
	);
}
