import type { Metadata } from "next"

import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { NextAuthProvider } from "./providers";

export const metadata: Metadata = {
  title: "Redrum",
  description: "App Redrum",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <head />
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
