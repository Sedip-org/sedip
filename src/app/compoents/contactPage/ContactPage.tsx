import styles from "./contactpage.module.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";

export default function ContactPage() {
  return (
    <div className={styles["main-contact-container-general"]}>
      <h1 className={styles["main-contact-container-general-name"]}>
        Contact us
      </h1>
      <div className={styles["main-contact-container"]}>
        <div className={styles["main-contact-container-left-part"]}>
          <h3>Send Message</h3>
          <p>
            Product Management Masterclass, you will learn with Sarah Johnson -
            Head of Product Customer Platform{" "}
          </p>
          <div className={styles["main-contact-container-details"]}>
            <div className={styles["main-contact-container-primary-info"]}>
              <div className={styles["main-contact-container-detail"]}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className={styles["main-contact-container-detail-input"]}
                />
              </div>
              <div className={styles["main-contact-container-detail"]}>
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  name="surname"
                  id=""
                  placeholder="Enter your surname"
                  className={styles["main-contact-container-detail-input"]}
                />
              </div>
            </div>
            <div className={styles["main-contact-container-detail"]}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id=""
                placeholder="Enter your email"
                className={styles["main-contact-container-detail-input"]}
              />
            </div>
            <div className={styles["main-contact-container-detail"]}>
              <label htmlFor="">Your message</label>
              <textarea
                className={styles["main-contact-container-detail-textarea"]}
              >
                Your message
              </textarea>
            </div>
            <button>Submit</button>
          </div>
        </div>
        <div className={styles["main-contact-container-right-part"]}>
          <h3>Follow Us</h3>
          <p>
            Product Management Masterclass, you will learn with Sarah Johnson -
            Head of Product Customer Platform
          </p>
          <div className={styles["contact-social-network"]}>
            <FaFacebookF
              size={24}
              color="#110D57"
              className={styles["contact-icon"]}
            />
            <FaTwitter
              size={24}
              color="#110D57"
              className={styles["contact-icon"]}
            />
            <FaLinkedinIn
              size={24}
              color="#110D57"
              className={styles["contact-icon"]}
            />
            <CiInstagram
              size={24}
              color="#110D57"
              className={styles["contact-icon"]}
            />
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
