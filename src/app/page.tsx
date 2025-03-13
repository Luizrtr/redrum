"use client"
import { ThemeProvider } from "@/components/theme/providers"
import { ThemeProvider as Theme } from "@/Contexts/Theme"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default async function Page() {
  return (
    <Theme>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main>
          <Button onClick={() => signIn("github", { callbackurl: "/dashboard" })
          }>SignIn Github</Button>
        </main>
        <Toaster />
      </ThemeProvider>
    </Theme>
  )
}