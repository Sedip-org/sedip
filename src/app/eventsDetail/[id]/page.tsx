"use client";
import "../eventsdetails.module.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import styles from "../eventsdetails.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
// Style-lar
import "swiper/css";
import "swiper/css/navigation";
// Modullar
import { Navigation } from "swiper/modules";

interface Event {
  id: string;
  name: string;
  author?: string;
  content: string;
  created_at: string;
  image: string;
  gallery?: string[] | string;
}

export default function EventsDetail() {
  const [eventItem, setEventItem] = useState<Event | null>(null);
  const [galleryArray, setGalleryArray] = useState<string[]>([]);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) fetchEvents();
  }, [id]);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching event:", error);
    } else {
      setEventItem(data);

      if (data.gallery) {
        const galleryArr =
          typeof data.gallery === "string"
            ? JSON.parse(data.gallery)
            : data.gallery;
        setGalleryArray(galleryArr);
      }
    }
  }

  if (!eventItem) return <p>Loading...</p>;

  return (
    <div className={styles["general-events-container"]}>
      {/* Başlıq */}
      <h1 className={styles["general-events-container-name"]}>
        {eventItem.name}
      </h1>

      {/* Əsas şəkil + məzmun */}
      <div className={styles["general-events-presentation"]}>
        <div className={styles["general-events-left-part"]}>
          <img
            src={eventItem.image}
            alt={eventItem.name}
            className={styles["general-events-left-part-img"]}
          />
        </div>
        <div className={styles["general-events-right-part"]}>
          <p>{eventItem.content}</p>
          <div className={styles["general-events-details"]}>
            <p className={styles["general-events-hour"]}>
              {eventItem.created_at}
            </p>
          </div>
        </div>
      </div>
      {galleryArray.length > 0 && (
        <div className={styles["general-events-gallery"]}>
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
