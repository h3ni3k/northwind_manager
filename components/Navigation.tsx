"use client";

import { logout } from "@/actions/actions";
import Form from "./Form";
import UserSwitcher from "./navbar/UserSwitcher";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default async function Navbar() {
	// const employees = await getEmployees();
	return (
		<nav>
			<UserSwitcher employees={[] /* || employees */} />
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button>Orders</Button>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</div>
			<Form action={logout}>
				<Button>Sign out</Button>
			</Form>
			{/* <div className="flex items-center justify-between">
				<Menubar className="w-full">
					<MenubarMenu>
						<MenubarTrigger className="font-bold">NM</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<SettingsIcon size={18} className="mr-2" />
								Settings
							</MenubarItem>
							<MenubarItem>
								<LogOutIcon size={18} className="mr-2" />
								Log out
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Orders</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<BookUpIcon size={18} className="mr-2" />
								Client
							</MenubarItem>
							<MenubarItem>
								<BookDownIcon size={18} className="mr-2" />
								Supplier
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Products</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<ListIcon size={18} className="mr-2" />
								Categories
							</MenubarItem>
							<MenubarItem>
								<ClipboardListIcon size={18} className="mr-2" />
								Products
							</MenubarItem>
							<MenubarItem>
								<WarehouseIcon size={18} className="mr-2" />
								Stock
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Management</MenubarTrigger>
						<MenubarContent>
							<MenubarSub>
								<MenubarSubTrigger>
									<CircleUserIcon size={18} className="mr-2" />
									Employees
								</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>Employees</MenubarItem>
									<MenubarItem>Territories</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
							<MenubarSub>
								<MenubarSubTrigger>
									<ContactIcon size={18} className="mr-2" />
									Customers
								</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>Customers</MenubarItem>
									<MenubarItem>Demographics</MenubarItem>
									<MenubarItem>Regions</MenubarItem>
									<MenubarItem>States</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"ghost"} className="relative size-8 rounded-full">
							<Avatar className="size-8">
								<AvatarImage />
								<AvatarFallback>User</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</div> */}
		</nav>
	);
}
