"use client";

import { type CompanyContacts } from "@/actions/companies.actions";
import { CompanyOrder } from "@/actions/orders.actions";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

export default function CompanyContactsTable({
	contacts,
}: { contacts: CompanyContacts[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Id</TableHead>
					<TableHead>Last Name</TableHead>
					<TableHead>First Name</TableHead>
					<TableHead>Job Title</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Primary Phone</TableHead>
					<TableHead>Secondary Phone</TableHead>
					<TableHead>Notes</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{contacts.map((contact) => (
					<TableRow key={contact.contactId}>
						<TableCell>
							<Link href={`/orders/${contact.contactId}`}>
								{contact.contactId}
							</Link>
						</TableCell>
						<TableCell>{contact.lastName}</TableCell>
						<TableCell>{contact.firstName}</TableCell>
						<TableCell>{contact.jobTitle}</TableCell>
						<TableCell>{contact.emailAddress}</TableCell>
						<TableCell>{contact.primaryPhone}</TableCell>
						<TableCell>{contact.secondaryPhone}</TableCell>
						<TableCell>{contact.notes}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
