"use client";
import { useEffect, useState } from "react";
import { getImages } from "@/app/libs/actions";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { IImage } from "./models/Image";
import Aos from 'aos';
import 'aos/dist/aos.css';


export default function Home() {
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchImages = async () => {
    setLoading(true);
    const data = await getImages();
    setImages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 800,
    })
  },[]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6" data-aos="fade-up">
      <h1 className="text-3xl font-bold mb-8">All Images</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : images.length === 0 ? (
        <p className="text-gray-500">No images found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition"
              onClick={() => router.push(`/images/${img._id}`)}
            >
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-56 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{img.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{img.content}</p>
                <span className="text-gray-400 text-xs mt-2 inline-block">
                  {img.imageType}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
