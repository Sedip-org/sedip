"use client";
import { useRef, useState, FormEvent } from "react";
import styles from "./contactpage.module.css";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { BiLogoGmail } from "react-icons/bi";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string>("");

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_7jubtdp", // EmailJS Service ID
        "template_50zc4kp", // EmailJS Template ID
        form.current,
        "6-GeuAgMK2TsL5PL0" // EmailJS Public Key
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          e.currentTarget.reset();

  
          setTimeout(() => {
            setStatus("");
          }, 3000);
        },
        (error: any) => {
          console.error("FAILED...", error);
          setStatus("❌ Failed to send. Please try again.");

          // 3 saniyədən sonra error mesajını da sil
          setTimeout(() => {
            setStatus("");
          }, 3000);
        }
      );
  };

  return (
    <div className={styles["main-contact-container-general"]}>
      <h1 className={styles["main-contact-container-general-name"]}>
        Contact us
      </h1>
      <div className={styles["main-contact-container"]}>
        <div className={styles["main-contact-container-left-part"]}>
          <h3>Send Message</h3>
          <p>
            Get in touch with us to learn more about our initiatives, events,
            and collaboration opportunities.
          </p>

          <form
            ref={form}
            onSubmit={sendEmail}
            className={styles["main-contact-container-details"]}
          >
            <div className={styles["main-contact-container-primary-info"]}>
              <div className={styles["main-contact-container-detail"]}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className={styles["main-contact-container-detail-input"]}
                  required
                />
              </div>
              <div className={styles["main-contact-container-detail"]}>
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Enter your surname"
                  className={styles["main-contact-container-detail-input"]}
                  required
                />
              </div>
            </div>

            <div className={styles["main-contact-container-detail"]}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={styles["main-contact-container-detail-input"]}
                required
              />
            </div>

            <div className={styles["main-contact-container-detail"]}>
              <label htmlFor="message">Your message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message"
                className={styles["main-contact-container-detail-textarea"]}
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>

          {/* Status mesajı */}
          {status && (
            <p style={{ marginTop: "10px", transition: "opacity 0.3s ease" }}>
              {status}
            </p>
          )}
        </div>
        <div className={styles["main-contact-container-right-part"]}>
          <h3>Follow Us</h3>
          <p>
            Product Management Masterclass, you will learn with Sarah Johnson -
            Head of Product Customer Platform
          </p>
          <div className={styles["contact-social-network"]}>
            <a
              href="https://www.facebook.com/profile.php?id=61581347322487"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF
                size={24}
                color="#110D57"
                className={styles["contact-icon"]}
              />
            </a>

            <a
              href="https://www.linkedin.com/company/sedip-platform/?viewAsMember=truee"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn
                size={24}
                color="#110D57"
                className={styles["contact-icon"]}
              />
            </a>

            <a
              href="https://www.instagram.com/sediporg/followers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CiInstagram
                size={24}
                color="#110D57"
                className={styles["contact-icon"]}
              />
            </a>
            <a
              href="mailto:sediporg@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoGmail
                size={24}
                color="#110D57"
                className={styles["contact-icon"]}
              />
            </a>
          </div>
          <div className={styles["main-contact-container-map"]}>
            <div className={styles["map-wrapper"]}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178013.48473525443!2d49.690149090376366!3d40.39473700796155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2z0JHQsNC60YM!5e1!3m2!1sru!2saz!4v1747425121907!5m2!1sru!2saz"
                width="600"
                height="450"
                style={{ border: "0", borderRadius: "10px" }}
                loading="lazy"
                className={styles["map-frame"]}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
