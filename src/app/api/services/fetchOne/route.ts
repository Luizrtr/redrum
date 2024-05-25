import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";
import Services from "@/server/models/services";

export async function PUT(req: NextRequest) {
  try {     
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Failed data sent." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const service = await Services.findById(id).exec();

    if (!service) {
      return NextResponse.json(
        { message: "The type of service does not exist." },
        { status: 202 }
      );
    }
    
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while listing the service: ", error},
      { status: 500 }
    );
  }
}
