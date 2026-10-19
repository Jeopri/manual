import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Sidebar from "@/components/sidebar";
import { getNavGroups } from "@/lib/content";
import { site } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Vercel's Geist Pixel, bundled locally (SIL OFL — see fonts/GeistPixel-OFL.txt).
const geistPixel = localFont({
  src: "./fonts/GeistPixel-Square.woff2",
  variable: "--font-geist-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Web Developer & AI Automation`,
    template: `%s — ${site.name}`,
  },
  description: site.shortBio,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Web Developer & AI Automation`,
    description: site.shortBio,
    url: site.url,
  },
};

// Runs before first paint so the saved theme applies without a flash.
// No saved choice → dark; "system" follows the OS.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||(t==="system"&&!matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.remove("dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${geistPixel.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeProvider>
          <Sidebar groups={getNavGroups()} />
          <main className="min-h-screen pt-14 lg:pl-56 lg:pt-0">
            <div className="mx-auto w-full max-w-2xl px-5 py-14 md:py-20">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
