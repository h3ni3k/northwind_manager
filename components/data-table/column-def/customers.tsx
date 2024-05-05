"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import DataTableColumnHeader from "../DataTableColumnHeader";

const columnHelper = createColumnHelper();

export const defaultColumns = [
	columnHelper.display({
		id: "checkbox",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(v) => row.toggleSelected(!!v)}
			/>
		),
		enableHiding: false,
		enableSorting: false,
	}),
	columnHelper.accessor("shortName", {
		id: "Short name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={"Short name"} />
		),
	}),
	columnHelper.accessor("companyName", {
		id: "Company",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={"Company"} />
		),
		filterFn: "includesString",
	}),
	columnHelper.accessor("contactName", {
		id: "Contact",
		header: "Contact",
	}),
	columnHelper.accessor("contactTitle", {
		id: "Title",
		header: "Title",
	}),
	columnHelper.accessor("address", {
		id: "Address",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={"Address"} />
		),
	}),
	columnHelper.accessor("city", { id: "City", header: "City" }),
	columnHelper.accessor("region", { id: "Region", header: "Region" }),
	columnHelper.accessor("postalCode", {
		id: "Post code",
		header: "Post code",
	}),
	columnHelper.accessor("country", {
		id: "Country",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={"Country"} />
		),
	}),
	columnHelper.accessor("phone", { id: "Phone", header: "Phone" }),
	columnHelper.accessor("fax", { id: "Fax", header: "Fax" }),
];
