"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const RecipeReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending"); // Pending, Dismissed, All

  // ১. আপনার দেওয়া নতুন API এন্ডপয়েন্ট থেকে ডাটা ফেচ করা
  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/recipe-reports", {
        cache: "no-cache",
      });
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ২. রিজন অনুযায়ী ব্যাজের কালার ডাইনামিক করার লজিক
  const getReasonStyles = (reason) => {
    switch (reason) {
      case "Offensive Content":
        return "bg-red-50 text-red-500 border border-red-200";
      case "Spam":
        return "bg-orange-50 text-orange-500 border border-orange-200";
      case "Copyright Issue":
        return "bg-purple-50 text-purple-500 border border-purple-200";
      default:
        return "bg-gray-50 text-gray-500 border border-gray-200";
    }
  };

  // ৩. অ্যাকশন: Remove Recipe (ডাটাবেজ থেকে রেসিপি ও রিপোর্ট রিমুভ করবে)
  const handleRemoveRecipe = async (id, recipeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This recipe will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Remove Recipe",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `http://localhost:8080/recipe-reports/${id}?recipeId=${recipeId}`,
            {
              method: "DELETE",
            },
          );
          if (res.ok) {
            Swal.fire(
              "Removed!",
              "Recipe and report have been handled.",
              "success",
            );
            fetchReports(); // টেবিল ডাটা রিফ্রেশ
          }
        } catch (error) {
          Swal.fire("Error", "Failed to remove recipe.", "error");
        }
      }
    });
  };

  // ৪. অ্যাকশন: Dismiss Report (স্ট্যাটাস চেঞ্জ করে 'dismissed' করবে)
  const handleDismissReport = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/recipe-reports/dismiss/${id}`,
        {
          method: "PATCH",
        },
      );
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Report Dismissed",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchReports(); // টেবিল ডাটা রিফ্রেশ
      }
    } catch (error) {
      console.error("Error dismissing report:", error);
    }
  };

  // ৫. ডাটাবেজের status: "pending" বা "dismissed" ভ্যালুর ওপর বেস করে ফিল্টারিং
  const filteredReports = reports.filter((report) => {
    const status = report.status?.toLowerCase();
    if (activeTab === "Pending") return status === "pending" || !status;
    if (activeTab === "Dismissed") return status === "dismissed";
    return true; // All
  });

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6F0] min-h-screen p-6 md:p-10 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* টপ বার: টাইটেল ও ফিল্টার ট্যাব */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-950">
              Recipe Reports
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {
                reports.filter(
                  (r) => r.status?.toLowerCase() === "pending" || !r.status,
                ).length
              }{" "}
              pending reports
            </p>
          </div>

          {/* ট্যাব বাটন গ্রুপ */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200/60 shadow-xs">
            {["Pending", "Dismissed", "All"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-orange-500 text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* টেবিল লেআউট */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200/50 bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF6F0]/60 text-gray-400 text-[11px] font-extrabold uppercase tracking-wider border-b border-gray-100">
                <th className="py-4 px-5">Recipe ID</th>
                <th className="py-4 px-5">Reporter</th>
                <th className="py-4 px-5">Reason</th>

                <th className="py-4 px-5">Reported</th>
                <th className="py-4 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {filteredReports.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-400 font-medium"
                  >
                    No reports found in this section.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr
                    key={report._id}
                    className="hover:bg-gray-50/40 transition-colors"
                  >
                    {/* Recipe ID */}
                    <td className="py-4 px-5 font-medium text-gray-400 truncate max-w-[120px]">
                      {report.recipeId}
                    </td>

                    {/* Reporter */}
                    <td className="py-4 px-5 font-semibold text-orange-600/90">
                      {report.reporter}
                    </td>

                    {/* Reason Badge */}
                    <td className="py-4 px-5">
                      <span
                        className={`px-3 py-0.5 rounded-full text-[10px] font-bold ${getReasonStyles(report.reason)}`}
                      >
                        {report.reason}
                      </span>
                    </td>

                    {/* Reported Date */}
                    <td className="py-4 px-5 text-gray-500">
                      {report.reportedAt
                        ? new Date(report.reportedAt).toLocaleDateString(
                            "en-GB",
                          )
                        : "—"}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          handleRemoveRecipe(report._id, report.recipeId)
                        }
                        className="flex items-center gap-1.5 border border-red-200 text-red-500 font-bold px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <span>🗑️</span> Remove Recipe
                      </button>
                      <button
                        onClick={() => handleDismissReport(report._id)}
                        disabled={report.status?.toLowerCase() === "dismissed"}
                        className="border border-gray-200 text-gray-600 font-bold px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Dismiss
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecipeReportsPage;
