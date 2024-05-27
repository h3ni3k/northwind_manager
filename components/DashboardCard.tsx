"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardCard({
	children,
	name,
	href,
	className,
}: {
	children: React.ReactNode;
	name: string;
	href: string;
	className?: string;
}) {
	return (
		<Card className={cn(className)}>
			<Link href={href}>
				<CardContent className="p-6 flex flex-col items-center justify-center h-full w-full">
					{children}
					<p className="text-2xl mt-4">{name}</p>
				</CardContent>
			</Link>
		</Card>
	);
}
