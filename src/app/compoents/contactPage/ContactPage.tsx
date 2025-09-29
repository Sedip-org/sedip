"use client";

import { useRef, useState, FormEvent } from "react";
import styles from "./contactpage.module.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string>("");

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_wd39gd8", // EmailJS Service ID
        "template_40t1wcs", // EmailJS Template ID
        form.current,
        "8-FibKJW0XagsC3FV" // EmailJS Public Key
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          e.currentTarget.reset();
        },
        (error: any) => {
          console.log("FAILED...", error.text);
          setStatus("❌ Failed to send. Please try again.");
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
                name="email"
                placeholder="Enter your email"
                className={styles["main-contact-container-detail-input"]}
                required
              />
            </div>

            <div className={styles["main-contact-container-detail"]}>
              <label htmlFor="message">Your message</label>
              <textarea
                name="message"
                placeholder="Your message"
                className={styles["main-contact-container-detail-textarea"]}
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>

          {status && <p style={{ marginTop: "10px" }}>{status}</p>}
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
