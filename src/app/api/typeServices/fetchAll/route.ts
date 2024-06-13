import { NextResponse } from "next/server"

import { connectMongoDB } from "@/lib/mongodb"
import ServicesTypes from "@/server/models/servicesTypes"

export async function GET() {
  try {    
    await connectMongoDB()
    const types = await ServicesTypes.find().exec()

    return NextResponse.json(types, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while listing the service: ", error},
      { status: 500 }
    )
  }
}
