"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

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
