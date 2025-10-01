"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./goals.module.css";

export default function GoalsSlider() {
  return (
    <div
      style={{ width: "90%", margin: "0 auto" }}
      className={styles["goals-container"]}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          0: { slidesPerView: 1 }, // 0px-dən 639px-ə qədər → 1 kart
          700: { slidesPerView: 2 }, // 640px-dən 1023px-ə qədər → 2 kart
          1200: { slidesPerView: 3 }, // 1024px-dən 1375px-ə qədər → 3 kart
          1617: { slidesPerView: 4 }, // 1376px-dən 1657px-ə qədər → 4 kart
        }}
      >
        <SwiperSlide>
          <div className={styles["card"]}>
            <h3 className={styles["card-title"]}>Sustainable Economy</h3>
            <div className={styles["card-content"]}>
              <p>
                A platform where experts meet to discuss climate change, green
                energy, and sustainable economic development. Innovative
                approaches, new business models, and ecological solutions will
                be explored.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles["card"]}>
            <h3 className={styles["card-title"]}>Green Economy</h3>
            <div className={styles["card-content"]}>
              <p>
                A sustainable economy is not only about today but also about
                tomorrow. This session will focus on clean energy, digital
                transformation, and inclusive financial opportunities.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles["card"]}>
            <h3 className={styles["card-title"]}>Technology Innovation</h3>
            <div className={styles["card-content"]}>
              <p>
                The world economy is increasingly driven by green technologies.
                Our aim is to bring together innovative approaches that benefit
                both business and society.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles["card"]}>
            <h3 className={styles["card-title"]}>Global Community</h3>
            <div className={styles["card-content"]}>
              <p>
                The economy of the future will be built on environmental
                responsibility, social justice, and technological innovation.
                Together, we can take steps toward a greener and fairer world.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
