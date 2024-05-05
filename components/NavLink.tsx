"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
	usePathname,
	useSelectedLayoutSegment,
	useSelectedLayoutSegments,
} from "next/navigation";

export default function NavLink({
	href,
	title,
}: { href: string; title: string }) {
	const currentPath = usePathname();

	const active = href === currentPath;

	return (
		<Link className={cn("text-xl font-bold")} href={href}>
			{title}
		</Link>
	);
}
