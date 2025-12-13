"use client";

import { FaTimes } from "react-icons/fa";

export default function ImageModal({
  open,
  image,
  onClose,
}: {
  open: boolean;
  image: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-black/60 hover:bg-black text-white rounded-full p-3 transition"
        aria-label="Close"
      >
        <FaTimes size={18} />
      </button>

      {/* Image */}
      <img
        src={image}
        className="max-h-[85vh] w-full object-contain rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
