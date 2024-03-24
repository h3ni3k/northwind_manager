"use client";
import { Table } from "@tanstack/react-table";
import { SlidersHorizontalIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

interface DataTableToolberProps<TData> {
	table: Table<TData>;
}

export default function DataTableToolbar<TData>({
	table,
}: DataTableToolberProps<TData>) {
	const isFiltered = table.getState().globalFilter;
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					className="h-8 w-[250px]"
					placeholder="Search everywhere..."
					value={table.getState().globalFilter}
					onChange={(ev) => table.setGlobalFilter(ev.target.value)}
				/>
				{!!isFiltered && (
					<Button
						variant={"ghost"}
						onClick={() => table.resetGlobalFilter()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<X className="ml-2 size-4" />
					</Button>
				)}
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant={"outline"}
						size={"sm"}
						className="ml-auto hidden h-8 lg:flex"
					>
						<SlidersHorizontalIcon className="size-4 mr-2" />
						View
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Toggle visibility</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{table
						.getAllColumns()
						.filter(
							(col) =>
								typeof col.accessorFn !== "undefined" && col.getCanHide(),
						)
						.map((col) => (
							<DropdownMenuCheckboxItem
								key={col.id}
								className="capitalize"
								checked={col.getIsVisible()}
								onCheckedChange={(v) => col.toggleVisibility(!!v)}
							>
								{col.id}
								{/* {col.columnDef.header?.toString()} */}
							</DropdownMenuCheckboxItem>
						))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
