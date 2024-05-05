import Sidebar from "@/components/Sidebar";

export default async function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex flex-row">
			<Sidebar />
			{children}
		</main>
	);
}
