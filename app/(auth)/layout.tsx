import { validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Northwind Traders Login page",
	description: "Northwind Traders Login page",
};

export default async function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { session } = await validateRequest();
	if (session) {
		redirect("/");
	}
	return (
		<html lang="en">
			<body
				className={cn("flex h-screen flex-col items-center", inter.className)}
			>
				<div className="mx-auto p-4 h-full">{children}</div>
				<footer>
					<p>Footer</p>
				</footer>
			</body>
		</html>
	);
}
