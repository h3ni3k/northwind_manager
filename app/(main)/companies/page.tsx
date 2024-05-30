"use client";
import { getCompanyByType } from "@/actions/companies.actions";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "@/components/data-table/columns/companies";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomersPage() {
	const [companyTypeId, setCompanyTypeId] = useState(0);

	const { data, isLoading, isError } = useQuery({
		queryFn: async () => await getCompanyByType(companyTypeId),
		queryKey: ["companies", companyTypeId],
	});

	return (
		<section className="flex-1 p-4 overflow-y-scroll">
			<div className="flex flex-row justify-between items-start mb-4">
				<div className="p-4 flex flex-row justify-center">
					Show:
					<RadioGroup
						className="flex flex-row gap-4 ml-2"
						defaultValue="0"
						onValueChange={(v) => setCompanyTypeId(Number(v))}
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="0" id="all" />
							<Label htmlFor="all">All</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="1" id="customers" />
							<Label htmlFor="customers">Customers</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="2" id="shippers" />
							<Label htmlFor="shippers">Shippers</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="3" id="Vendors" />
							<Label htmlFor="Vendors">Vendors</Label>
						</div>
					</RadioGroup>
				</div>
				<div>
					{/* 					<Button>Create labels</Button>
					<Button>Show filters</Button> */}
					<Button>
						<Link
							href={"/companies/new"}
							className="inline-flex items-center justify-center"
						>
							<PlusIcon className="size-5 mr-2" />
							New company
						</Link>
					</Button>
				</div>
			</div>
			{/* <pre>{JSON.stringify(typedCompanies[0], null, 2)}</pre> */}

			<DataTable columns={columns} data={data || []} />
		</section>
	);
}
