import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUser(email: string, password: Promise<string>) {
  const user = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });
  return user;
}