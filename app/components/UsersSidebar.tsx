"use client";

import { FaUsers } from "react-icons/fa";
import { IUser } from "../models/User";
import UserItem from "./UserItem";

interface Props {
  users: IUser[];
  currentUser: IUser | null;
  sidebarOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function UsersSidebar({
  users,
  currentUser,
  sidebarOpen,
  onClose,
  onDelete,
}: Props) {
  return (
    <aside
      className={`
        fixed md:static top-0 left-0 h-full md:h-auto
        w-80 bg-white/90 backdrop-blur-xl
        border-r shadow-xl z-40
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        rounded-none md:rounded-2xl
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b">
        <FaUsers className="text-red-500" />
        <h2 className="text-lg font-bold">Users</h2>
      </div>

      {/* Users */}
      <div className="p-3 space-y-2 overflow-y-auto max-h-[calc(100vh-140px)]">
        {users.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            isAdmin={currentUser?.role === "Admin"}
            onDelete={onDelete}
            onClick={onClose}
          />
        ))}
      </div>
    </aside>
  );
}
