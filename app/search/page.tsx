"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getImages } from "@/app/libs/actions";
import { CldImage } from "next-cloudinary";
import { IImage } from "../models/Image";
import Navbar from "../components/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const imageType = searchParams.get("imageType");

  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch images whenever the search param changes
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const data = await getImages(imageType || undefined);
      setImages(data);
      setLoading(false);
    };

    fetchImages();
  }, [imageType]);

  // Initialize AOS animations
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6" data-aos="fade-up">
        <h1 className="text-2xl font-bold mb-6">
          Search Results
          {imageType && (
            <span className="text-gray-500 text-lg ml-2">
              for "{imageType}"
            </span>
          )}
        </h1>

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {!loading && images.length === 0 && (
          <p className="text-gray-500 text-center">No images found</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image._id}
              className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <CldImage
                src={image.image}
                alt={image.title}
                width={500}
                height={500}
                className="w-full h-[300px] object-cover cursor-pointer"
                onClick={() => router.push(`/images/${image._id}`)}
              />
              <div className="p-3">
                <h3 className="font-semibold text-gray-800">{image.title}</h3>
                <p className="text-sm text-gray-500">{image.imageType}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading search page...</p>}>
      <SearchPageContent />
    </Suspense>
  );
}
