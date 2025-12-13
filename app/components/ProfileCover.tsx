"use client";

import { CldImage } from "next-cloudinary";
import { IUser } from "@/app/models/User";

interface Props {
  user: IUser;
  isOwner: boolean | null;
  coverPreview: string | null;
  onChange: (file: File) => void;
}

export default function ProfileCover({
  user,
  isOwner,
  coverPreview,
  onChange,
}: Props) {
  return (
    <div className="relative h-56 bg-gray-200 group">
      {(coverPreview || user.cover) && (
        <CldImage
          src={coverPreview ?? user.cover}
          alt="cover"
          fill
          className="object-cover"
        />
      )}

      {isOwner && (
        <label className="absolute top-4 right-4 bg-white/90 px-4 py-2 rounded-full text-sm cursor-pointer shadow">
          Change Cover
          <input
            type="file"
            hidden
            onChange={(e) => e.target.files && onChange(e.target.files[0])}
          />
        </label>
      )}
    </div>
  );
}
