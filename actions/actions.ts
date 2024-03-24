"use server";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { Session, User } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function getCustomers() {
	return await db.query.customers.findMany();
}

export async function getEmployees() {
	return await db.query.employees.findMany();
}

export async function logout(): Promise<ActionResult> {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized",
		};
	}

	await lucia.invalidateSession(session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect("/login");
}

interface ActionResult {
	error: string;
}

export const validateRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const result = await lucia.validateSession(sessionId);
		try {
			// biome-ignore lint/complexity/useOptionalChain: <I don't like the short form>
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				);
			}
		} catch {}

		return result;
	},
);
