"use client";
import React, { useState } from "react";
import { emailRegex } from "@/app/utils/const";
import { IoPersonCircle, IoLockClosed } from "react-icons/io5";

const LoginCard = () => {
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email: string | null = formData.get("username") as string | null;

    if (email && emailRegex.test(email)) {
      setError("");
      alert("You have successfully signed up.");
      window.location.reload();
    } else {
      setError("Please enter a valid email address.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full max-w-sm p-6 shadow-md rounded-lg bg-white text-center">
        <h2 className="text-2xl mb-6 text-gray-800">Admin Sign Up</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <IoPersonCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-700" />
            <input
              id="username"
              name="username"
              type="text"
              required
              className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-md text-lg text-black"
              placeholder="Email"
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <div className="relative mb-4">
            <IoLockClosed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-700" />
            <input
              id="password"
              name="password"
              type="password"
              required
              className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-md text-lg text-black"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-700 text-white text-sm py-2 px-4 w-full rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 transition duration-300 ease-in-out"
          >
            Register
          </button>
          <a
            href="/admin/sign-in"
            className="text-indigo-700 hover:text-indigo-800 text-sm mt-4 block hover:underline"
          >
            Already have an account? Click Here
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;