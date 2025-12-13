"use client";

import { CldImage } from "next-cloudinary";
import { FaPencilAlt } from "react-icons/fa";
import { IUser } from "@/app/models/User";

interface Props {
  user: IUser;
  isOwner: boolean | null;
  avatarPreview: string | null;
  onAvatarChange: (file: File) => void;
}

export default function ProfileHeader({
  user,
  isOwner,
  avatarPreview,
  onAvatarChange,
}: Props) {
  return (
    <div className="relative px-6 -mt-16 flex items-end gap-5">
      <div className="relative group">
        <CldImage
          src={
            avatarPreview ||
            user.avatar ||
            "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg"
          }
          alt={user.fullname}
          width={140}
          height={140}
          className="rounded-full border-4 border-white object-cover bg-white w-[100px] h-[100px]"
        />

        {isOwner && (
          <label className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition">
            <FaPencilAlt size={14} />
            <input
              type="file"
              hidden
              onChange={(e) =>
                e.target.files && onAvatarChange(e.target.files[0])
              }
            />
          </label>
        )}
      </div>

      <div className="pt-20">
        <h2 className="text-2xl font-bold">{user.fullname}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
        <p className="text-gray-400 text-sm">{user.role}</p>
      </div>
    </div>
  );
}
