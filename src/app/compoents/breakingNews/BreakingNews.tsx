"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter(); // <-- router
  const [news, setNews] = useState<Events[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);
    if (error) console.error("Error fetching news:", error);
    else setNews(data || []);
  }

  function getFirstTwoSentences(text: string) {
    if (!text) return "";
    const sentences = text.split(/(?<=[.!?])\s+/);
    return sentences.slice(0, 2).join(" ") + (sentences.length > 2 ? "…" : "");
  }

  return (
    <div className={styles["breaking-news-general-container"]}>
      <h3 className={styles["breaking-news-general-container-name"]}>Events</h3>

      <div className={styles["breaking-news-container"]}>
        {news[news.length - 1] && (
          <div className={styles["breaking-news-left-part"]}>
            <img
              className={styles["breaking-news-left-img"]}
              src={news[news.length - 1].image}
              alt={news[0].name}
            />
            <p className={styles["breaking-news-left-descp-main"]}>
              {news[0].name}
            </p>
            <p className={styles["breaking-news-left-descp"]}>
              {getFirstTwoSentences(news[0].content)}
            </p>
            <button
              className={styles["breaking-news-subscribe-btn"]}
              onClick={() => router.push(`/eventsDetail/${news[0].id}`)}
            >
              Read More
            </button>
          </div>
        )}
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
