import LoginForm from "@/components/forms/LoginForm";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
	// const { session } = await validateRequest();

	// if (session) {
	// 	redirect("/dashboard");
	// }

	return (
		<div className="w-80">
			<h1 className="text-xl text-center">Welcome to Northwind Traders</h1>
			<p className="text-center text-muted-foreground">Log in to continue</p>
			<LoginForm />
		</div>
	);
}
