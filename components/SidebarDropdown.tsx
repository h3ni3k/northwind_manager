"use client";

import {
	ChevronDown,
	ChevronDownIcon,
	ChevronUpIcon,
	LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { Button } from "./ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";

export default function SidebarDropdown({
	menu,
}: {
	menu: {
		name: string;
		icon: string;
		submenus: {
			name: string;
			href: string;
			icon: string;
		}[];
	};
}) {
	const path = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
			<CollapsibleTrigger asChild>
				<Button
					variant={"ghost"}
					className="w-full flex flex-row items-center justify-start text-lg"
				>
					<Image
						src={menu.icon}
						width={24}
						height={24}
						alt={`${menu.name} icon`}
					/>
					<span className="px-2">{menu.name}</span>
					{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent className="w-full">
				{menu.submenus.map((submenu) => {
					useEffect(() => {
						if (submenu.href === path) {
							console.log("we're golden");
							setIsOpen(true);
						}
					}, [submenu.href]);

					return (
						// <Link
						// 	key={submenu.name}
						// 	href={submenu.href}
						// 	className="flex w-full flex-row items-center justify-start"
						// >
						// 	<Button
						// 		variant={"ghost"}
						// 		className="w-full flex flex-row items-center justify-start pl-8 text-lg"
						// 	>
						// 		<Image
						// 			src={submenu.icon}
						// 			width={24}
						// 			height={24}
						// 			alt={`${submenu.name} icon`}
						// 		/>
						// 		<span className="pl-2">{submenu.name}</span>
						// 	</Button>
						// </Link>
						<SidebarItem
							className="pl-8"
							href={submenu.href}
							name={submenu.name}
							icon={submenu.icon}
						/>
					);
				})}
			</CollapsibleContent>
		</Collapsible>
	);
}
