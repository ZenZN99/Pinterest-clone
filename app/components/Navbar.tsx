"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { FaPlus, FaSearch, FaUsers, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?imageType=${encodeURIComponent(search.trim())}`);
    setOpenMenu(false);
  };

  if (loading) return null;

  return (
    <>
      <header className="w-full h-24 bg-white shadow-sm relative z-50">
        <div className="container mx-auto h-full flex items-center justify-between px-6 md:px-10">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={110}
              height={40}
              className="w-[150px] hover:scale-105 transition"
            />
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden min-[821px]:flex items-center w-[420px] bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-[red]"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="w-10 h-10 bg-[red] text-white rounded-full flex items-center justify-center">
              <FaSearch size={14} />
            </button>
          </form>

          {user ? (
            <div className="hidden min-[821px]:flex items-center gap-3">
              <Link
                className="bg-[red] text-white h-[50px] w-[50px] flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105"
                href="/users"
              >
                <FaUsers />
              </Link>

              <Link
                className="bg-[#ddd] text-[red] h-[50px] w-[50px] flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105"
                href="/dashboard"
              >
                <FaPlus />
              </Link>

              <CldImage
                src={user.avatar}
                alt="avatar"
                width={60}
                height={60}
                className="rounded-full border-2 border-[red] w-[60px] h-[60px] object-cover cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => router.push(`/profile/${user._id}`)}
              />

              <button
                onClick={logout}
                className="bg-[red] text-white px-5 py-2 rounded-full flex items-center gap-2 transition-all duration-300 border-2 border-[red] hover:bg-transparent hover:text-[red] font-semibold"
              >
                <MdLogout /> Logout
              </button>
            </div>
          ) : (
            <div className="hidden min-[821px]:flex gap-3">
              <Link
                href="/login"
                className="border-2 border-[red] px-5 py-2 rounded-full text-[red] transition-all duration-300 hover:bg-[red] hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-[red] px-5 py-2 rounded-full text-white transition-all duration-300 hover:bg-red-600"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={() => setOpenMenu(true)}
            className="hidden max-[830px]:block text-2xl text-[red]"
          >
            <FaBars />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/40 transition-opacity z-40 ${
          openMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpenMenu(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-xl z-50 transform transition-transform duration-300
        ${openMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 h-20 border-b">
          <Link href={`/profile/${user?._id}`}>
            <CldImage
              src={
                user?.avatar ||
                "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg"
              }
              alt="avatar"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </Link>

          <button onClick={() => setOpenMenu(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <form
            onSubmit={handleSearch}
            className="flex bg-gray-100 rounded-full px-4 py-2"
          >
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="text-[red]">
              <FaSearch />
            </button>
          </form>

          {user ? (
            <>
              <Link
                onClick={() => setOpenMenu(false)}
                href={`/profile/${user._id}`}
                className="block font-semibold"
              >
                Profile
              </Link>
              <Link
                onClick={() => setOpenMenu(false)}
                href="/users"
                className="block font-semibold"
              >
                Users
              </Link>
              <Link
                onClick={() => setOpenMenu(false)}
                href="/dashboard"
                className="block font-semibold"
              >
                Dashboard
              </Link>

              <button onClick={logout} className="text-red-500 font-semibold">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                onClick={() => setOpenMenu(false)}
                href="/login"
                className="block font-semibold"
              >
                Sign In
              </Link>
              <Link
                onClick={() => setOpenMenu(false)}
                href="/register"
                className="block font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
