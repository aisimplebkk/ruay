"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Registered (demo)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-xl p-8 shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2"
            required
          />
          <button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-2 rounded-lg mt-2">Register</button>
        </form>
        <div className="text-center mt-4">
          <span className="text-slate-600">Already have an account? </span>
          <Link href="/auth/login" className="text-purple-600 font-semibold">Login</Link>
        </div>
      </div>
    </div>
  );
} 