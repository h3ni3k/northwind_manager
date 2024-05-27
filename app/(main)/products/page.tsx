import { getAllProducts } from "@/actions/products.actions";

export default async function PrudctsPage() {
	const products = await getAllProducts();

	return (
		<section className="flex-1 p-4 overflow-x-scroll">
			Products page
			{/* <pre>{JSON.stringify(products[0], null, 2)}</pre> */}
		</section>
	);
}
