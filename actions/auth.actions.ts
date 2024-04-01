"use server";
import { lucia, validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { loginSchema } from "./auth.schema";

export type FormState = {
	message: string;
	fields?: Record<string, string>;
};

export async function login(prevState: FormState, formData: FormData) {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const data = Object.fromEntries(formData);
	const parsed = loginSchema.safeParse(data);

	if (!parsed.success) {
		return {
			message: "Invalid credentials",
		};
	}
	console.log(data);

	const { username, password } = parsed.data;

	const existingUser = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.username, username),
	});

	console.log(existingUser);

	if (!existingUser) {
		return {
			message: "Invalid username or password.",
		};
	}
	const validPassword = await new Argon2id().verify(
		existingUser.hashedPassword,
		password,
	);
	if (!validPassword) {
		return {
			message: "Invalid username or password.",
			fields: parsed.data,
		};
	}
	const session = await lucia.createSession(existingUser.id, {});
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
	return redirect("login");
}
