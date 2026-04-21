"use client";

import { useState } from "react";
import API from "../../lib/api";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />

      <button onClick={submit}>Register</button>
    </div>
  );
}