import { validateRequest } from "@/actions/actions";
import { login } from "@/actions/auth.actions";
import Form from "@/components/Form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
	const { user } = await validateRequest();
	if (user) {
		return redirect("/");
	}
	return (
		<div>
			<Form action={login}>
				<p>Create an account</p>
				<label htmlFor="username">Username</label>
				<input type="text" name="username" id="username" />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<button type="submit">Continue</button>
			</Form>
		</div>
	);
}

// async function login(_: any, formData: FormData): Promise<ActionResult> {
// 	"use server";
// 	const username = formData.get("username");

// 	if (
// 		typeof username !== "string" ||
// 		username.length < 3 ||
// 		username.length > 31 ||
// 		!/^[a-z0-9_-]+$/.test(username)
// 	) {
// 		return {
// 			error: "Invalid username",
// 		};
// 	}

// 	const password = formData.get("password");
// 	if (
// 		typeof password !== "string" ||
// 		password.length < 3 ||
// 		password.length > 255
// 	) {
// 		return {
// 			error: "Invalid password",
// 		};
// 	}

// 	const existingUser = await db.query.user.findFirst({
// 		where: (user, { eq }) => eq(user.username, username),
// 	});

// 	if (!existingUser) {
// 		return {
// 			error: "Incorrect username or password.",
// 		};
// 	}

// 	const validPassword = await new Argon2id().verify(
// 		existingUser.hashedPassword,
// 		password,
// 	);

// 	if (!validPassword) {
// 		return {
// 			error: "Invalid username or password.",
// 		};
// 	}

// 	const session = await lucia.createSession(existingUser.id, {});
// 	const sessionCookie = await lucia.createSessionCookie(session.id);
// 	cookies().set(
// 		sessionCookie.name,
// 		sessionCookie.value,
// 		sessionCookie.attributes,
// 	);
// 	return redirect("/");
// }

// interface ActionResult {
// 	error: string;
// }
