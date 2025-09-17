import styles from "../introSection/introSection.module.css";
export default function introSection() {
  return (
    <div className={styles["intro-section-container"]}>
      <div className={styles["intro-section-description"]}>
        <h1>
          Fueling Change,<br></br> Empowering Communities, <br></br>Inspiring
          Innovation
        </h1>
        <p>
          Together, we’re crafting solutions that address today’s challenges and
          build a stronger, more sustainable tomorrow.
        </p>
        <button>See Events</button>
      </div>
      <div className={styles["intro-section-image"]}>
        <img
          src="/images/logo.png"
          className={styles["intro-section-img"]}
          alt="logo-intro"
        />
      </div>
    </div>
  );
}
