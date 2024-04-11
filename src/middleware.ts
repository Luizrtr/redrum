import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.headers.get("Authorization");

  if (!token) {
    return NextResponse.json({ message: "Token not found" }, { status: 401 });
  }

  if (!isValidToken(token)) {
    return NextResponse.json({ message: "Token expired" }, { status: 401 });
  }

  console.log("Token válido. Acesso permitido!");
}

function isValidToken(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, "token_redrum");

    return true;
  } catch (error) {
    console.error("Erro token JWT:", error);
    return false;
  }
}

export const config = {
  matcher: ["/api/services/:path*", "/api/types/:path*"],
};
