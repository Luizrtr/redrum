"use server"

import { signIn } from "next-auth/react"
import { signInSchema, signUpSchema } from '@/lib/zod'
import { PrismaClient } from '@prisma/client'
import bcryptjs from "bcryptjs"

const prisma = new PrismaClient()

export async function getUser(email: string, password: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!user) return { sucess: false, message: "User not found." }

    if (!user.password) {
      return { 
        sucess: false, 
        message: "Password is required."
      }
    }

    const isValidPassword = await bcryptjs.compare(password, user.password)

    if (!isValidPassword) {
      return { 
        sucess: false, 
        message: "Password is incorrect."
      }
    }

    return {
      sucess: true,
      data: user
    }
  } catch (error: any) {
    return {
      sucess: false,
      message: error.message
    }
  }
}

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    signInSchema.parse({ email, password })

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (response?.error) {
      return {
        success: false,
        message: response.error,
      }
    }

    return {
      success: true,
      data: response,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Email or password is incorrect.",
    }
  }
}

export async function loginWithGithub() {
  await signIn("github", {
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
  })
}

export async function register({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name: string
}) {
  try {
    signUpSchema.parse({
      email,
      password,
      name,
    })

    const user = await getUser(email, password)
    
    if (user.sucess) {
      return {
        sucess: false,
        message: "User already exists.",
      }
    }

    const hash = await bcryptjs.hash(password, 10)
    const data = await prisma.user.create({
      data: {
        email,
        password: hash,
        name
      }
    })

    return  {
      sucess: true,
      data
    }
  } catch (error: any) {
    return {
      sucess: false,
      message: error.message,
    }
  }
}