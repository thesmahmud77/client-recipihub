"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const AdminOverview = () => {
  // ১. শুধুমাত্র ইউজার লিস্ট রাখার জন্য একটি স্টেট
  const [users, setUsers] = useState([]);

  // ২. পেজ লোড হওয়ার সাথে সাথে এপিআই থেকে ডেটা ফেচ করা
  useEffect(() => {
    fetch("http://localhost:8080/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        // console.log(data);
      })
      .catch((err) => console.error("Data fetch error:", err));
  }, []);

  // ৩. ফেচ করা ইউজার অ্যারে থেকে সরাসরি স্ট্যাটস হিসাব করা
  const totalUsers = users.length;
  const premiumMembers = users.filter(
    (u) => u.isPremium || u.role === "premium",
  ).length;
  const recentUsers = [...users].reverse().slice(0, 4); // সর্বশেষ ৪ জন ইউজার

  return (
    <div className="bg-[#FAF7F2] min-h-screen p-6 md:p-8 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* হেডার */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
            <p className="text-sm text-gray-500">Live platform stats</p>
          </div>
        </div>

        {/* স্ট্যাটস কার্ডস */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* কার্ড ১ */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between h-32">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {totalUsers}
              </h3>
            </div>
            <p className="text-xs text-gray-400">Live Counter</p>
          </div>

          {/* কার্ড ২ (স্ট্যাটিক বা ডিফল্ট ভ্যালু) */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between h-32">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Recipes</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">11</h3>
            </div>
            <p className="text-xs text-gray-400">Platform Total</p>
          </div>

          {/* কার্ড ৩ */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between h-32">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Premium Members
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {premiumMembers}
              </h3>
            </div>
            <p className="text-xs text-amber-600 font-medium">Pro Users</p>
          </div>

          {/* কার্ড ৪ */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between h-32">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending Reports
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">6</h3>
            </div>
            <p className="text-xs text-red-500 font-medium">Action Needed</p>
          </div>
        </div>

        {/* চার্ট ও সাম্প্রতিক ইউজারের গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* চার্ট প্লেসহোল্ডার */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex flex-col justify-between min-h-[250px]">
            <h3 className="font-bold text-gray-900 text-base">
              New Registrations
            </h3>
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 border-t pt-4">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
          </div>

          {/* সাম্প্রতিক ইউজার তালিকা */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex flex-col justify-between min-h-[250px]">
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-4">
                Recent Users
              </h3>
              <div className="space-y-3.5">
                {recentUsers.map((user, idx) => (
                  <div
                    key={user._id || idx}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {/* প্রোফাইল পিকচার বা ডিফল্ট লেটার */}
                      {user.image || user.avatar ? (
                        <img
                          src={user.image || user.avatar}
                          alt=""
                          className="size-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="size-9 rounded-full bg-orange-100 text-[#EA580C] font-bold text-xs flex items-center justify-center uppercase">
                          {user.name?.charAt(0) || "U"}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 leading-none">
                          {user.name || "User"}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {(user.isPremium || user.role === "premium") && (
                      <span className="text-amber-500">👑</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t text-center">
              <Link
                href="/admin/manage-user"
                className="text-[#EA580C] hover:text-orange-600 text-xs font-semibold"
              >
                View all users ➔
              </Link>
            </div>
          </div>
        </div>

        {/* কুইক অ্যাকশন বাটনসমূহ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <Link
            href="/admin/manage-user"
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs text-center block"
          >
            <span className="text-sm font-bold text-gray-900">
              👥 Manage Users
            </span>
          </Link>
          <Link
            href="/admin/manage-recipes"
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs text-center block"
          >
            <span className="text-sm font-bold text-gray-900">
              🍳 Manage Recipes
            </span>
          </Link>
          <Link
            href="/admin/reports"
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs text-center block"
          >
            <span className="text-sm font-bold text-gray-900">
              🚨 Review Reports
            </span>
          </Link>
          <Link
            href="/admin/transactions"
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs text-center block"
          >
            <span className="text-sm font-bold text-gray-900">
              💳 Transactions
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
