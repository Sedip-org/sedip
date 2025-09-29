import styles from "./presentation.module.css";
export default function Presentation() {
  return (
    <div className={styles["presentation-container"]}>
      <div className={styles["presentation-description"]}>
        <h3>Science, Innovation & Policy for a Sustainable Future</h3>
        <p>
          Together, we create solutions that address today’s challenges and
          shape a more sustainable tomorrow.
        </p>
        <button className={styles["presentation-btn"]}>See Us</button>
      </div>
      <div className={styles["presentation-image"]}>
        <div className={styles["presentation-image-left"]}>
          <img
            src="/images/first.jpg"
            alt="presentation"
            className={styles["presentation-img"]}
          />
        </div>
        <div className={styles["presentation-image-right"]}>
          <img
            src="/images/second.jpg"
            className={styles["presentation-img-right"]}
            alt="presentation-first"
          />
          <img
            src="/images/three.jpg"
            className={styles["presentation-img-right"]}
            alt="presentation-second"
          />
        </div>
      </div>
    </div>
  );
}
