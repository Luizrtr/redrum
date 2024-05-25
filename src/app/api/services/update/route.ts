import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";
import ServicesTypes from "@/server/models/servicesTypes";
import Services from "@/server/models/services";

export async function PUT(req: NextRequest) {
  try {
    const { 
      id, 
      name, 
      type, 
      amount, 
      description, 
      is_enabled 
    } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { message: "Failed data sent." },
        { status: 400 }
      );
    }
  
    await connectMongoDB();
    const typeService = await ServicesTypes.findOne(
      { _id: type }).select("_id");
    const service = await Services.findOne({ _id: id });
   
    if (!typeService && !service) {
      return NextResponse.json(
        { message: "The type of service does not exist." },
        { status: 202 }
      );
    }

    service.name = name;
    service.type_id = typeService._id;
    service.amount = amount;
    service.description = description;
    service.is_enabled = is_enabled;

    await service.save();

    return NextResponse.json(
      { message: "Service updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the service." },
      { status: 500 }
    );
  }
}
