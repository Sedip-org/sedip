"use client";
import styles from "./breakingnews.module.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
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
    if (error) {
      console.error("Error fetching news:", error);
    } else {
      setNews(data || []);
    }
  }

  return (
    <div className={styles["breaking-news-general-container"]}>
      <h3 className={styles["breaking-news-general-container-name"]}>
        Breaking News
      </h3>
      <div className={styles["breaking-news-container"]}>
        <div className={styles["breaking-news-left-part"]}>
          <img
            className={styles["breaking-news-left-img"]}
            src="/images/breaking-news.jpg"
            alt="materials"
          />
          <p className={styles["breaking-news-left-descp-main"]}>
            Materials,Baking Soda
          </p>
          <p className={styles["breaking-news-left-descp"]}>
            Czech firefighters tackle large toxic train fire A train
            transporting benzene, a carcinogen, derailed and caught fire on
            Friday, prompting a large emergency response.
          </p>
          <button className={styles["breaking-news-subscribe-btn"]}>
            Subscribe
          </button>
        </div>

        <div className={styles["breaking-news-right-part"]}>
          {news.map((singleNews) => (
            <Link
              key={singleNews.id}
              className={styles["breaking-news-item"]}
              href={`/news-detail/${singleNews.id}`}
            >
              <div className={styles["breaking-news-left"]}>
                <img
                  src={singleNews.image}
                  alt="news"
                  className={styles["breaking-news-img"]}
                />
              </div>
              <div className={styles["breaking-news-right"]}>
                <h4>{singleNews.name}</h4>
                <p>{singleNews.content}</p>
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
