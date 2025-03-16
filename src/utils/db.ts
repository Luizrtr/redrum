import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUser(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email
    },
  })
  return user
}