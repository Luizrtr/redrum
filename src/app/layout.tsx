import type { Metadata } from "next"
import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme/providers"
import { ThemeProvider as Theme } from "@/Contexts/Theme"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Redrum",
  description: "App Redrum",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Theme>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Theme>
      </body>
    </html>
  )
}