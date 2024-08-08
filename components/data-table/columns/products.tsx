"use client";
import { Product } from "@/actions/products.actions";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "productId",
		header: () => <div>Product Id</div>,
		cell: ({ row }) => {
			const productId = row.original.productId;
			return (
				<div>
					<Link href={`/products/${productId}`}>{productId}</Link>
				</div>
			);
		},
	},
	{
		accessorKey: "productCode",
		header: () => <div>Product Code</div>,
	},
	{
		accessorKey: "productName",
		header: () => <div>Product Name</div>,
	},
	{
		id: "category",
		accessorFn: (row) => row.category.categoryName,
		header: () => <div>Category</div>,
	},
	{
		accessorKey: "unitPrice",
		header: () => <div>Unit Price</div>,
		cell: ({ row }) => {
			const unitPrice = Number(row.original.unitPrice);
			return <div>{formatCurrency(unitPrice)}</div>;
		},
	},
	{
		accessorKey: "unitCost",
		header: () => <div>Unit Cost</div>,
		cell: ({ row }) => {
			const unitCost = Number(row.original.unitCost);
			return <div>{formatCurrency(unitCost)}</div>;
		},
	},
	{
		accessorKey: "quantityPerUnit",
		header: () => <div>Qty Per Unit</div>,
	},
	{
		accessorKey: "reorderLevel",
		header: () => <div>Reorder Level</div>,
	},
	{
		accessorKey: "minimumReorderQuantity",
		header: () => <div>Min Reorder Qty</div>,
	},
	{
		accessorKey: "targetLevel",
		header: () => <div>Target Level</div>,
	},
	{
		accessorKey: "productDesc",
		header: () => <div className="w-40">Product Description</div>,
	},
	{
		accessorKey: "discontinued",
		header: () => <div>Discontinued</div>,
		cell: ({ row }) => {
			const discontinued = row.original.discontinued;
			return <Checkbox checked={discontinued} />;
		},
	},
];

/* 
    productId,  X
		productCode,  X
		productName,  X
		productDesc,  X
		unitCost, X
		unitPrice,  X
		reorderLevel, X
		targetLevel,  X
		quantityPerUnit,  X
		discontinued, X
		minimumReorderQuantity, X
		categoryId, X
    */
