"use client";
import { Companies } from "@/actions/companies.actions";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import DataTableColumnHeader from "../DataTableColumnHeader";

export const columns: ColumnDef<Companies>[] = [
	{
		accessorKey: "companyId",
		header: () => <div>Comapany Id</div>,
		cell: ({ row }) => {
			const companyId = row.original.companyId;
			return (
				<div>
					<Link href={`/companies/${companyId}`}>{companyId}</Link>
				</div>
			);
		},
	},
	{
		accessorKey: "companyName",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Company Name" />
		),
	},
	{
		accessorFn: (row) => row.region?.regionAbbrev,
		id: "region",
		header: () => <div>Region</div>,
	},
	{
		accessorFn: (row) => `${row.postalCode}, ${row.city}`,
		id: "city",
		header: () => <div>City</div>,
	},
	{
		accessorKey: "address",
		header: () => <div>Address</div>,
	},
	{
		accessorKey: "businessPhone",
		header: () => <div>Business phone</div>,
	},
	{
		accessorFn: (row) => row.companyType?.companyType,
		id: "companyType",
		header: () => <div>Company Type</div>,
	},
	{
		accessorKey: "notes",
		header: () => <div>Notes</div>,
	},
	{
		accessorKey: "website",
		header: () => <div>Website</div>,
	},
	{
		accessorFn: (row) => row.taxStatus?.taxStatus,
		id: "taxStatus",
		header: () => <div>Tax Status</div>,
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const { toast } = useToast();
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"ghost"} className="size-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontalIcon className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => {
								toast({
									title: "Copy",
									description: "Copied customer name to clipboard",
									role: "alert",
								});
								navigator.clipboard.writeText(row.original.companyName);
							}}
						>
							Copy customer name
						</DropdownMenuItem>
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View orders</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
