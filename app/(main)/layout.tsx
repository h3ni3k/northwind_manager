import Navbar from "@/components/Navbar";
import { validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import SessionProvider from "../context/SessionContext";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Northwind Traders Home page",
	description: "Northwind Traders Home page",
};

export default async function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await validateRequest();
	console.log(session, !session);

	if (!session.session || !session.user) {
		redirect("/login");
	}

	return (
		<html lang="en">
			<body
				className={cn("flex h-screen flex-col items-center ", inter.className)}
			>
				<SessionProvider value={session}>
					<Navbar />
					<div className="mx-auto p-4 h-full">{children}</div>
					<footer>
						<p>Footer</p>
					</footer>
				</SessionProvider>
			</body>
		</html>
	);
}
