"use client"
import { createContext, useEffect, useState } from "react"
import { setCookie, parseCookies, destroyCookie } from "nookies"
import { useRouter } from "next/navigation"
import { GetServerSideProps } from "next"

import { api } from "@/services/api"
// import { recoverUserInformation } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

type User = {
  name: string
  email: string
  avatar: string
}

type SignInData = {
  email: string
  password: string
}

type ThemeContextType = {
  signIn: (data: SignInData) => Promise<any>
  logout: () => void
  token: string | null
  limitCharacters: (text: string, maxLength: number) => string
  tabs: string
  setTabs: React.Dispatch<React.SetStateAction<string>>
}

export const Theme = createContext({} as ThemeContextType)

export function ThemeProvider({ children }: any) {
  const cookies = parseCookies()
  const token = cookies["token_redrum"]
  const router = useRouter()
  const { toast } = useToast()
  const [tabs, setTabs] = useState<string>("signin")
  console.log("Context: ", tabs)
  async function signIn({ email, password }: SignInData) {
    return null
  }

  async function logout() {
    return null
  }

  /**
   * Limita o número de caracteres de uma string.
   * 
   * @param text - A string que será limitada.
   * @param maxLength - O número máximo de caracteres permitidos.
   * @returns A string limitada ao número máximo de caracteres especificado.
   */
  function limitCharacters(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text
    }
    return text.slice(0, maxLength)
  }

  return (
    <Theme.Provider value={{ signIn, logout, token, limitCharacters, tabs, setTabs }}>
      {children}
    </Theme.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["token_redrum"]: token } = parseCookies(ctx)
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}