"use client";

import { FaCheck, FaPencilAlt } from "react-icons/fa";

interface Props {
  bio: string;
  isOwner: boolean | null;
  editingBio: boolean;
  onEdit: () => void;
  onSave: () => void;
  onChange: (v: string) => void;
}

export default function ProfileBio({
  bio,
  isOwner,
  editingBio,
  onEdit,
  onSave,
  onChange,
}: Props) {
  return (
    <div className="p-6">
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Bio</span>

          {isOwner && !editingBio && (
            <button onClick={onEdit} className="flex items-center justify-center w-[50px] h-[50px] bg-[red] text-white rounded-full text-sm">
              <FaPencilAlt />
            </button>
          )}

          {isOwner && editingBio && (
            <button
              onClick={onSave}
              className="bg-green-600 text-white py-2 px-4 rounded-2xl text-sm flex items-center gap-1"
            >
              <FaCheck /> Save
            </button>
          )}
        </div>

        {editingBio && isOwner ? (
          <textarea
            value={bio}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 resize-none"
          />
        ) : (
          <p className="text-gray-700 text-sm whitespace-pre-line">
            {bio || "No bio yet"}
          </p>
        )}
      </div>
    </div>
  );
}
