"use server";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { lucia, validateRequest } from "@/lib/auth";
import { wait } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { loginSchema } from "./auth.schema";

export type FormState = {
	message: string;
	fields?: Record<string, string>;
};

export async function login(prevState: FormState, formData: FormData) {
	await wait(5000);

	const data = Object.fromEntries(formData);
	const parsed = loginSchema.safeParse(data);

	if (!parsed.success) {
		return {
			message: "Invalid credentials",
		};
	}

	const { username, password } = parsed.data;

	const rows = await db
		.select()
		.from(users)
		.where(eq(users.username, username));

	let foundUser = null;
	if (rows.length > 0) {
		foundUser = rows[0];
	}

	if (!foundUser) {
		return {
			message: "Invalid username or password.",
		};
	}

	const validPassword = await new Argon2id().verify(
		foundUser.hashedPassword,
		password,
	);
	if (!validPassword) {
		return {
			message: "Invalid username or password.",
			fields: parsed.data,
		};
	}
	const session = await lucia.createSession(foundUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect("/dashboard");
}

export async function logout() {
	const { session } = await validateRequest();
	if (!session) {
		redirect("/login");
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect("login");
}
