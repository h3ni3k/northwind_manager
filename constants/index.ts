const navLinks = [
	{
		name: "Orders",
		icon: "/icons/book.svg",
		submenus: [
			{
				name: "Client Orders",
				href: "/orders",
				icon: "/icons/book-up.svg",
			},
			{
				name: "Purchase Orders",
				href: "/purchase-orders",
				icon: "/icons/book-down.svg",
			},
		],
	},
	{
		name: "Companies",
		icon: "/icons/building-2.svg",
		submenus: [
			{
				name: "Customers",
				href: "/companies",
				icon: "/icons/store.svg",
			},
			{
				name: "Shippers",
				href: "/companies",
				icon: "/icons/truck.svg",
			},
			{
				name: "Vendors",
				href: "/companies",
				icon: "/icons/container.svg",
			},
		],
	},
	{
		name: "Products",
		href: "/products",
		icon: "/icons/package.svg",
	},
	{
		name: "Stock",
		href: "/stock",
		icon: "/icons/package-2.svg",
	},
	{
		name: "Employees",
		href: "/employees",
		icon: "/icons/user.svg",
	},
	{
		name: "Reports",
		href: "/reports",
		icon: "/icons/notepad-text.svg",
	},
	{
		name: "Admin",
		href: "/admin",
		icon: "/icons/shield.svg",
	},
	{
		name: "Settings",
		href: "/settings",
		icon: "/icons/settings.svg",
	},
];

export default navLinks;
