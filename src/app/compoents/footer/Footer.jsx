import styles from "./footer.module.css";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { BiLogoGmail } from "react-icons/bi";
import Link from "next/link";
export default function Footer() {
  return (
    <div className={styles["footer-general-container"]}>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-left-part"]}>
          <div className={styles["footer-logo-container"]}>
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className={styles["footer-img-logo"]}
              />
            </Link>
            <h2>Sustainable Development Science and Innovation</h2>
          </div>
          <div className={styles["footer-social-network"]}>
            <a
              href="https://www.facebook.com/profile.php?id=61581347322487"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF
                size={24}
                color="#110D57"
                className={styles["footer-icon"]}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/sedip-platform/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn
                size={24}
                color="#110D57"
                className={styles["footer-icon"]}
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
                className={styles["footer-icon"]}
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
                className={styles["footer-icon"]}
              />
            </a>
          </div>
        </div>
        <div className={styles["footer-right-part"]}>
          <div className={styles["footer-links-group"]}>
            <h3>Quick Links</h3>
            <ul className={styles["footer-links-list"]}>
              <li>
                <Link href="/" className={styles["footer-link"]}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles["footer-link"]}>
                  About us
                </Link>
              </li>
              <li>
                <Link href="/events" className={styles["footer-link"]}>
                  Events
                </Link>
              </li>
              <li>
                <Link href="/news" className={styles["footer-link"]}>
                  News
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles["footer-links-group"]}>
            <h3>Membership</h3>
            <ul className={styles["footer-links-list"]}>
              <li>
                <Link href="/login" className={styles["footer-link"]}>
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signin" className={styles["footer-link"]}>
                  Sign up
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles["footer-link"]}>
                  Contact
                </Link>
              </li>
              <li>
                {/* <Link href="/account" className={styles["footer-link"]}>
                  User Account
                </Link>
              </li>
              <li>
                <Link href="/reset-password" className={styles["footer-link"]}>
                  Reset Password
                </Link> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
