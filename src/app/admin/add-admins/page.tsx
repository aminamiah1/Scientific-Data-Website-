"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import AuthContext from "@/app/utils/authContext";

const AddAdminForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && (!session || session.user?.role !== "admin")) {
      signIn();
    }
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || session.user?.role !== "admin") {
    return <p>You are not authorized to view this page!</p>;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/api/admin/add-admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to add admin");
    }
    setName("");
    setEmail("");
    alert("Admin added successfully");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg p-8 shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          ADD ADMIN
        </h2>
        <form onSubmit={handleSubmit} id="add-admin-form">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="mt-1 p-2 border focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ color: "black" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 p-2 border focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: "black" }}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const WrappedAddAdminForm = () => (
  <AuthContext>
    <AddAdminForm />
  </AuthContext>
);

export default WrappedAddAdminForm;
