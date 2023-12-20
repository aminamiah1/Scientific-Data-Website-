"use client";
import React, { useState, useEffect } from "react";

type Admin = {
  id: string;
  name: string;
  email: string;
};

const AdminsPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch("/api/admin/get-admins");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setAdmins(data);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        console.error("Failed to fetch admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleDelete = async (email: string) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      const res = await fetch(`/api/admin/delete-admins`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setAdmins((prevAdmins) =>
          prevAdmins.filter((admin) => admin.email !== email)
        );
      } else {
        console.error("Error deleting admin");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Management</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-gray-600 font-medium text-left">
              Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-gray-600 font-medium text-left">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2 text-gray-600 font-medium text-left">
              Delete?
            </th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.email} className="bg-white">
              <td className="border border-gray-300 px-4 py-2 text-gray-800">
                {admin.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">
                {admin.email}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">
                <button
                  onClick={() => handleDelete(admin.email)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminsPage;
