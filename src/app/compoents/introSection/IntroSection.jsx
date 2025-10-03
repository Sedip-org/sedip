"use client";
import styles from "../introSection/introSection.module.css";
import { useRouter } from "next/navigation";
export default function introSection() {
  const router = useRouter();
  return (
    <div className={styles["intro-section-container"]}>
      <div className={styles["intro-section-description"]}>
        <div className={styles["title-wrapper"]}>
          <h1>
            Fueling Change,
            <br /> Empowering Communities,
            <br /> Inspiring Innovation
          </h1>
          <div className={styles["intro-section-image-mobile"]}>
            <img
              src="/images/logo.png"
              className={styles["intro-section-img"]}
              alt="logo-intro"
            />
          </div>
        </div>
        <p>
          Together, we’re crafting solutions that address today’s challenges and
          build a stronger, more sustainable tomorrow.
        </p>
        <button onClick={() => router.push("/events")}>See Events</button>
      </div>
      <div className={styles["intro-section-image-desktop"]}>
        <img
          src="/images/logo.png"
          className={styles["intro-section-img"]}
          alt="logo-intro"
        />
      </div>
    </div>
  );
}
