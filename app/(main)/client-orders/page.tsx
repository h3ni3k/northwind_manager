import { getOrders } from "@/actions/orders.actions";

export default async function OrdersPage() {
	const orders = await getOrders();

	return (
		<section className="flex-1 p-4">
			<pre>{JSON.stringify(orders[0], null, 2)}</pre>
			There will eventually be a table here
		</section>
	);
}
