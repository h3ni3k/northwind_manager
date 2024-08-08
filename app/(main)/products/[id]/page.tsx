import { getProductById } from "@/actions/products.actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function ProductPage({
	params,
}: { params: { id: string } }) {
	const productId = Number(params.id);
	const product = await getProductById(productId);
	return (
		<section className="flex-1 p-4">
			<Card>
				<CardHeader>Product info</CardHeader>
				<CardContent>
					<div>Product Id: {product.productId}</div>
					<div>Product Code: {product.productCode}</div>
					<div>Product Name: {product.productName}</div>
					<div>Quantity Per Unit: {product.quantityPerUnit}</div>
					<div>Category: {product.category.categoryName}</div>
					<div>Discontinued: {product.discontinued}</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>Prices</CardHeader>
				<CardContent>
					<div>Unit Price: {product.unitPrice}</div>
					<div>Unit Cost: {product.unitCost}</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>Prices</CardHeader>
				<CardContent>
					<div>Reorder Level: {product.reorderLevel}</div>
					<div>Target Level: {product.targetLevel}</div>
				</CardContent>
			</Card>
		</section>
	);
}
