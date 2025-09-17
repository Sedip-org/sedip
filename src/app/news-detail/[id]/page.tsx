"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import styles from "../news-detail.module.css";

interface News {
  id: string;
  name: string;
  author: string;
  content: string;
  created_at: string;
  image: string;
}

export default function NewsDetail() {
  const [newsItem, setNewsItem] = useState<News | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) fetchNews();
  }, [id]);

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
    }
  }

  if (!newsItem) return <p>Loading...</p>;

  return (
    <div className={styles["general-news-container"]}>
      <h1 className={styles["general-news-container-name"]}>{newsItem.name}</h1>
      <div className={styles["general-news-presentation"]}>
        <div className={styles["general-news-left-part"]}>
          <img
            src={newsItem.image}
            alt={newsItem.name}
            className={styles["general-news-left-part-img"]}
          />
        </div>
        <div className={styles["general-news-right-part"]}>
          <h4>{newsItem.name}</h4>
          <p>{newsItem.content}</p>
          <div className={styles["general-news-details"]}>
            <p className={styles["general-news-hour"]}>{newsItem.created_at}</p>
            <p className={styles["general-news-loc"]}>{newsItem.author}</p>
          </div>
        </div>
      </div>
      <div>
        <p className={styles["general-news-additionals"]}>
          {/* Əlavə məlumat varsa buraya əlavə edə bilərsiniz */}
          Stay tuned for more updates on this breaking news.
        </p>
      </div>
    </div>
  );
}
