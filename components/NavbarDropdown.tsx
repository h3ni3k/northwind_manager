import { validateRequest } from "@/lib/auth";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default async function NavbarDropdown({
	children,
}: { children: ReactNode }) {
	const { session } = await validateRequest();
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage />
						<AvatarFallback>Test</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>
						<p className="text-lg">Test</p>
					</DropdownMenuLabel>
					<DropdownMenuItem>{children}</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
