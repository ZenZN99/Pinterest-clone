"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { IImage } from "../models/Image";

interface Props {
  image: IImage;
  onEdit: (img: IImage) => void;
  onDelete: (id: string) => void;
}

export default function ImageCard({ image, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
      <img
        src={image.image}
        alt={image.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h3 className="font-semibold text-lg">{image.title}</h3>
        <p className="text-sm text-gray-500">{image.content}</p>
        <span className="text-xs text-gray-400">{image.imageType}</span>
      </div>

      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => onEdit(image)}
          className="icon-btn bg-yellow-400"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(image._id)}
          className="icon-btn bg-red-500"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
