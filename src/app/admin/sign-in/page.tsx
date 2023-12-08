"use client";
import { useEffect, useState } from "react";
import { getCsrfToken } from "next-auth/react";

export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token || "");
    };

    fetchCsrfToken();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md">
        <form
          method="post"
          action="/api/auth/signin/email"
          className="flex flex-col gap-4"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="flex flex-col">
            Email
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded px-2 py-1"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
