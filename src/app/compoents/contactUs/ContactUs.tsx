"use client";
import { useRef, useState, FormEvent } from "react";
import styles from "./contact.module.css";
import emailjs from "emailjs-com";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_cnlgihr",
        "template_24o5w1q",
        form.current,
        "6-GeuAgMK2TsL5PL0"
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");

          // 2 saniyədən sonra status silinsin
          setTimeout(() => {
            setStatus("");
          }, 2000);

          form.current?.reset();
        },
        (error: any) => {
          console.error("FAILED...", error?.text || error);
          setStatus("❌ Failed to send. Please try again.");

          // Xətanı da bir müddət sonra gizlədə bilərsən, istəsən
          setTimeout(() => {
            setStatus("");
          }, 2000);
        }
      );
  };

  return (
    <div className={styles["contact-container-intro"]}>
      <div className={styles["contact-container"]}>
        <form
          className={styles["contact-container-left-part"]}
          ref={form}
          onSubmit={handleSubmit}
        >
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
              placeholder="Enter your email"
              className={styles["contact-part-input"]}
              required
            />
          </div>
          <div className={styles["contact-container-part"]}>
            <label
              htmlFor="message"
              className={styles["contact-container-part-label"]}
            >
              Your Message
            </label>
            <textarea
              name="message"
              placeholder="Your message"
              className={styles["contact-part-textarea"]}
              required
            ></textarea>
          </div>
          <span>We respect your privacy</span>
          <button className={styles["contact-btn"]} type="submit">
            Send Message
          </button>
          {/* Status mesajı yalnız boş deyilsə göstər */}
          {status && (
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>{status}</p>
          )}
        </form>

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
