"use client";
import styles from "./generalevents.module.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
interface Event {
  id: string;
  name: string;
  author: string;
  content: string;
  created_at: string;
  image: string;
}

export default function GeneralEvents() {
  const [events, SetEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching event:", error);
    } else {
      SetEvents(data || []);
    }
  }
  return (
    <div>
      <h1 className={styles["events-container-name"]}>Events</h1>
      <div className={styles["events-container"]}>
        <div className={styles["events-details"]}>
          {events.map((singleEvent) => (
            <Link
              className={styles["events-detail"]}
              key={singleEvent.id}
              href={`/eventsDetail/${singleEvent.id}`}
            >
              <img
                src={singleEvent.image}
                alt="event"
                className={styles["event-img"]}
              />
              <div className={styles["event-other-details"]}>
                <p className={styles["event-other-details-date"]}>
                  {singleEvent.created_at}
                </p>
                <button className={styles["event-other-details-btn"]}>
                  Join
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
