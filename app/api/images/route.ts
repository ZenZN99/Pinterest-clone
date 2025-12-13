import { connectDB } from "@/app/libs/connectDB";
import { isAuthenticate } from "@/app/middlewares/isAuthenticate";
import Image from "@/app/models/Image";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/app/libs/cloudinary";
import streamifier from "streamifier";
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

export async function POST(request: NextRequest) {
  try {
    const user = await isAuthenticate(request);
    if (!user) {
      return NextResponse.json({ error: "Undocumented" }, { status: 401 });
    }
    const form = await request.formData();

    const title = form.get("title") as string;
    const content = form.get("content") as string;
    const imageType = form.get("imageType") as string;
    const file = form.get("image") as File | null;

    if (!title || !content || !imageType || !file) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 3) رفع الصورة
    const uploaded: any = await uploadToCloudinary(file, "images/uploads");

    // 4) حفظ البيانات في MongoDB
    const newImage = await Image.create({
      title,
      content,
      imageType,
      image: uploaded.secure_url,
      user: user._id,
    });

    return NextResponse.json(
      { success: "Image created successfully", image: newImage },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error while creating image" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const imageType = searchParams.get("imageType");


    const query: any = {};

    if (imageType) {
      query.imageType = {
        $regex: `^${imageType}$`,
        $options: "i", // 
      };
    }

    const images = await Image.find(query).sort({ createdAt: -1 });

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while retrieving images" },
      { status: 500 }
    );
  }
}