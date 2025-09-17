import styles from "./goals.module.css";
export default function Goals() {
  return (
    <div className={styles["goals-container"]}>
      <div className={styles["card"]}>
        <h3 className={styles["card-title"]}>
          Sustanaible Economy:Building a Resilient Future
        </h3>
        <div className={styles["card-content"]}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Laboriosam, et accusantium! Labore voluptatem deleniti illum quod
            placeat recusandae commodi ullam tempora, a esse laborum aspernatur.
            Sapiente labore nam optio provident!
          </p>
        </div>
      </div>
      <div className={styles["card"]}>
        <h3 className={styles["card-title"]}>
          Sustanaible Economy:Building a Resilient Future
        </h3>
        <div className={styles["card-content"]}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Laboriosam, et accusantium! Labore voluptatem deleniti illum quod
            placeat recusandae commodi ullam tempora, a esse laborum aspernatur.
            Sapiente labore nam optio provident!
          </p>
        </div>
      </div>
      <div className={styles["card"]}>
        <h3 className={styles["card-title"]}>
          Sustanaible Economy:Building a Resilient Future
        </h3>
        <div className={styles["card-content"]}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Laboriosam, et accusantium!
          </p>
        </div>
      </div>
    </div>
  );
}
