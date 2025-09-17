"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`${styles["navbar-container"]} ${
        isOpen ? styles["navbar-container-active"] : ""
      }`}
    >
      <div className={styles["navbar-left-part"]}>
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="logo"
            className={styles["logo-img"]}
          />
        </Link>
        <h4 className={styles["navbar-logo-name"]}>
          Sustainable
          <br /> Development
          <br /> Science and
          <br /> Innovation
        </h4>
      </div>

      <div
        className={`${styles["navbar-part-with-btn"]} ${
          isOpen ? styles["navbar-part-with-btn-active"] : ""
        }`}
      >
        <ul
          className={`${styles["navbar-right-part"]} ${
            isOpen ? styles["navbar-right-part-active"] : ""
          }`}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About us</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/news">News</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/login">
              <button
                className={`${styles["navbar-btn"]} ${
                  isOpen ? styles["navbar-btn-active"] : ""
                }`}
              >
                Sign in
              </button>
            </Link>
          </li>
        </ul>
      </div>

      <div
        className={styles["hamburger"]}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
        }}
      >
        {isOpen ? "X" : "☰"}
      </div>
    </nav>
  );
}
