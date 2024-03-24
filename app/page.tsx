import { getCustomers } from "@/actions/actions";
import DataTable from "@/components/data-table/DataTable";
import { defaultColumns } from "@/components/data-table/column-def/customers";

export default async function Home() {
	// const clients = await getClients();
	const customers = await getCustomers();

	// console.log(clients);

	return (
		<main className="flex min-h-screen flex-col items-center p-8">
			Northwind Manager
			<DataTable columns={defaultColumns} data={customers} />
		</main>
	);
}
