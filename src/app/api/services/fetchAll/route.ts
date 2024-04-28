import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";
import Services from "@/server/models/services";

export async function GET(req: NextRequest) {
  try {    
    await connectMongoDB();
    const services = await Services.find().populate('type_id').exec();

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while listing the service: ", error},
      { status: 500 }
    );
  }
}
