"use client";
import { IImage } from "../models/Image";


export default function ImageHeader({
  image,
  onOpen,
}: {
  image: IImage;
  onOpen: () => void;
}) {
  return (
    <>
      <img
        src={image.image}
        alt={image.title}
        onClick={onOpen}
        className="w-full h-[350px] object-cover rounded-3xl shadow-lg mb-6 cursor-pointer"
      />

      <h1 className="text-3xl font-bold text-gray-800">{image.title}</h1>
      <p className="text-gray-600 mt-1">{image.content}</p>
      <span className="text-sm text-gray-400">{image.imageType}</span>
    </>
  );
}
