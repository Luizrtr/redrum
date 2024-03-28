import { connectMongoDB } from "@/lib/mongodb";
import User from "@/server/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { name, email, password } = await request.json();
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Failed data sent." },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email }).select("_id");
    if (user) {
      console.log(user);
      return NextResponse.json(
        { message: "User already exists." },
        { status: 201 }
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

    return NextResponse.json({ message: "User failed" }, { status: 402 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
