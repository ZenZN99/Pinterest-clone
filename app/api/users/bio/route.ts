import { connectDB } from "@/app/libs/connectDB";
import { isAuthenticate } from "@/app/middlewares/isAuthenticate";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const user = await isAuthenticate(request);
    if (!user) {
      return NextResponse.json({ error: "Undocumented" }, { status: 401 });
    }

    const { bio } = await request.json();
    if (!bio || typeof bio !== "string") {
      return NextResponse.json({ error: "Invalid Bio" }, { status: 400 });
    }

    const updateBio = await User.findOneAndUpdate(
      { _id: user._id },
      { bio },
      { new: true }
    );

    return NextResponse.json(updateBio);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while editing the bio",
    });
  }
}
