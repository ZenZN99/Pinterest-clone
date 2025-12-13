import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../libs/token";
import User from "../models/User";

export async function isAuthenticate(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Undocumented" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token as string);
    if (!decoded) {
      return NextResponse.json({ error: "Token Invalid" }, { status: 401 });
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    return user;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error From Server" }, { status: 500 });
  }
}
