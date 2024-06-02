import { getCompanyContacts } from "@/actions/companies.actions";
import { getCompanyOrders } from "@/actions/orders.actions";
import CompanyContactsTable from "@/components/CompanyContacts";
import CompanyOrders from "@/components/CompanyOrders";
import CompanyForm from "@/components/forms/companies/CompanyForm";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function CompanyPage({
	params,
}: { params: { id: string } }) {
	const companyId = parseInt(params.id);

	const companyOrders = await getCompanyOrders(companyId);
	const companyContacts = await getCompanyContacts(companyId);

	return (
		<div className="flex-1 p-4">
			<div className="flex flex-row space-x-8">
				<div className="w-1/2">
					<Button variant={"link"} size={"lg"} className="h-8 p-0">
						<Link
							href={"/companies"}
							className=" flex flex-row items-center justify-center"
						>
							<ArrowLeftIcon className="size-4" />
							Back
						</Link>
					</Button>
					<CompanyForm companyId={companyId} />
				</div>
				<div>
					Orders
					<CompanyOrders orders={companyOrders} />
				</div>
			</div>
			<div>
				Contacts
				<CompanyContactsTable contacts={companyContacts} />
			</div>
		</div>
	);
}
