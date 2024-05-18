"use server";
import { db } from "@/db/client";
import { companies } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllCompanies() {}

export async function getAllCustomers() {
	return await db
		.select()
		.from(companies)
		.where(eq(companies.companyTypeId, 1));
}

export async function getAllShippers() {}

export async function getAllVendors() {}
