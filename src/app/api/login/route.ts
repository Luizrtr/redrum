import { connectMongoDB } from "@/lib/mongodb";
import { createToken } from '@/lib/auth';
import User from "@/server/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

type User = {
  name: string;
  email: string;
  avatar: string;
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Failed data sent." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Email not found." },
        { status: 401 }
      );
    }

    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }
    const token = await createToken({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });

    if (!token) {
      return NextResponse.json(
        { message: "Authentication error" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred." },
      { status: 500 }
    );
  }
}