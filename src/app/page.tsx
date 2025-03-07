"use client"

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { ThemeProvider } from "@/components/theme/providers"
import { ThemeProvider as Theme } from "@/Contexts/Theme"
import { Toaster } from "@/components/ui/toaster"
import { redirect } from "next/navigation"

export default function Page({ session }: { session: Session }) {
  if (!session) redirect("/login")
  return (
    <SessionProvider session={session}>
      <Theme>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main></main>
          <Toaster />
        </ThemeProvider>
      </Theme>
    </SessionProvider>
  )
}
