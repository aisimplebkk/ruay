"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Logged in (demo)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-xl p-8 shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2"
            required
          />
          <button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-2 rounded-lg mt-2">Login</button>
        </form>
        <div className="text-center mt-4">
          <span className="text-slate-600">Don't have an account? </span>
          <Link href="/auth/register" className="text-purple-600 font-semibold">Register</Link>
        </div>
      </div>
    </div>
  );
} 