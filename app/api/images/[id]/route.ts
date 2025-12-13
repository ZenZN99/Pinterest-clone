import { connectDB } from "@/app/libs/connectDB";
import { isAuthenticate } from "@/app/middlewares/isAuthenticate";
import Image from "@/app/models/Image";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{id:string}> }
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

    const image = await Image.findById(id);
    if (!image) {
      return NextResponse.json({ error: "Image not found!" }, { status: 404 });
    }

    return NextResponse.json(image);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching an image using an ID",
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{id:string}> }
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

    const {title, content , imageType} = await request.json();

    if(!title || !content || !imageType){
        return NextResponse.json({error: "All fields are required"})
    }

    const image = await Image.findOneAndUpdate(
        {_id: id, user: user._id},
        {title , content , imageType},
        {new: true}
    )

    if(!image){
        return NextResponse.json({error: "Image not found!"}, {status: 404});
    }

    return NextResponse.json(image);
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: "An error occurred while editing an image"})
  }
}


export async function DELETE(request:NextRequest, {params} : {params: Promise<{id:string}>}) {
    try {
        const user = await isAuthenticate(request);
    if (!user) {
      return NextResponse.json({ error: "Undocumented" }, { status: 401 });
    }

    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const image = await Image.findOneAndDelete(
        {_id: id, user: user._id},
        {new:true}
    )

     if(!image){
        return NextResponse.json({error: "Image not found!"}, {status: 404});
    }
    return NextResponse.json("The Image has been successfully deleted",{status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "An error occurred while deleting an image"})
    }
}