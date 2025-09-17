import styles from "./footer.module.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
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
            <FaFacebookF
              size={24}
              color="#110D57"
              className={styles["footer-icon"]}
            />
            <FaTwitter
              size={24}
              color="#110D57"
              className={styles["footer-icon"]}
            />
            <FaLinkedinIn
              size={24}
              color="#110D57"
              className={styles["footer-icon"]}
            />
            <CiInstagram
              size={24}
              color="#110D57"
              className={styles["footer-icon"]}
            />
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
                <Link href="/services" className={styles["footer-link"]}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles["footer-link"]}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles["footer-links-group"]}>
            <h3>Membership</h3>
            <ul className={styles["footer-links-list"]}>
              <li>
                <Link href="/signin" className={styles["footer-link"]}>
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className={styles["footer-link"]}>
                  Sign up
                </Link>
              </li>
              <li>
                <Link href="/account" className={styles["footer-link"]}>
                  User Account
                </Link>
              </li>
              <li>
                <Link href="/reset-password" className={styles["footer-link"]}>
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles["footer-links-group"]}>
            <h3>Legal & Compliance</h3>
            <ul className={styles["footer-links-list"]}>
              <li>
                <Link href="/privacy-policy" className={styles["footer-link"]}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className={styles["footer-link"]}
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className={styles["footer-link"]}>
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
