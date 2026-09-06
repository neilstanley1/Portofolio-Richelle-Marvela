import { Analytics } from "@vercel/analytics/next";
import {
	Geist,
	Geist_Mono,
	Open_Sans,
	Poppins,
	Merriweather,
} from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./showcase.css";
import "./project-standard.css";
import "./traffic.css";
import "./project-typography.css";
import "./car-case-fixes.css";
import { GlobalNav } from "@/src/components/global-nav";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
});
const openSans = Open_Sans({
	subsets: ["latin"],
	variable: "--font-open-sans",
});
const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
});
const merriweather = Merriweather({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-merriweather",
});

export const metadata: Metadata = {
	title: "Richelle Marvela — Software · AI · Data · Systems",
	description:
		"Richelle Marvela is a Computer Science and Mathematics student building software, intelligent systems, and data-driven products across AI, machine learning, data, cloud, and software engineering.",
	openGraph: {
		title: "Richelle Marvela — Software · AI · Data · Systems",
		description:
			"A multidisciplinary technology portfolio spanning software, AI, data, cloud, and systems.",
		type: "website",
	},
};

export const viewport: Viewport = {
	colorScheme: "light dark",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="bg-background">
			<body
				className={`${geist.variable} ${geistMono.variable} ${openSans.variable} ${poppins.variable} ${merriweather.variable} antialiased`}
			>
				<GlobalNav />
				{children}
				{process.env.NODE_ENV === "production" && <Analytics />}
			</body>
		</html>
	);
}
