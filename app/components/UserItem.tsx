"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { IUser } from "../models/User";

interface Props {
  user: IUser;
  isAdmin: boolean;
  onDelete: (id: string) => void;
  onClick: () => void;
}

export default function UserItem({
  user,
  isAdmin,
  onDelete,
  onClick,
}: Props) {
  return (
    <div
      className="group flex items-center justify-between gap-3
                 p-3 rounded-xl hover:bg-gray-100 transition"
    >
      <Link
        href={`/profile/${user._id}`}
        onClick={onClick}
        className="flex items-center gap-4 flex-1"
      >
        <CldImage
          src={
            user.avatar ||
            "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg"
          }
          alt={user.fullname}
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 border"
        />

        <div>
          <p className="font-semibold text-sm text-gray-800">
            {user.fullname}
          </p>
          <p className="text-xs text-gray-500">{user.role}</p>
        </div>
      </Link>

      {isAdmin && (
        <button
          onClick={() => onDelete(user._id)}
          className="text-red-500 opacity-0 group-hover:opacity-100 transition"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
}
