import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
	return (
		<div className="w-80">
			<h1 className="text-xl text-center">Welcome to Northwind Traders</h1>
			<p className="text-center text-muted-foreground">Log in to continue</p>
			<LoginForm />
		</div>
	);
}
