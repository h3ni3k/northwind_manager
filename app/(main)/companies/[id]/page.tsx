import { getCompanyById } from "@/actions/companies.actions";
import CompanyForm from "@/components/forms/companies/CompanyForm";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function CompanyPage({ params }: { params: { id: string } }) {
	const companyId = parseInt(params.id);

	return (
		<div className="flex-1 p-4">
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
	);
}
