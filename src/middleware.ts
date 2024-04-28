import { NextRequest, NextResponse } from "next/server";
import { recoverUserInformation } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.headers.get("Authorization");

  if (!token) {
    return NextResponse.json({ message: "Token not found" }, { status: 401 });
  }

  const verify = await recoverUserInformation(token);

  if (!verify) {
    return NextResponse.json({ message: "Token expired" }, { status: 401 });
  }

  console.log("Token válido. Acesso permitido!");
}

export const config = {
  matcher: ["/api/services/:path*", "/api/typeServices/:path*"],
};
