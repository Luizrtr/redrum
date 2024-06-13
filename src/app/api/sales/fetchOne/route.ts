import { NextRequest, NextResponse } from "next/server"

import { connectMongoDB } from "@/lib/mongodb"
import Sales from "@/server/models/sales"

export async function PUT(req: NextRequest) {
  try {     
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { message: "Failed data sent." },
        { status: 400 }
      )
    }

    await connectMongoDB()
    const sale = await Sales
      .findById(id)
      .populate('status')
      .exec()

    if (!sale) {
      return NextResponse.json(
        { message: "The type of service does not exist." },
        { status: 202 }
      )
    }
    
    return NextResponse.json(sale, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while listing the sale: ", error},
      { status: 500 }
    )
  }
}
