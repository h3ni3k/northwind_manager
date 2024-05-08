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
	const segment = useSelectedLayoutSegment();
	const segments = useSelectedLayoutSegments();
	console.log({ currentPath, segment, segments });

	const active = href === currentPath;

	return (
		<Link
			href={href}
			className="flex w-full flex-row items-center justify-start rounded-md"
		>
			<Button
				variant={"ghost"}
				className={cn(
					className,
					"w-full flex flex-row items-center justify-start text-lg",
					active ? "bg-blue-300" : null,
				)}
			>
				<Image src={icon} width={24} height={24} alt={""} />
				<span className="pl-2">{name}</span>
			</Button>
		</Link>
	);
}
