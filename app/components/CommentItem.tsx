"use client";

import { CldImage } from "next-cloudinary";
import { IUser } from "@/app/models/User";
import { useRouter } from "next/navigation";

export interface ICommentPopulated {
  _id: string;
  content: string;
  imageId: string;
  userId: IUser;
}

export default function CommentItem({
  comment,
  currentUser,
  onEdit,
  onDelete,
}: {
  comment: ICommentPopulated;
  currentUser: IUser | null;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex gap-4 bg-white p-4 rounded-2xl shadow relative">
      <CldImage
        src={comment.userId.avatar}
        alt={comment.userId.fullname}
        width={48}
        height={48}
        className="rounded-full object-cover w-[60px] h-[60px] cursor-pointer"
        onClick={() => router.push(`/profile/${comment.userId._id}`)}
      />

      <div className="flex-1">
        <h3 className="font-semibold">{comment.userId.fullname}</h3>
        <p className="text-gray-600">{comment.content}</p>
      </div>

      {currentUser?._id === comment.userId._id && (
        <div className="absolute top-3 right-3 flex gap-3 text-sm">
          <button onClick={onEdit} className="text-yellow-500">
            Edit
          </button>
          <button onClick={onDelete} className="text-red-500">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
