import "~/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import { headers } from "next/headers";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          userButtonPopoverCard: "border-1 border-gray-600/50",
        },
      }}
    >
      <html lang="en">
        <body className={`min-h-screen bg-primary selection:bg-purple ${inter.className} text-custom-white`}>
          <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
