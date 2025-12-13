import { connectDB } from "@/app/libs/connectDB";
import { isAuthenticate } from "@/app/middlewares/isAuthenticate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const user = await isAuthenticate(request);
    if (!user) {
      return NextResponse.json({ error: "Undocumented" }, { status: 401 });
    }

    return NextResponse.json(
      {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        cover: user.cover,
        bio: user.bio,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while fetching user data" },
      { status: 500 }
    );
  }
}
