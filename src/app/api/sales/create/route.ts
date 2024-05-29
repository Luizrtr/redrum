import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";
import Services from "@/server/models/services";
import Sales from "@/server/models/sales";
import SalesStatus from "@/server/models/salesStatus";

export async function POST(req: NextRequest) {
  try {
    const { 
      nameClient, 
      emailClient, 
      descriptionClient, 
      service 
    } = await req.json();

    if (!nameClient || !emailClient || !descriptionClient || !service) {
      return NextResponse.json(
        { message: "Failed data sent." },
        { status: 400 }
      );
    }
  
    await connectMongoDB();
    const serviceVerify = await Services.findOne({ _id: service }).select("_id");
   
    if (!serviceVerify) {
      return NextResponse.json(
        { message: "The type of service does not exist." },
        { status: 202 }
      );
    }

    const status = await SalesStatus.findOne({ id: 0 }).select("_id");

    const response = await Sales.create({
      name_client: nameClient,
      email_client: emailClient,
      description_client: descriptionClient,
      status,
      service
    });
  
    if (!response) {
      return NextResponse.json({ message: "Sales failed" }, { status: 400 });
    }
    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the sales." },
      { status: 500 }
    );
  }
}
