"use client";
import { CompaniesSelect } from "@/db/types";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export default function CustomerSelect({
	currentCustomer,
	customers,
}: { currentCustomer: string; customers: CompaniesSelect[] }) {
	console.log(customers.length);

	return (
		<Select>
			<SelectTrigger>
				<SelectValue placeholder={currentCustomer} />
			</SelectTrigger>
			<SelectContent>
				{customers.map((customer) => {
					return (
						<SelectItem key={customer.companyId} value={customer.companyName}>
							{customer.companyName}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
