import navLinks from "@/constants";
import Image from "next/image";
import Link from "next/link";
import SidebarDropdown from "./SidebarDropdown";
import { Button } from "./ui/button";

export default async function Sidebar() {
	return (
		<section className="sticky left-0 top-0 flex flex-col w-fit min-w-[250px] h-screen justify-start items-center p-4 border-r">
			<section className="w-full text-center mb-4">
				<Link href={"/dashboard"}>
					<h3 className="text-2xl font-semibold">Northwind Traders</h3>
				</Link>
			</section>
			<nav className="flex flex-col w-full flex-1 justify-start items-start p-2">
				{navLinks.map((menu) => {
					if (menu.submenus) {
						return <SidebarDropdown key={menu.name} menu={menu} />;
					}
					return (
						<Link
							key={menu.name}
							href={menu.href}
							className="flex w-full flex-row items-center justify-start"
						>
							<Button
								variant={"ghost"}
								className="w-full flex flex-row items-center justify-start text-lg"
							>
								<Image src={menu.icon} width={24} height={24} alt={""} />
								<span className="pl-2">{menu.name}</span>
							</Button>
						</Link>
					);
				})}
			</nav>
			<section className="p-2">
				<h3>Logged in: Admin</h3>
			</section>
		</section>
	);
}
