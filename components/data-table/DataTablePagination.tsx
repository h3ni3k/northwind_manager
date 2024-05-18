import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
} from "../ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}
export default function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex items-center justify-between mt-2">
			<div className="flex-1 text-sm text-muted-foreground">
				{table.getSelectedRowModel().rows.length} of{" "}
				{table.getFilteredRowModel().rows.length} selected.
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</div>
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Rows per page:</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(v) => table.setPageSize(Number(v))}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((size) => (
								<SelectItem key={size} value={`${size}`}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant={"outline"}
						size={"sm"}
						onClick={() => table.firstPage()}
						disabled={!table.getCanPreviousPage()}
					>
						First
					</Button>
					<Button
						variant={"outline"}
						size={"sm"}
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Input
						className="h-8 w-12 text-center"
						type="text"
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							table.setPageIndex(page);
						}}
					/>
					<Button
						variant={"outline"}
						size={"sm"}
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
					<Button
						variant={"outline"}
						size={"sm"}
						onClick={() => table.lastPage()}
						disabled={!table.getCanNextPage()}
					>
						Last
					</Button>
				</div>
			</div>
		</div>
	);
}
