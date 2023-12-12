"use client";
import { useEffect, useState } from "react";
import { getCsrfToken, useSession } from "next-auth/react";
import AuthContext from "@/app/utils/authContext";

function SignInComponent() {
  const [csrfToken, setCsrfToken] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token || "");
    };

    fetchCsrfToken();
  }, []);

  if (status === "authenticated") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="p-6 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md">
          <h2 className="text-lg font-semibold text-center mb-4">
            You are already signed in!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md">
        <h2 className="text-lg font-semibold text-center mb-4">Admin Login</h2>
        <form
          id="admin-login-form"
          method="post"
          action="/api/auth/signin/email"
          className="flex flex-col gap-4"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="border rounded px-2 py-1"
          />
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

export default function SignIn() {
  return (
    <AuthContext>
      <SignInComponent />
    </AuthContext>
  );
}
