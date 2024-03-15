import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/providers";
import { GeistSans } from "geist/font/sans";
import { AuthProvider } from "@/Contexts/AuthContext";

export const metadata: Metadata = {
  title: "Redrum",
  description: "App Redrum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <head />
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
