"use client"

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { ThemeProvider } from "@/components/theme/providers"
// import { AuthProvider } from "@/Contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"

export default function Page({ session }: { session: Session }) {
  return (
    <SessionProvider session={session}>
      {/* <AuthProvider> */}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main>Hello</main>
        <Toaster />
      </ThemeProvider>
      {/* </AuthProvider> */}
    </SessionProvider>
  )
}
