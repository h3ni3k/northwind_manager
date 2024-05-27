"use client";
import { Companies } from "@/actions/companies.actions";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CompaniesSelect } from "@/db/types";

export default function CustomerSelect({
	currentCustomer,
	customers,
}: { currentCustomer: string; customers: Companies[] }) {
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
