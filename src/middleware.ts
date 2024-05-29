import { NextRequest, NextResponse } from "next/server"
import { recoverUserInformation } from "./lib/auth"
import { cookies } from "next/headers"

const publicRoutes = ['/login', '/']
const apiPublicRoutes = ['/api/login','/api/register']

const verifyUserAPI = async (
  token: string | null | undefined, path: string
) => {
  const isPublicRoute = apiPublicRoutes.includes(path)

  if (isPublicRoute) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.json({ message: "Token not found" }, { status: 401 });
  }

  const verify = await recoverUserInformation(token);
  if (!verify) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  return NextResponse.next()
}

const verifyUserClient = async (
  req: NextRequest, token: string | null | undefined, path: string
) => {
  const isPublicRoute = publicRoutes.includes(path)

  if (isPublicRoute && !token) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  const verify = await recoverUserInformation(token);
  if (!verify) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isApiRoute = ['/api'].some(route => path.startsWith(route))
  const token = isApiRoute ? req.headers.get("Authorization") 
  : cookies().get('token_redrum')?.value

  if (isApiRoute) {
    return verifyUserAPI(token, path)
  } else {
    return verifyUserClient(req, token, path)
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/public|/login|/register).*)',
  ],
}

