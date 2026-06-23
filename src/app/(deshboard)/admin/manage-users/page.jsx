"use client";

import React, { useState, useEffect } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // ১. সব ইউজার ফেচ করার ফাংশন
  const fetchUsers = () => {
    fetch("http://localhost:8080/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBlock = async (id, currentStatus) => {
    const isCurrentlyBlocked =
      currentStatus?.toLowerCase() === "blocked" ||
      currentStatus?.toLowerCase() === "inactive";

    try {
      const res = await fetch(`http://localhost:8080/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: isCurrentlyBlocked ? "active" : "inactive",
        }),
      });

      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen p-6 md:p-8 text-gray-800 w-[1000px]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Block/unblock users and manage roles
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FDFBF7] border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Premium</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Joined</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {users.map((user, idx) => {
                  const isAdmin = user.role?.toLowerCase() === "admin";
                  const isPremiumUser =
                    user.isPremium || user.membership === "premium";

                  // "blocked" অথবা "inactive" থাকলে সেটাকে ব্লক হিসেবে বিবেচনা করা হবে
                  const isBlockedUser =
                    user.status?.toLowerCase() === "blocked" ||
                    user.status?.toLowerCase() === "inactive";

                  return (
                    <tr
                      key={user._id || idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      {/* USER: ইমেজ, নাম ও ইমেইল */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {user.image || user.avatar ? (
                            <img
                              src={user.image || user.avatar}
                              alt=""
                              className="size-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="size-10 rounded-full bg-orange-100 text-[#EA580C] font-bold flex items-center justify-center uppercase text-xs">
                              {user.name?.charAt(0) || "U"}
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-gray-900 leading-tight">
                              {user.name || "User"}
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* ROLE Badge */}
                      <td className="py-4 px-6">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-xl uppercase tracking-wide ${
                            isAdmin
                              ? "bg-purple-50 text-purple-600 border border-purple-100"
                              : "bg-orange-50 text-orange-600 border border-orange-100"
                          }`}
                        >
                          {user.role || "User"}
                        </span>
                      </td>

                      {/* PREMIUM Status */}
                      <td className="py-4 px-6">
                        {isPremiumUser ? (
                          <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                            👑 Premium
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Free</span>
                        )}
                      </td>

                      {/* STATUS Badge */}
                      <td className="py-4 px-6">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium inline-block ${
                            isBlockedUser
                              ? "bg-red-50 text-red-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {isBlockedUser ? "Inactive" : "Active"}
                        </span>
                      </td>

                      {/* JOINED Date */}
                      <td className="py-4 px-6 text-xs text-gray-500">
                        {user.joined || user.joinedDate || "03/03/2025"}
                      </td>

                      {/* ACTIONS Button */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() =>
                            handleToggleBlock(user._id, user.status)
                          }
                          className={`text-xs px-4 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
                            isBlockedUser
                              ? "bg-emerald-500 text-white hover:bg-emerald-600"
                              : "bg-red-50 text-red-500 hover:bg-red-100"
                          }`}
                        >
                          {isBlockedUser ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
