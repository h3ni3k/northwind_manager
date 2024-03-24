import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import {
	ArrowDownAzIcon,
	ArrowDownUpIcon,
	ArrowDownZaIcon,
	EyeOffIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

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
						variant="ghost"
						size="sm"
						className="-ml-3 h-8 data-[state=open]:bg-accent"
					>
						<span>{title}</span>
						{column.getIsSorted() === "desc" ? (
							<ArrowDownZaIcon className="ml-2 size-4" />
						) : column.getIsSorted() === "asc" ? (
							<ArrowDownAzIcon className="ml-2 size-4" />
						) : (
							<ArrowDownUpIcon className="ml-2 size-4" />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem>
						<Input />
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<ArrowDownAzIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<ArrowDownZaIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Desc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.clearSorting()}>
						<ArrowDownUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Clear sort
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
						<EyeOffIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Hide
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
