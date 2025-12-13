import { NextRequest, NextResponse } from "next/server";
import { isAuthenticate } from "./isAuthenticate";
import User from "../models/User";

export async function isAdmin(req: NextRequest) {
  const auth = await isAuthenticate(req);

  if (!auth) {
    return NextResponse.json({ error: "Undocumented" }, { status: 401 });
  }

  const { user } = auth;

  const foundUser = await User.findById(user._id);

  if (!foundUser) {
    return NextResponse.json({ error: "User not found!" }, { status: 404 });
  }

  if (foundUser.role !== "Admin") {
    return NextResponse.json({ error: "Admin access only" }, { status: 403 });
  }

  return { user: foundUser };
}
