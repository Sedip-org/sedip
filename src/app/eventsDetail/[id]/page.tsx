"use client";
import "../eventsdetails.module.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import styles from "../eventsdetails.module.css";
interface Event {
  id: string;
  name: string;
  author: string;
  content: string;
  created_at: string;
  image: string;
}

export default function EventsDetail() {
  const [eventItem, setEventItem] = useState<Event | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) fetchEvents();
  }, [id]);
  console.log("params:", params);
  console.log("id:", id);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching news:", error);
    } else {
      setEventItem(data);
    }
  }

  if (!eventItem) return <p>Loading...</p>;

  return (
    <>
      <div className={styles["general-events-container"]}>
        <h1 className={styles["general-events-container-name"]}>
          {eventItem.name}
        </h1>
        <div className={styles["general-events-presentation"]}>
          <div className={styles["general-events-left-part"]}>
            <img
              src={eventItem.image}
              alt={eventItem.name}
              className={styles["general-events-left-part-img"]}
            />
          </div>
          <div className={styles["general-events-right-part"]}>
            <h4>{eventItem.name}</h4>
            <p>{eventItem.content}</p>
            <div className={styles["general-events-details"]}>
              <p className={styles["general-events-hour"]}>
                {eventItem.created_at}
              </p>
            </div>
          </div>
        </div>
        <div>
          {/* <p className={styles["general-news-additionals"]}>
          Stay tuned for more updates on this breaking news.
        </p> */}
        </div>
      </div>
    </>
  );
}
