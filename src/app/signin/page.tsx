"use client";
import styles from "./signin.module.css";
import { useState } from "react";
import Link from "next/link";
export default function LogIn() {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed) {
      alert("Form submitted!");
    }
  };
  return (
    <div className={styles["signin-general-container"]}>
      <div className={styles["signin-general-container-logo-design"]}>
        <img src="/images/logo.png" alt="logo" />
        <h2>
          Sustainable<br></br> Development<br></br> Science and<br></br>{" "}
          Innovation
        </h2>
        <p></p>
      </div>
      <form className={styles["signin-container"]} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p>Fill in your register details below</p>
        <div className={styles["signin-container-input-details"]}>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Your Email"
            className={styles["signin-container-input-detail"]}
          />
          <input
            type="text"
            name="text"
            id=""
            placeholder="Full Name"
            className={styles["signin-container-input-detail"]}
          />
          <input
            type="password"
            name="password"
            id=""
            placeholder="Your password"
            className={styles["signin-container-input-detail"]}
          />
          <label
            className={styles["signin-container-input-detail-check-acc-label"]}
          >
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I agree to the terms and conditions
          </label>
        </div>
        <button type="submit" disabled={!agreed}>
          Sign Up
        </button>
        <p>OR</p>
        <p className={styles["signin-container-check-acc"]}>
          Already have an account?
          <Link
            href="/login"
            className={styles["signin-container-input-detail-login-link"]}
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
