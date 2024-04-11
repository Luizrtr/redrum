import { connectMongoDB } from "@/lib/mongodb";
import User from "@/server/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

type User = {
  name: string;
  email: string;
  avatar: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: "An error occurred." }, { status: 301 });
}
