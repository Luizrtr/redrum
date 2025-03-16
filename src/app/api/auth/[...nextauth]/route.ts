import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();


const loginUserSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .email('Formato de e-mail inválido.'),
  password: z
    .string()
    .nonempty('A senha é obrigatória.')
    .min(5, 'A senha deve ter no mínimo 5 caracteres.'),
});

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers:[
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET  ?? ""
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email"},
        password: { type: "password"}
      },
      async authorize(credentials, req) {
        console.log(credentials)
        const { email, password } = loginUserSchema.parse(credentials);
        const user = await prisma.user.findUnique({
          where: { email },
        });
        
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password ?? "");

        if (!isPasswordValid) return null;

        return user;
      }
    })
  ]
})

export { handler as GET, handler as POST }