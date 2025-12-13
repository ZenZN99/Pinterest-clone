"use client";
import { IImage } from "../models/Image";
import ImageCard from "./ImageCard";



interface Props {
  images: IImage[];
  loading: boolean;
  onEdit: (img: IImage) => void;
  onDelete: (id: string) => void;
}

export default function ImagesGrid({
  images,
  loading,
  onEdit,
  onDelete,
}: Props) {
  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (images.length === 0)
    return <p className="text-gray-500">No images found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {images.map((img) => (
        <ImageCard
          key={img._id}
          image={img}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
