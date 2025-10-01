"use client";
import styles from "./signin.module.css";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; // burda lib/supabase faylından gəlir
import { useRouter } from "next/navigation";

export default function LogIn() {
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      setErrorMessage("You must agree to the terms.");
      return;
    }
    const { data, error } = await supabase.from("sedip-users").insert([
      {
        email,
        full_name: fullName,
        password,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      setErrorMessage(error.message);
    } else {
      alert("User added successfully!");
      router.push("/login");
    }
  };

  return (
    <div className={styles["signin-general-container"]}>
      <div className={styles["signin-general-container-logo-design"]}>
        <img src="/images/logo.png" alt="logo" />
        <h2>
          Sustainable
          <br /> Development
          <br /> Science and
          <br /> Innovation
        </h2>
      </div>

      <form className={styles["signin-container"]} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p>Fill in your register details below</p>

        <div className={styles["signin-container-input-details"]}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles["signin-container-input-detail"]}
          />

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={styles["signin-container-input-detail"]}
          />

          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles["signin-container-input-detail"]}
          />

          <label
            className={styles["signin-container-input-detail-check-acc-label"]}
          >
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I agree to the terms and conditions
          </label>
        </div>

        <button type="submit" disabled={!agreed}>
          Sign Up
        </button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

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
