"use client"
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/components/theme/providers"
import { ThemeProvider as Theme } from "@/Contexts/Theme"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession()

  if (!session) redirect("/login")
  return (
    <Theme>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main />
        <Toaster />
      </ThemeProvider>
    </Theme>
  )
}