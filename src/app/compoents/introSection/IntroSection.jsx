import styles from "../introSection/introSection.module.css";
export default function introSection() {
  return (
<div className={styles["intro-section-container"]}>
  <div className={styles["intro-section-description"]}>
    <div className={styles["title-wrapper"]}>
      <h1>
        Fueling Change,<br /> Empowering Communities,<br /> Inspiring Innovation
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
    <button>See Events</button>
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
