"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import styles from "../news-detail.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
// Style-lar
import "swiper/css";
import "swiper/css/navigation";
// Modullar
import { Navigation } from "swiper/modules";

interface News {
  id: string;
  name: string;
  author: string;
  content: string;
  created_at: string;
  image: string;
  gallery?: string[] | string; // gallery üçün
}
export default function NewsDetail() {
  const [newsItem, setNewsItem] = useState<News | null>(null);
  const [galleryArray, setGalleryArray] = useState<string[]>([]);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) fetchNews();
  }, [id]);
  function linkify(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      return part;
    });
  }
  async function fetchNews() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching news:", error);
    } else {
      setNewsItem(data);

      // Gallery array-a çevirmək
      if (data.gallery) {
        const galleryArr =
          typeof data.gallery === "string"
            ? JSON.parse(data.gallery)
            : data.gallery;
        setGalleryArray(galleryArr);
      }
    }
  }

  if (!newsItem) return <p>Loading...</p>;

  return (
    <div className={styles["general-news-container"]}>
      {/* Başlıq */}
      <h1 className={styles["general-news-container-name"]}>{newsItem.name}</h1>

      {/* Əsas şəkil */}
      <div className={styles["general-news-main-image"]}>
        <img
          src={newsItem.image}
          alt={newsItem.name}
          className={styles["general-news-main-img"]}
        />
      </div>

      {/* Mətn */}
      <div className={styles["general-news-content"]}>
        <p>{linkify(newsItem.content)}</p>
        <p className={styles["general-news-author"]}>
          Author: {newsItem.author}
        </p>
        <p className={styles["general-news-date"]}>
          Date: {newsItem.created_at}
        </p>
      </div>

      {/* Gallery slider */}
      {galleryArray.length > 0 && (
        <div className={styles["general-news-gallery"]}>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={3}
          >
            {galleryArray.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`gallery ${idx}`}
                  className={styles["gallery-img"]}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
