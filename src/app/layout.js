import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: `${profile.name} — Civil Technologist, AutoCAD Expert & Frontend Developer`,
  description:
    "Portfolio of Ali Hasan — Civil Technologist (BS, University of Lahore), AutoCAD drafting expert, graphic designer, NAVTTC-certified MERN frontend developer and educator with 12+ years of experience across teaching, administration, accounting and logistics.",
  keywords: [
    "Ali Hasan",
    "Civil Technologist",
    "AutoCAD",
    "Graphic Designer",
    "Frontend Developer",
    "MERN Stack",
    "NAVTTC",
    "Faisalabad",
    "Truck Dispatcher",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Civil Technologist & Frontend Developer`,
    description:
      "AutoCAD drafting, graphic design, MERN frontend development and 5+ years of DAE Civil Technology instruction.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#0b1220"/><text y="68" x="50" text-anchor="middle" font-size="50" font-family="sans-serif" font-weight="700" fill="#38bdf8">AH</text></svg>`
          ),
      },
    ],
  },
};

export const viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
