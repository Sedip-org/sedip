"use client";
import styles from "./adminLogin.module.css";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase"; // lib/supabase.ts faylından
import { useRouter } from "next/navigation";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      alert("Logged in successfully!");
      router.push("/admin");
    }
  };

  return (
    <div className={styles["login-admin-general-container"]}>
      <div className={styles["login-admin-general-container-logo-design"]}>
        <img src="/images/logo.png" alt="logo" />
        <h2>
          Sustainable
          <br /> Development
          <br /> Science and
          <br /> Innovation
        </h2>
      </div>

      <form className={styles["login-admin-container"]} onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <h2>ADMIN</h2>
        <p>Fill your log in details below</p>

        <div className={styles["login-admin-container-input-details"]}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles["login-admin-container-input-detail"]}
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles["login-admin-container-input-detail"]}
          />
        </div>

        <button type="submit">Log In</button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}
