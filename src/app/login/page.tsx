import styles from "./login.module.css";
import Link from "next/link";
export default function LogIn() {
  return (
    <div className={styles["login-general-container"]}>
      <div className={styles["login-general-container-logo-design"]}>
        <img src="/images/logo.png" alt="logo" />
        <h2>
          Sustainable<br></br> Development<br></br> Science and<br></br>{" "}
          Innovation
        </h2>
        <p></p>
      </div>
      <form className={styles["login-container"]}>
        <h1>Log In</h1>
        <p>Fill your log in details below</p>
        <div className={styles["login-container-input-details"]}>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Your Email"
            className={styles["login-container-input-detail"]}
          />
          <input
            type="password"
            name="password"
            id=""
            placeholder="Your password"
            className={styles["login-container-input-detail"]}
          />
        </div>
        <button>Log In</button>
        <p>OR</p>
        <p className={styles["login-container-check-acc"]}>
          Don`t you have an account?
        </p>
        <Link
          className={styles["login-container-register-span"]}
          href="/signin"
        >
          Register
        </Link>
        <Link
          className={styles["login-container-password-span"]}
          href="/signin"
        >
          Forgot your password
        </Link>
      </form>
    </div>
  );
}
