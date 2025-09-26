"use client";
import styles from "./news.module.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface News {
  id: string;
  name: string;
  author: string;
  content: string;
  created_at: string;
  image: string;
}

export default function GeneralNews() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error);
    } else {
      setNews(data || []);
    }
  }

  return (
    <div>
      <h1 className={styles["main-news-container-name"]}>News</h1>
      <div className={styles["main-news-container"]}>
        <div className={styles["main-news-details"]}>
          {news.map((singleNews) => (
            <Link
              className={styles["main-news-detail"]}
              key={singleNews.id}
              href={`/news-detail/${singleNews.id}`}
            >
              {/* <img
                src={singleNews.image}
                alt="news"
                className={styles["main-news-img"]}
              />
              <div className={styles["main-news-other-details"]}>
                <p className={styles["main-news-other-details-name"]}>
                  {singleNews.name}
                </p>
                <button className={styles["main-news-other-details-btn"]}>
                  Read More
                </button>
              </div> */}
              <div className={styles["main-news-details-item"]}>
                <img
                  src={singleNews.image}
                  alt="news"
                  className={styles["main-news-img"]}
                />
                <div className={styles["main-news-details-cart-body"]}>
                  <h5 className={styles["main-news-other-details-name"]}>
                    {singleNews.name}
                  </h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
