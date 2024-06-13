import { NextRequest, NextResponse } from "next/server"

import { connectMongoDB } from "@/lib/mongodb"
import ServicesTypes from "@/server/models/servicesTypes"
import Services from "@/server/models/services"

export async function POST(req: NextRequest) {
  try {
    const { name, type, amount, description } = await req.json()
    
    if (!name || !type || !amount || !description) {
      return NextResponse.json(
        { message: "Failed data sent." },
        { status: 400 }
      )
    }
  
    await connectMongoDB()
    const typeService = await ServicesTypes.findOne({ _id: type }).select("_id")
   
    if (!typeService) {
      return NextResponse.json(
        { message: "The type of service does not exist." },
        { status: 202 }
      )
    }
  
    const response = await Services.create({
      name,
      type: typeService,
      description,
      amount,
      is_enabled: true
    })
  
    if (!response) {
      return NextResponse.json({ message: "Service failed" }, { status: 400 })
    }
    const services = await Services.find().populate('type').exec()
    return NextResponse.json(services, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the service." },
      { status: 500 }
    )
  }
}
