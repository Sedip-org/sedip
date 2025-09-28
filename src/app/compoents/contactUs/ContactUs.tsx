"use client";
import { useState } from "react";
import styles from "./contact.module.css";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    setStatus("Sending..."); // Göndərilərkən mesaj
    try {
      const res = await fetch("/api/contactUS", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("Message sent successfully!"); // Müvəffəqiyyət mesajı
        setEmail(""); // Inputu boşalt
        setMessage("");
      } else {
        setStatus("Error sending message."); // Səhv mesajı
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message."); // Səhv mesajı
    }
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles["contact-part-textarea"]}
            ></textarea>
          </div>
          <span>We respect your privacy</span>
          <button className={styles["contact-btn"]} onClick={handleSubmit}>
            Send Message
          </button>
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>{status}</p>
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
