import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function wait(time: number) {
	await new Promise((resolve) => setTimeout(resolve, time));
}

export function formatDate(date: Date | null) {
	if (!date) {
		return "";
	}
	return date.toLocaleDateString();
}

export function formatCurrency(amount: number) {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	if (!amount) {
		return formatter.format(0);
	}
	return formatter.format(amount);
}
