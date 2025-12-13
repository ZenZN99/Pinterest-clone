"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getImageById,
  getComments,
  createComment,
  deleteComment,
  updateComment,
  me,
} from "@/app/libs/actions";
import toast from "react-hot-toast";
import Navbar from "@/app/components/Navbar";

import ImageHeader from "@/app/components/ImageHeader";
import CommentsSection from "@/app/components/CommentsSection";
import ImageModal from "@/app/components/ImageModal";
import { IImage } from "@/app/models/Image";
import { IComment } from "@/app/models/Comment";
import { IUser } from "@/app/models/User";
import Aos from "aos";
import "aos/dist/aos.css";

export default function ImageDetailsPage() {
  const { id } = useParams();
  const imageId = id as string;
  const router = useRouter();

  const [image, setImage] = useState<IImage | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
      Aos.init({
        duration: 800,
      });
    }, []);


  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      toast.error("You must log in first");
      router.push("/login");
      return;
    }

    
    const load = async () => {
      try {
        const [user, img, comms] = await Promise.all([
          me(token),
          getImageById(token, imageId),
          getComments(token),
        ]);

        setCurrentUser(user);
        setImage(img);
        setComments(comms.filter((c: any) => c.imageId === imageId));
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [imageId]);

  const refreshComments = async () => {
    if (!token) return;
    const data = await getComments(token);
    setComments(data.filter((c: any) => c.imageId === imageId));
  };

  if (loading || !image) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-t-4 border-red-500 rounded-full animate-spin" />
      </div>
    );
  }


  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-6" data-aos="fade-up">
        <ImageHeader image={image} onOpen={() => setModalOpen(true)} />

        <CommentsSection
          comments={comments}
          currentUser={currentUser}
          onCreate={createComment}
          onUpdate={updateComment}
          onDelete={deleteComment}
          refresh={refreshComments}
          imageId={imageId}
          token={token!}
        />
      </div>

      <ImageModal
        open={modalOpen}
        image={image.image}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
