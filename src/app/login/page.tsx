"use client";
import styles from "./login.module.css";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // `sedip-users` cədvəlindən email-ə görə user tap
  const { data, error } = await supabase
    .from("sedip-users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    setErrorMessage("User not found!");
    return;
  }

  // Hazırda sadə password müqayisəsi
  if (data.password !== password) {
    setErrorMessage("Invalid password!");
    return;
  }

  // ✅ full_name-i localStorage-a yazırıq
  localStorage.setItem("full_name", data.full_name);

  // Login uğurlu olduqda home səhifəsinə yönləndir
  router.push("/");
};

  return (
    <div className={styles["login-general-container"]}>
      <div className={styles["login-general-container-logo-design"]}>
        <img src="/images/logo.png" alt="logo" />
        <h2>
          Sustainable
          <br /> Development
          <br /> Science and
          <br /> Innovation
        </h2>
      </div>

      <form className={styles["login-container"]} onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <p>Fill your log in details below</p>

        <div className={styles["login-container-input-details"]}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles["login-container-input-detail"]}
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles["login-container-input-detail"]}
          />
        </div>

        <button type="submit">Log In</button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <p>OR</p>
        <p className={styles["login-container-check-acc"]}>
          Don`t you have an account?{" "}
          <Link
            className={styles["login-container-register-span"]}
            href="/signin"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
