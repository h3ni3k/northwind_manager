"use client";
import { login } from "@/actions/auth.actions";
import { loginSchema } from "@/actions/auth.schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
	const [state, action] = useFormState(login, { message: "" });
	const formRef = useRef<HTMLFormElement>(null);
	const form = useForm<z.output<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
			...(state.fields ?? {}),
		},
	});

	return (
		<div className="mt-10">
			<Form {...form}>
				<form
					ref={formRef}
					onSubmit={form.handleSubmit(() => formRef.current?.submit())}
					action={action}
					className="space-y-4"
				>
					<FormField
						name={"username"}
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								{/* <FormDescription>Username required to log in.</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name={"password"}
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								{/* <FormDescription>Password required to log in.</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<SubmitButton className="w-full" title={"Login"} />
				</form>
				{state?.message !== "" && (
					<p className="text-red-500">{state.message}</p>
				)}
			</Form>
		</div>
	);
}
