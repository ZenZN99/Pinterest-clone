import { connectDB } from "@/app/libs/connectDB";
import { isAuthenticate } from "@/app/middlewares/isAuthenticate";
import Comment from "@/app/models/Comment";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const user = await isAuthenticate(request);
    if (!user) {
      return NextResponse.json({ error: "Undocumented" }, { status: 401 });
    }
    const comments = await Comment.find().populate("userId", "fullname avatar").sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching comments",
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await isAuthenticate(request);
    if (!user) {
      return NextResponse.json({ error: "Undocumented" }, { status: 401 });
    }

    const { content, imageId } = await request.json();
    if (!content || !imageId) {
      return NextResponse.json({ error: "All fields are required" });
    }

    const newComment = await Comment.create({
      content,
      imageId,
      userId: user._id,
    });

    return NextResponse.json(
      {
        success: "Comment created successfully",
        comment: newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error while creating comment" },
      { status: 500 }
    );
  }
}
