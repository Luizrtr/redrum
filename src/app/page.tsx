"use client"

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { ThemeProvider } from "@/components/theme/providers"
import { ThemeProvider as Theme } from "@/Contexts/Theme"
import { Toaster } from "@/components/ui/toaster"

export default function Page({ session }: { session: Session }) {
  return (
    <SessionProvider session={session}>
      <Theme>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>Hello</main>
          <Toaster />
        </ThemeProvider>
      </Theme>
    </SessionProvider>
  )
}
