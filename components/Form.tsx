"use client";
import { ReactNode } from "react";
import { useFormState } from "react-dom";

export default function Form({
	children,
	action,
}: {
	children: ReactNode;
	action: (prevState: any, formData: FormData) => Promise<ActionResult>;
}) {
	const [state, formAction] = useFormState(action, { error: null });

	return (
		<form action={formAction}>
			{children}
			<p>{state.error}</p>
		</form>
	);
}

export interface ActionResult {
	error: string | null;
}
