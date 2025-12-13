import { connectDB } from "@/app/libs/connectDB";
import { generateToken } from "@/app/libs/token";
import User, { IUser } from "@/app/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { fullname, email, password }: IUser = await request.json();

    switch (true) {
      case !fullname || !email || !password:
        return NextResponse.json(
          { error: "All fields are required" },
          { status: 400 }
        );
      case !validator.isEmail(email):
        return NextResponse.json(
          { error: "Invalid Email Address" },
          { status: 400 }
        );
      case password.length < 8:
        return NextResponse.json(
          { error: "The password must be at least 8 inches long" },
          { status: 400 }
        );
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const isAdmin =
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD;

    const hash = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      fullname,
      email,
      password: hash,
      role: isAdmin ? "Admin" : "user",
      bio: "Welcome to pinterest clone Website!",
    });

    const token = generateToken({
      _id: newUser._id,
      role: newUser.role,
    });

    return NextResponse.json(
      {
        success: "Register successful",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar,
          cover: newUser.cover,
          bio: newUser.bio,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "An error occurred while creating an account",
      },
      { status: 500 }
    );
  }
}
