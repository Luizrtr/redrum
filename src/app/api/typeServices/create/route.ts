import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";
import ServicesTypes from "@/server/models/servicesTypes";

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
    const typeService = await ServicesTypes.findOne({ name }).select("_id");
   
    if (typeService) {
      return NextResponse.json(
        { message: "Type service already exists." },
        { status: 202 }
      );
    }
  
    const response = await ServicesTypes.create({
      name,
      is_enabled: true
    });
  
    if (!response) {
      return NextResponse.json({ message: "Type service failed" }, { status: 400 });
    }
  
    return NextResponse.json({ message: "Type service  registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the Type service: ", error },
      { status: 500 }
    );
  }
}
