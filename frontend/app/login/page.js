"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../lib/api";

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });

  const submit = async () => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
      <button onClick={submit}>Login</button>
    </div>
  );
}