"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import {
  createImage,
  updateImage,
  deleteImage,
  getImagesMe,
} from "@/app/libs/actions";
import ImageForm from "../components/ImageForm";
import ImagesGrid from "../components/ImagesGrid";
import { IImage } from "../models/Image";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageType, setImageType] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getImagesMe(token as string);
      setImages(data || []);
    } catch {
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchImages();
  }, []);

   useEffect(() => {
        Aos.init({
          duration: 800,
        })
      },[]);

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateImage(token as string, editingId, title, content, imageType);
        toast.success("Image updated");
      } else {
        await createImage(
          token as string,
          title,
          content,
          imageType,
          imageFile
        );
        toast.success("Image created");
      }

      resetForm();
      fetchImages();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleEdit = (img: IImage) => {
    setTitle(img.title);
    setContent(img.content);
    setImageType(img.imageType);
    setEditingId(img._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      await deleteImage(token as string, id);
      toast.success("Image deleted");
      fetchImages();
    } catch {
      toast.error("Delete failed");
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageType("");
    setImageFile(null);
    setEditingId(null);
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6" data-aos="fade-up">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Dashboard
        </h1>

        <ImageForm
          title={title}
          content={content}
          imageType={imageType}
          imageFile={imageFile}
          editing={!!editingId}
          setTitle={setTitle}
          setContent={setContent}
          setImageType={setImageType}
          setImageFile={setImageFile}
          onSubmit={handleSubmit}
        />

        <ImagesGrid
          images={images}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          
        />
      </div>
    </div>
  );
}
