import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";
import SalesStatus from "@/server/models/salesStatus";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
  
    if (!name) {
      return NextResponse.json(
        { message: "Failed data sent." },
        { status: 400 }
      );
    }
  
    await connectMongoDB();
    const status = await SalesStatus.findOne({ name }).select("_id");

    if (status) {
      return NextResponse.json(
        { message: "Sales already exists." },
        { status: 202 }
      );
    }

    const response = await SalesStatus.create({
      name,
      is_enabled: true
    });
  
    if (!response) {
      return NextResponse.json({ message: "Status failed" }, { status: 400 });
    }
  
    return NextResponse.json({ message: "Status registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the status: ", error },
      { status: 500 }
    );
  }
}
