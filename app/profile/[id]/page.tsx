"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/app/components/Navbar";
import { IUser } from "@/app/models/User";
import { me, getUserById, profile, editBio } from "@/app/libs/actions";
import ProfileCover from "@/app/components/ProfileCover";
import ProfileHeader from "@/app/components/ProfileHeader";
import ProfileBio from "@/app/components/ProfileBio";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useAuth } from "@/app/context/AuthContext";
export default function ProfileUnifiedPage() {
  const params = useParams();
  const viewedUserId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const { refreshUser } = useAuth();
  const isOwner = currentUser && user && currentUser._id === user._id;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    me(token)
      .then((meRes: IUser) => {
        setCurrentUser(meRes);

        if (!viewedUserId || viewedUserId === meRes._id) {
          setUser(meRes);
          setBio(meRes.bio || "");
        } else {
          getUserById(token, viewedUserId).then((u) => {
            if (u?.error) {
              toast.error("User not found");
              router.push("/");
              return;
            }
            setUser(u);
            setBio(u.bio || "");
          });
        }
      })
      .catch(() => router.push("/login"));
  }, [viewedUserId]);

    useEffect(() => {
      Aos.init({
        duration: 800,
      })
    },[]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-t-4 border-red-500 rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow overflow-hidden" data-aos="fade-up">
        <ProfileCover
          user={user}
          isOwner={isOwner}
          coverPreview={coverPreview}
          onChange={async (file) => {
            if (!isOwner) return;
            setCoverPreview(URL.createObjectURL(file));

            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await profile(token, null, file);
            setUser(res.user);
            localStorage.setItem("user", JSON.stringify(res.user));
            toast.success("Cover updated");
            setCoverPreview(null);
          }}
        />

        <ProfileHeader
          user={user}
          isOwner={isOwner}
          avatarPreview={avatarPreview}
          onAvatarChange={async (file) => {
            if (!isOwner) return;
            setAvatarPreview(URL.createObjectURL(file));

            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await profile(token, file, null);
            setUser(res.user);
            localStorage.setItem("user", JSON.stringify(res.user));
            toast.success("Avatar updated");
            setAvatarPreview(null);
          }}
        />

        <ProfileBio
          bio={bio}
          isOwner={isOwner}
          editingBio={editingBio}
          onEdit={() => setEditingBio(true)}
          onChange={setBio}
          onSave={async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await editBio(token, bio);
            await refreshUser()
            setUser(res.user);
            localStorage.setItem("user", JSON.stringify(res.user));
            toast.success("Bio updated");
            setEditingBio(false);
          }}
        />
      </div>
    </div>
  );
}
