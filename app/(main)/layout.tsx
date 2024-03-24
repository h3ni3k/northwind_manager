import Navbar from "@/components/Navigation";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<main>
			<Navbar />
			<section>{children}</section>
		</main>
	);
}
