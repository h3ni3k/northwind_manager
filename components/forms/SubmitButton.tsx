"use client";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function SubmitButton({
	title,
	className,
}: { title: string; className?: string }) {
	const { pending } = useFormStatus();

	return (
		<Button
			className={cn(className)}
			type="submit"
			variant={"default"}
			disabled={pending}
		>
			{pending ? "Loading..." : title}
		</Button>
	);
}
