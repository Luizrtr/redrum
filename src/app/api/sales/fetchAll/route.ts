import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Sales from "@/server/models/sales";
import "@/server/models/services";
import "@/server/models/salesStatus";

export async function GET() {
  try {    
    await connectMongoDB();
    const sales = await Sales
      .find()
      .populate('service')
      .populate('status')
      .exec();

    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while listing the sales", error },
      { status: 500 }
    );
  }
}