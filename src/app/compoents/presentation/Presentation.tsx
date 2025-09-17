import styles from "./presentation.module.css";
export default function Presentation() {
  return (
    <div className={styles["presentation-container"]}>
      <div className={styles["presentation-description"]}>
        <h3>Who We Are</h3>
        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        <p>
          Together, we’re crafting solutions that address today’s challenges and
          build a stronger, more sustainable tomorrow.
        </p>
        <button className={styles["presentation-btn"]}>See Us</button>
      </div>
      <div className={styles["presentation-image"]}>
        <div className={styles["presentation-image-left"]}>
          <img
            src="/images/who-we-are.jpg"
            alt="presentation"
            className={styles["presentation-img"]}
          />
        </div>
        <div className={styles["presentation-image-right"]}>
          <img
            src="/images/who-we-are-first.jpg"
            className={styles["presentation-img-right"]}
            alt="presentation-first"
          />
          <img
            src="/images/who-we-are-second.jpg"
            className={styles["presentation-img-right"]}
            alt="presentation-second"
          />
        </div>
      </div>
    </div>
  );
}
