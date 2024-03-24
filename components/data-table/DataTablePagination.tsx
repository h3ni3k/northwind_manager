import { Table } from "@tanstack/react-table";
import {
	ChevronFirstIcon,
	ChevronLastIcon,
	ChevronLeftIcon,
	ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

export default function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex items-center">
			<div>
				Page {table.getState().pagination.pageIndex + 1} of{" "}
				{table.getPageCount()}
			</div>
			<div className="flex gap-1">
				<Button
					variant={"ghost"}
					className="size-8 p-0"
					onClick={() => table.firstPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<ChevronFirstIcon className="size-4" />
				</Button>
				<Button
					variant={"ghost"}
					className="size-8 p-0"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<ChevronLeftIcon className="size-4" />
				</Button>
				<Input
					type="text"
					className="size-8 p-2 text-center"
					value={table.getState().pagination.pageIndex + 1}
					onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)}
				/>
				<Button
					variant={"ghost"}
					className="size-8 p-0"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<ChevronRight className="size-4" />
				</Button>
				<Button
					variant={"ghost"}
					className="size-8 p-0"
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
				>
					<ChevronLastIcon className="size-4" />
				</Button>
			</div>
		</div>
	);
}
