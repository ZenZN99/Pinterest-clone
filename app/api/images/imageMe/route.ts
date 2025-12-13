import { connectDB } from "@/app/libs/connectDB";
import { isAuthenticate } from "@/app/middlewares/isAuthenticate";
import Image from "@/app/models/Image";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const user = await isAuthenticate(request);
    if (!user) {
      return NextResponse.json({ error: "Undocumented" }, { status: 401 });
    }

    const images = await Image.find({ user: user._id });
    return NextResponse.json(images);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while retrieving user-specific images" },
      { status: 500 }
    );
  }
}
