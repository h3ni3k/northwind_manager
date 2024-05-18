"use server";

import { db } from "@/db/client";
import { employees } from "@/db/schema";

export async function getAllEmployees() {
	return await db.select().from(employees);
}
