"use server";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { z } from "zod";

const LoginSchema = z.object({
	username: z
		.string()
		.min(3)
		.max(31)
		.regex(new RegExp(/^[a-z0-9_-]+$/)),
	password: z.string().min(6).max(255),
});

export async function login(_: any, formData: FormData): Promise<ActionResult> {
	const data = Object.fromEntries(formData);
	const result = LoginSchema.safeParse(data);

	if (!result.success) {
		return {
			error: "Invalid username or password",
		};
	}

	const { username, password } = result.data;

	// const username = formData.get("username");

	// if (
	// 	typeof username !== "string" ||
	// 	username.length < 3 ||
	// 	username.length > 31 ||
	// 	!/^[a-z0-9_-]+$/.test(username)
	// ) {
	// 	return {
	// 		error: "Invalid username",
	// 	};
	// }

	// const password = formData.get("password");
	// if (
	// 	typeof password !== "string" ||
	// 	password.length < 3 ||
	// 	password.length > 255
	// ) {
	// 	return {
	// 		error: "Invalid password",
	// 	};
	// }

	const existingUser = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.username, username),
	});

	if (!existingUser) {
		return {
			error: "Incorrect username or password.",
		};
	}

	const validPassword = await new Argon2id().verify(
		existingUser.hashedPassword,
		password,
	);

	if (!validPassword) {
		return {
			error: "Invalid username or password.",
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect("/");
}

interface ActionResult {
	error: string;
}
