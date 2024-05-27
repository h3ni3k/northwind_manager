"use server";

import { db } from "@/db/client";
import { products } from "@/db/schema";
import { ProductsSelect } from "@/db/types";
import { eq } from "drizzle-orm";

export type Product = Omit<ProductsSelect, "createdAt" | "modifiedAt"> & {
	category: { categoryName: string | null } | null;
};

export async function getAllProducts(): Promise<Product[]> {
	return await db.query.products.findMany({
		columns: {
			createdAt: false,
			modifiedAt: false,
		},
		with: {
			category: {
				columns: {
					categoryName: true,
				},
			},
		},
	});
}

export async function updateDiscontinued({
	productId,
	value,
}: { productId: number; value: boolean }) {
	return await db
		.update(products)
		.set({
			discontinued: value,
		})
		.where(eq(products.productId, productId));
}
