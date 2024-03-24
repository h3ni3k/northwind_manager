"use client";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDownIcon, UserIcon } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { EmployeeSelect } from "@/db/out/schema";

export default function UserSwitcher({
	employees,
}: { employees: EmployeeSelect[] }) {
	const currentUser = {
		employeeId: 9,
		lastName: "Dodsworth",
		firstName: "Anne",
		title: "Sales Representative",
		titleOfCourtesy: "Ms.",
		birthDate: "1966-01-27",
		hireDate: "1994-11-15",
		address: "7 Houndstooth Rd.",
		city: "London",
		region: null,
		postalCode: "WG2 7LT",
		country: "UK",
		homePhone: "(71) 555-4444",
		extension: "452",
		photo: "\\x",
		notes:
			"Anne has a BA degree in English from St. Lawrence College.  She is fluent in French and German.",
		reportsTo: 5,
		photoPath: "http://accweb/emmployees/davolio.bmp",
	};
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					role="combobox"
					aria-expanded={open}
					className="flex w-[200px] justify-between items-center"
				>
					<Avatar className="size-6">
						<AvatarImage />
						<AvatarFallback>
							<UserIcon size={16} />
						</AvatarFallback>
					</Avatar>
					Robert King
					<ChevronsUpDownIcon className="size-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput />
					<CommandEmpty>No users found.</CommandEmpty>
					<CommandList>
						<CommandGroup heading="Current User">
							<CommandItem>Robert King</CommandItem>
						</CommandGroup>
						<CommandGroup heading="Other Users">
							{employees
								.filter((emp) => emp.employeeId !== currentUser.employeeId)
								.map((emp) => (
									<CommandItem key={emp.employeeId}>
										{emp.firstName} {emp.lastName}
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
