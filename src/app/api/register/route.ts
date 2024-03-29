import { connectMongoDB } from "@/lib/mongodb";
import User from "@/server/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Failed data sent." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const user = await User.findOne({ email }).select("_id");
    if (user) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 202 }
      );
    }

    await User.create({
      name,
      email,
      password,
      avata: "",
    }).then((response) => {
      return NextResponse.json(
        { message: "User registered - ", response },
        { status: 201 }
      );
    });

    return NextResponse.json({ message: "User failed" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
