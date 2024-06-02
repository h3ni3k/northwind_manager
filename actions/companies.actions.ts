"use server";

import {
	companySchema,
	newCompanySchema,
	updateCompanySchema,
} from "@/components/forms/companies/formSchema";
import { db } from "@/db/client";
import {
	companies,
	companyTypes,
	contacts,
	regions,
	taxStatus,
} from "@/db/schema";
import { CompaniesInsert, CompaniesSelect, ContactsSelect } from "@/db/types";
import { asc, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export type Companies = Omit<
	CompaniesSelect,
	| "companyTypeId"
	| "regionId"
	| "contactId"
	| "taxStatusId"
	| "createdAt"
	| "modifiedAt"
> & {
	companyType: {
		companyType: string;
	};
	taxStatus: {
		taxStatus: string;
	};
	region: {
		regionAbbrev: string;
	};
};

export async function getCompanyByType(
	companyTypeId: number,
): Promise<Companies[]> {
	return await db.query.companies.findMany({
		columns: {
			companyTypeId: false,
			taxStatusId: false,
			regionId: false,
			contactId: false,
			createdAt: false,
			modifiedAt: false,
		},
		with: {
			companyType: {
				columns: {
					companyType: true,
				},
			},
			taxStatus: {
				columns: {
					taxStatus: true,
				},
			},
			region: {
				columns: {
					regionAbbrev: true,
				},
			},
		},
		where:
			companyTypeId !== 0
				? eq(companies.companyTypeId, companyTypeId)
				: undefined,
	});
}

export type Company = Omit<
	CompaniesSelect,
	"contactId" | "createdAt" | "modifiedAt"
> & {
	companyType: {
		companyType: string;
	};
	taxStatus: {
		taxStatus: string;
	};
	region: {
		regionAbbrev: string;
	};
};

export async function getCompanyById(
	companyId: number,
): Promise<Company | undefined> {
	const foundCompany = await db.query.companies.findFirst({
		columns: {
			contactId: false,
			createdAt: false,
			modifiedAt: false,
		},
		with: {
			companyType: {
				columns: {
					companyType: true,
				},
			},
			taxStatus: {
				columns: {
					taxStatus: true,
				},
			},
			region: {
				columns: {
					regionAbbrev: true,
				},
			},
		},
		where: eq(companies.companyId, companyId),
	});

	if (!foundCompany) return undefined;

	return foundCompany;
}

export async function getCompanyTypes() {
	return await db.select().from(companyTypes);
}

export async function getCompanyRegions() {
	return await db.select().from(regions);
}

export async function getCompanyTaxStatus() {
	return await db.select().from(taxStatus);
}

type FormState = {
	message: string;
	fields?: Record<string, string>;
};

export async function addCompany(prev: FormState, data: FormData) {
	const formData = Object.fromEntries(data);
	const parsed = newCompanySchema.safeParse(formData);

	if (!parsed.success) {
		const fields: Record<string, string> = {};
		for (const key of Object.keys(formData)) {
			fields[key] = formData[key].toString();
		}
		return {
			message: "Failed to parse data",
			fields: fields,
		};
	}

	let created = null;
	try {
		created = await db.insert(companies).values(parsed.data).returning();
	} catch (error) {
		const fields: Record<string, string> = {};
		for (const key of Object.keys(formData)) {
			fields[key] = formData[key].toString();
		}
		return {
			message: `Failed to create company ${error}`,
			fields: fields,
		};
	}

	revalidateTag("companies");
	redirect(`/companies/${created[0].companyId}`);
}

export async function updateCompany(
	companyId: number,
	prev: FormState,
	data: FormData,
) {
	data.set("companyId", companyId.toString());
	const formData = Object.fromEntries(data);
	const parsed = updateCompanySchema.safeParse(formData);

	if (!parsed.success) {
		const fields: Record<string, string> = {};
		for (const key of Object.keys(formData)) {
			fields[key] = formData[key].toString();
		}
		return {
			message: "Failed to parse data",
			fields: fields,
		};
	}

	try {
		await db
			.update(companies)
			.set(parsed.data)
			.where(eq(companies.companyId, companyId));
	} catch (error) {
		const fields: Record<string, string> = {};
		for (const key of Object.keys(formData)) {
			fields[key] = formData[key].toString();
		}
		return {
			message: `Failed to update company ${error}`,
			fields: fields,
		};
	}

	revalidateTag("companies");
	redirect(`/companies/${companyId}`);
}

export type CompanyContacts = Omit<ContactsSelect, "createdAt" | "modifiedAt">;

export async function getCompanyContacts(
	companyId: number,
): Promise<CompanyContacts[]> {
	return await db.query.contacts.findMany({
		columns: {
			createdAt: false,
			modifiedAt: false,
		},
		where: eq(contacts.companyId, companyId),
		orderBy: asc(contacts.contactId),
	});
}
