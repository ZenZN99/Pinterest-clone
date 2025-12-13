"use client";

import { CldImage } from "next-cloudinary";
import { IUser } from "../models/User";
import { useRouter } from "next/navigation";

export default function CommentForm({
  user,
  value,
  setValue,
  onSubmit,
  editing,
}: {
  user: IUser;
  value: string;
  setValue: (v: string) => void;
  onSubmit: () => void;
  editing: boolean;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      {/* Avatar */}
      <CldImage
        src={user.avatar}
        alt={user.fullname}
        width={48}
        height={48}
        className="rounded-full object-cover w-14 h-14 cursor-pointer"
        onClick={() => router.push(`/profile/${user._id}`)}
      />

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[red] outline-none"
        />

        <button
          onClick={onSubmit}
          className="w-full sm:w-auto bg-[red] text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap"
        >
          {editing ? "Update" : "Comment"}
        </button>
      </div>
    </div>
  );
}
