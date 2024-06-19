import { NextRequest, NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb"
import Services from "@/server/models/services"

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { message: "Service ID is required." },
        { status: 400 }
      )
    }

    await connectMongoDB()

    const service = await Services.findById(id)
    if (!service) {
      return NextResponse.json(
        { message: "Service not found." },
        { status: 404 }
      )
    }

    await Services.deleteOne({ _id: id })

    const services = await Services.find().populate('type').exec()
    return NextResponse.json(
      {
        services,
        message: "Service deleted successfully."
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting the service." },
      { status: 500 }
    )
  }
}
