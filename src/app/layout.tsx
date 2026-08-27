import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import ClerkZustandSyncer from "@/providers/clerk-syncer";
import QueryProvider from "@/providers/query-client-provider";
import { SnackbarProvider } from 'notistack'
import SnackBar from "@/providers/snack-bar";
import { clerkAppearance } from "@/providers/clerk-appearance";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dockyard",
  description:
    "Deploy from GitHub to servers you own, and watch every build log as it happens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark", "h-full", "antialiased", geistSans.variable, geistMono.variable, manrope.variable, "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">

        <ClerkProvider afterSignOutUrl={'/sign-in'} >
          <SnackBar>
            <QueryProvider>
              <ClerkZustandSyncer>
                {children}
              </ClerkZustandSyncer>
            </QueryProvider>
          </SnackBar>
        </ClerkProvider>
      </body>
    </html>
  );
}
