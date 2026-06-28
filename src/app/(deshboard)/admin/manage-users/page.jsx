"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ১. ইউজার ডাটা ফেচ করা
  const fetchUsers = () => {
    fetch("https://server-recipihub.vercel.app/user")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to permanently delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `https://server-recipihub.vercel.app/delete-user/${id}`,
            {
              method: "DELETE",
            },
          );

          if (res.ok) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            fetchUsers();
          } else {
            Swal.fire("Error", "Failed to delete user.", "error");
          }
        } catch (err) {
          Swal.fire(
            "Error",
            "Something went wrong with the server connection.",
            "error",
          );
        }
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRole === "All Roles" ||
      user.role?.toLowerCase() === selectedRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  // পেজিনেশন লজিক
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="bg-[#FAF7F2] min-h-screen p-6 md:p-8 text-gray-800 w-full max-w-[1200px]">
      <div className="mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Block/unblock users and manage roles
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold">Total user {users.length}</p>
          </div>
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
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {currentUsers.map((user, idx) => {
                  const isBlocked = user.status === "Blocked";
                  const isPremium =
                    user.isPremium || user.premium === "Premium";

                  return (
                    <tr
                      key={user._id || idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-100 flex-shrink-0">
                            <img
                              src={
                                user.image ||
                                "https://i.ibb.co/5GzXkwq/user-placeholder.png"
                              }
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {user.name || "Unknown"}
                            </h4>
                            <p className="text-xs text-gray-400 font-medium mt-0.5">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-xs px-3 py-1 rounded-xl font-semibold tracking-wide ${user.role?.toLowerCase() === "admin" ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-orange-50 text-orange-600 border border-orange-100"}`}
                        >
                          {user.role || "User"}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium">
                        {isPremium ? (
                          <span className="text-amber-600">👑 Premium</span>
                        ) : (
                          <span className="text-gray-400">Free</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-xl font-bold border ${isBlocked ? "bg-red-50 text-red-500 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}
                        >
                          {user.status || "Active"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500 font-medium">
                        {user.joinedDate || "12/01/2026"}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              handleToggleBlock(user._id, user.status)
                            }
                            className={`text-xs px-3 py-1.5 rounded-xl font-bold cursor-pointer ${isBlocked ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}
                          >
                            {isBlocked ? "Unblock" : "Block"}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-xs px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl font-bold cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
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
