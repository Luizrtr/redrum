import { NextRequest, NextResponse } from "next/server";

type User = {
  name: string;
  email: string;
  avatar: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: "An error occurred." }, { status: 301 });
}
