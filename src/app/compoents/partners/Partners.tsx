import styles from "./partners.module.css";
export default function Partners() {
  return (
    <div className={styles["partners-container"]}>
      <h4 className={styles["partners-container-title"]}>Our Partners</h4>
      <div className={styles["partners-images"]}>
        <div className={styles["partners-image"]}>
          <img
            src="/images/partner-1.jpeg"
            alt="partner"
            className={styles["partners-img"]}
          />
        </div>
        <div className={styles["partners-image"]}>
          <img
            src="/images/partner-2.jpeg"
            alt="partner"
            className={styles["partners-img"]}
          />
        </div>
        <div className={styles["partners-image"]}>
          <img
            src="/images/partner-3.jpeg"
            alt="partner"
            className={styles["partners-img"]}
          />
        </div>
        <div className={styles["partners-image"]}>
          <img
            src="/images/partner-4.jpeg"
            alt="partner"
            className={styles["partners-img"]}
          />
        </div>
        <div className={styles["partners-image"]}>
          <img
            src="/images/partner-5.jpeg"
            alt="partner"
            className={styles["partners-img"]}
          />
        </div>
      </div>
    </div>
  );
}
