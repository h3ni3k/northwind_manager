"use client";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	ChevronsUpDownIcon,
	XIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
}

export default function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	return (
		<div className={cn("flex items-center space-x-2", className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant={"ghost"}
						size={"sm"}
						className="-ml-3 h-8 data-[state=open]:bg-accent"
					>
						<span>{title}</span>
						{column.getIsSorted() === "desc" ? (
							<ChevronDownIcon className="ml-2 size-4" />
						) : column.getIsSorted() === "asc" ? (
							<ChevronUpIcon className="ml-2 size-4" />
						) : (
							<ChevronsUpDownIcon className="ml-2 size-4" />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						Desc{" "}
						<ChevronDownIcon className="ml-2 size-3.5 text-muted-foreground" />
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						Asc{" "}
						<ChevronUpIcon className="ml-2 size-3.5 text-muted-foreground" />
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.clearSorting()}>
						Clear <XIcon className="ml-2 size-3.5 text-muted-foreground" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
