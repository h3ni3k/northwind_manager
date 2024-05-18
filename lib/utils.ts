import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function wait(time: number) {
	await new Promise((resolve) => setTimeout(resolve, time));
}

export function formatDate(date: Date | null) {
	const locale = getLocale();

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: "2-digit",
		day: "2-digit",
		year: "numeric",
	};
	if (!date) {
		return "";
	}

	return Intl.DateTimeFormat(locale, dateOptions).format(date);
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

function getLocale() {
	return navigator.languages?.length
		? navigator.languages[0]
		: navigator.language;
}
