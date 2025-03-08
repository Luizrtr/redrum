import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./zod";
import { saltAndHashPassword } from "./password"
import { getUser } from "@/utils/db";

const prisma = new PrismaClient();

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
        try {
          let user = null

          const { email, password } = await signInSchema.parseAsync(credentials)
          const pwHash = saltAndHashPassword(password)

          user = await getUser(email, pwHash)
   
          if (!user) {
            throw new Error("Invalid credentials.")
          }
   
          return user
        } catch (error) {
          return error
        }
      },
    }),

  ],
});