import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import { isAuthenticate } from "@/app/middlewares/isAuthenticate";
import cloudinary from "@/app/libs/cloudinary";
import streamifier from "streamifier";
import { connectDB } from "@/app/libs/connectDB";

connectDB();

async function uploadToCloudinary(file: File, folder: string) {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
}

function extractPublicId(url: string) {
  const parts = url.split("/");
  const file = parts.pop()!;
  return file.split(".")[0];
}

export async function PUT(request: NextRequest) {
  try {
    const user = await isAuthenticate(request);

    if (!user) {
      return NextResponse.json({ error: "Undocumented" }, { status: 401 });
    }

    const form = await request.formData();

    const avatar = form.get("avatar") as File | null;
    const cover = form.get("cover") as File | null;

    const updatedData: any = {};

    if (avatar) {
      if (user.avatar && user.avatar.includes("res.cloudinary.com")) {
        const oldId = extractPublicId(user.avatar);
        await cloudinary.uploader.destroy(`users/avatars/${oldId}`);
      }

      const upload: any = await uploadToCloudinary(avatar, "users/avatars");
      updatedData.avatar = upload.secure_url;
    }

    if (cover) {
      if (user.cover && user.cover.includes("res.cloudinary.com")) {
        const oldId = extractPublicId(user.cover);
        await cloudinary.uploader.destroy(`users/covers/${oldId}`);
      }

      const upload: any = await uploadToCloudinary(cover, "users/covers");
      updatedData.cover = upload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updatedData, {
      new: true,
    });

    return NextResponse.json({
      success: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while updating the profile." },
      { status: 500 }
    );
  }
}
