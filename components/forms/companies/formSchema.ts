import { z } from "zod";

export const newCompanySchema = z.object({
	companyName: z
		.string()
		.min(3, { message: "Name must be 3 characters or longer" }),
	companyTypeId: z.coerce.number(),
	businessPhone: z.string(),
	address: z.string(),
	city: z.string(),
	regionId: z.coerce.number(),
	postalCode: z.string(),
	website: z.string(),
	notes: z.optional(z.string()),
	taxStatusId: z.coerce.number(),
	contactId: z.optional(z.coerce.number()),
});

export const companySchema = z.object({
	companyId: z.number(),
	companyName: z.string(),
	companyTypeId: z.number(),
	businessPhone: z.string(),
	address: z.string(),
	city: z.string(),
	regionId: z.number(),
	postalCode: z.string(),
	website: z.string(),
	notes: z.string(),
	taxStatusId: z.number(),
	// contactId: z.number(),
});

export const updateCompanySchema = z.object({
	companyId: z.coerce.number(),
	companyName: z.string(),
	companyTypeId: z.coerce.number(),
	businessPhone: z.string(),
	address: z.string(),
	city: z.string(),
	regionId: z.coerce.number(),
	postalCode: z.string(),
	website: z.string(),
	notes: z.string(),
	taxStatusId: z.coerce.number(),
	// contactId: z.number(),
});
