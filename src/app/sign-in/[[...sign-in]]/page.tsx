import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import { env } from "~/env.mjs";

export const metadata: Metadata = {
  title: "Log In | Proglo Shipping",
  description: "Generated by create next app",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center">
      <SignIn afterSignInUrl={env.DOMAIN ? `https://${env.DOMAIN}/user/dashboard` : "http://localhost:3000/user/dashboard"} />
    </main>
  );
}
