"use client";

import { cn } from "@/lib/utils";
import { log } from "console";
import Image from "next/image";
import Link from "next/link";
import {
	usePathname,
	useSelectedLayoutSegment,
	useSelectedLayoutSegments,
} from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

type SidebarItemProps = {
	href: string;
	name: string;
	icon: string;
	className?: string;
} & React.LinkHTMLAttributes<HTMLLinkElement>;

export default function SidebarItem({
	href,
	name,
	icon,
	className,
}: SidebarItemProps) {
	const currentPath = usePathname();

	const active = href === currentPath;

	return (
		<Link
			href={href}
			className="flex w-full flex-row items-center justify-start rounded-md"
		>
			<Button
				variant={"ghost"}
				type="button"
				className={cn(
					className,
					"w-full flex flex-row items-center justify-start text-lg hover:bg-blue-300",
					active ? "bg-blue-400" : null,
				)}
			>
				<Image src={icon} width={24} height={24} alt={""} />
				<span className="pl-2">{name}</span>
			</Button>
		</Link>
	);
}
