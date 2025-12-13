"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, deleteUser, me } from "@/app/libs/actions";
import Navbar from "@/app/components/Navbar";
import toast from "react-hot-toast";
import { FaBars } from "react-icons/fa";
import { IUser } from "../models/User";
import UsersSidebar from "../components/UsersSidebar";
import EmptyState from "../components/EmptyState";
import Aos from "aos";
import "aos/dist/aos.css";
export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return router.push("/login");

    me(token).then(setCurrentUser);
    getUsers(token).then(setUsers);
  }, []);

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("Delete this user?")) return;

    try {
      await deleteUser(token, id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen" data-aos="fade-up">
        <button
          className="md:hidden fixed top-20 left-4 z-50 bg-red-500 text-white p-3 rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        <div className="flex max-w-7xl mx-auto mt-6 px-3 gap-6">
          <UsersSidebar
            users={users}
            currentUser={currentUser}
            sidebarOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onDelete={handleDelete}
          />

          <EmptyState />
        </div>
      </div>
    </div>
  );
}
