import { connectDB } from "@/app/libs/connectDB";
import { isAdmin } from "@/app/middlewares/isAdmin";
import { isAuthenticate } from "@/app/middlewares/isAuthenticate";
import User from "@/app/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await isAuthenticate(request);
    if (!user) {
      return NextResponse.json({ error: "Undocumented" }, { status: 401 });
    }

    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const userById = await User.findById(id)
    if (!userById) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }
    return NextResponse.json(userById);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while fetching a user by ID" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await isAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Undocumented" });
    }

    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    return NextResponse.json({ success: "User deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while deleting a user" },
      { status: 500 }
    );
  }
}
