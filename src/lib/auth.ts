import NextAuth, { User } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GitHubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { v4 as uuid } from "uuid"
import { encode as defaultEncode } from "next-auth/jwt"
import { signInSchema } from "./zod"
import { getUser } from "@/server/actions/user.actions"
import { prisma as db } from "../../prisma/prisma"

const prisma = new PrismaClient()
const adapter = PrismaAdapter(db)

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
          const { email, password } = await signInSchema.parseAsync(credentials)
          const response = await getUser(email, password)

          if (response.sucess) {
            return response.data as User
          }

          return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true
      }
      return token
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid()

        if (!params.token.sub) {
          throw new Error("No user ID found in token")
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        })

        if (!createdSession) {
          throw new Error("Failed to create session")
        }

        return sessionToken
      }
      return defaultEncode(params)
    },
  },
  pages: {
    signIn: "/login",
  }
})