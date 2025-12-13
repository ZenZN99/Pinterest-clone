import { connectDB } from "@/app/libs/connectDB";
import { isAuthenticate } from "@/app/middlewares/isAuthenticate";
import Comment from "@/app/models/Comment";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function DELETE(
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

    const comment = await Comment.findOneAndDelete({
      _id: id,
      userId: user._id,
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: "The comment has been  successfully deleted",
      comment: comment,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while deleting a comment",
    });
  }
}

export async function PUT(
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

    const { content } = await request.json();
    if (!content) {
      return NextResponse.json({ error: "Comment content is required" });
    }

    const comment = await Comment.findOneAndUpdate(
      { _id: id, userId: user._id },
      { content },
      { new: true }
    );

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: "The comment has been  successfully edited",
      comment: comment,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while editing a comment",
    });
  }
}
