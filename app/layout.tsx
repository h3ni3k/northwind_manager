import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import "./globals.css";

const overusedGrotesk = localFont({
	src: [
		{
			path: "../public/fonts/OverusedGrotesk-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../public/fonts/OverusedGrotesk-Roman.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/OverusedGrotesk-Italic.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "../public/fonts/OverusedGrotesk-SemiBold.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../public/fonts/OverusedGrotesk-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../public/fonts/OverusedGrotesk-Roman.woff2",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-overused-grotesk",
});

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${overusedGrotesk.className}`}>{children}</body>
		</html>
	);
}
