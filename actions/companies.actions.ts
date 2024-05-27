"use server";

import { newCompanySchema } from "@/components/forms/companies/formSchema";
import { db } from "@/db/client";
import { companies, companyTypes, regions, taxStatus } from "@/db/schema";
import { CompaniesInsert, CompaniesSelect } from "@/db/types";
import { asc, eq } from "drizzle-orm";

export type Companies = Omit<
	CompaniesSelect,
	"companyTypeId" | "regionId" | "taxStatusId" | "createdAt" | "modifiedAt"
> & {
	companyType: {
		companyType: string | null;
	} | null;
	taxStatus: {
		taxStatus: string | null;
	} | null;
	region: {
		regionAbbrev: string | null;
	} | null;
};

export async function getCompanyByType(
	companyTypeId: number,
): Promise<Companies[]> {
	return await db.query.companies.findMany({
		columns: {
			companyTypeId: false,
			taxStatusId: false,
			regionId: false,
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

export async function getCompanyTypes() {
	return await db.select().from(companyTypes);
}

export async function getCompanyRegions() {
	return await db.select().from(regions);
}

export async function getCompanyTaxStatus() {
	return await db.select().from(taxStatus);
}

export type FormState = {
	message: string;
	fields?: Record<string, string>;
};

export async function addCompany(prev: FormState, data: FormData) {
	const formData = Object.fromEntries(data);
	console.log(data, formData);

	const parsed = newCompanySchema.safeParse(formData);

	if (!parsed.success) {
		console.log("!parsed success", parsed.data);

		return {
			message: "Failed to parse data",
			fields: parsed.data,
		};
	}
	if (parsed.data.companyName.includes("x")) {
		return {
			message: "Error",
			fields: parsed.data,
		};
	}

	const createdId = await db.insert(companies).values(parsed.data).returning();
}
