import styles from "./resetPassword.module.css";
import Link from "next/link";
export default function ResetPassword() {
  return (
    <div className={styles["reset-general-container"]}>
      <div className={styles["reset-general-container-logo-design"]}>
        <img src="/images/logo.png" alt="logo" />
        <h2>
          Sustainable<br></br> Development<br></br> Science and<br></br>{" "}
          Innovation
        </h2>
        <p></p>
      </div>
      <form className={styles["reset-container"]}>
        <h1>Reset Password</h1>
        <p>Enter your email and we will send you a password reset link.</p>
        <div className={styles["reset-container-input-details"]}>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Your Email"
            className={styles["reset-container-input-detail"]}
          />
        </div>
        <button>Send Reset Email</button>
        <Link className={styles["reset-container-login-span"]} href="/login">
          Return to Login
        </Link>
      </form>
    </div>
  );
}
