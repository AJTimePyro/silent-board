import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "Silent Board",
	description: "Silently draft your story.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={cn("h-full antialiased", "font-sans", inter.variable)}
		>
			<body className="min-h-full flex flex-col">
				{children}
				<Toaster />
			</body>
		</html>
	);
}
