"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./breakingnews.module.css";

interface Events {
  id: string;
  name: string;
  author: string;
  content: string;
  created_at: string;
  image: string;
}

export default function BreakingNews() {
  const [news, setNews] = useState<Events[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) console.error("Error fetching news:", error);
    else setNews(data || []);
  }

  // İlk 2 cümləni götür
  function getFirstTwoSentences(text: string) {
    if (!text) return "";

    // Cümlələri nöqtəyə görə ayırır, yeni sətir və boşluqları silir
    const sentences = text.split(/(?<=[.!?])\s+/);

    // İlk 2 cümləni götürür, əgər varsa "…" əlavə edir
    return sentences.slice(0, 4).join(" ") + (sentences.length > 2 ? "…" : "");
  }

  return (
    <div className={styles["breaking-news-general-container"]}>
      <h3 className={styles["breaking-news-general-container-name"]}>
        Breaking News
      </h3>

      <div className={styles["breaking-news-container"]}>
        {/* Sol hissə - ən son xəbər */}
        {news[0] && (
          <div className={styles["breaking-news-left-part"]}>
            <img
              className={styles["breaking-news-left-img"]}
              src={news[0].image}
              alt={news[0].name}
            />
            <p className={styles["breaking-news-left-descp-main"]}>
              {news[0].name}
            </p>
            <p className={styles["breaking-news-left-descp"]}>
              {getFirstTwoSentences(news[0].content)}
            </p>
            <button className={styles["breaking-news-subscribe-btn"]}>
              Subscribe
            </button>
          </div>
        )}

        {/* Sağ hissə - qalan xəbərlər */}
        <div className={styles["breaking-news-right-part"]}>
          {news.slice(1).map((singleNews) => (
            <Link
              key={singleNews.id}
              className={styles["breaking-news-item"]}
              href={`/eventsDetail/${singleNews.id}`}
            >
              <div className={styles["breaking-news-left"]}>
                <img
                  src={singleNews.image}
                  alt={singleNews.name}
                  className={styles["breaking-news-img"]}
                />
              </div>
              <div className={styles["breaking-news-right"]}>
                <h4>{singleNews.name}</h4>
                <p>{getFirstTwoSentences(singleNews.content)}</p>
                <div className={styles["breaking-news-details"]}>
                  <p className={styles["breaking-news-hour"]}>
                    {singleNews.created_at}
                  </p>
                  <p className={styles["breaking-news-loc"]}>
                    {singleNews.author}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
