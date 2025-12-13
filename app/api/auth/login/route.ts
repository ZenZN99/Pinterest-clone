import { connectDB } from "@/app/libs/connectDB";
import { generateToken } from "@/app/libs/token";
import User, { IUser } from "@/app/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email, password }: IUser = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Email not registered" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Wrong Password" }, { status: 400 });
    }

    const token = generateToken({
      _id: user._id,
      role: user.role,
    });

    return NextResponse.json(
      {
        success: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          avatar: user.avatar,
          cover: user.cover,
          bio: user.bio,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while logging in" },
      { status: 500 }
    );
  }
}
