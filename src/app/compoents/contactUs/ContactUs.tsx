import styles from "./contact.module.css";
export default function Contact() {
  return (
    <div className={styles["contact-container-intro"]}>
      <div className={styles["contact-container"]}>
        <div className={styles["contact-container-left-part"]}>
          <div className={styles["contact-container-part"]}>
            <label
              htmlFor="email"
              className={styles["contact-container-part-label"]}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id=""
              className={styles["contact-part-input"]}
            />
          </div>
          <div className={styles["contact-container-part"]}>
            <label
              htmlFor="message"
              className={styles["contact-container-part-label"]}
            >
              Your Message
            </label>
            <textarea className={styles["contact-part-textarea"]}></textarea>
          </div>
          <span>We respect your privacy</span>
          <button className={styles["contact-btn"]}>Send Message</button>
        </div>
        <div className={styles["contact-container-right-part"]}>
          <h2>
            Your feedback is valuable to us. Share your suggestions and
            comments!
          </h2>
          <p>Get updates directly in your inbox</p>
        </div>
      </div>
    </div>
  );
}
