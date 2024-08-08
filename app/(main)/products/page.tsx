import { getAllProducts } from "@/actions/products.actions";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "@/components/data-table/columns/products";

export default async function PrudctsPage() {
	const products = await getAllProducts();

	return (
		<section className="flex-1 p-4 overflow-x-scroll">
			<DataTable data={products} columns={columns} />
		</section>
	);
}
