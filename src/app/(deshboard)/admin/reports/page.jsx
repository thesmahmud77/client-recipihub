"use client";

import { TrashBin } from "@gravity-ui/icons";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const RecipeReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");

  // ১. ডাটা ফেচ করা
  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/recipe-reports");
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleRemoveRecipe = async (reportId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/reports-delete/${reportId}`,
        { method: "DELETE" },
      );

      const data = await res.json();

      if (res.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: data.message,
          timer: 1500,
          showConfirmButton: false,
        });
        fetchReports();
      } else {
        Swal.fire("Error", data.message || "Failed to delete", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Cannot connect to server!", "error");
    }
  };

  const handleDismissReport = async (id, newStatus) => {
    console.log(id);
    try {
      const res = await fetch(
        `http://localhost:8080/recipe-reports-update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const data = await res.json();

      if (res.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        fetchReports();
      } else {
        Swal.fire("Error", data.message || "Failed to update", "error");
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", "Something went wrong with the network!", "error");
    }
  };

  // ৪. ফিল্টারিং লজিক
  const filteredReports = reports.filter((report) => {
    const status = report.status?.toLowerCase();
    if (activeTab === "Pending") return status === "pending" || !status;
    if (activeTab === "Dismissed") return status === "dismissed";
    return true;
  });

  if (loading)
    return <div className="text-center py-20 text-sm">Loading...</div>;

  return (
    <div className="bg-[#FAF6F0] min-h-screen p-6 text-gray-800 w-[1000px]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* হেডার ও ট্যাব */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">Recipe Reports</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {
                reports.filter(
                  (r) => r.status?.toLowerCase() === "pending" || !r.status,
                ).length
              }{" "}
              pending
            </p>
          </div>

          <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-xs text-xs font-bold">
            {["Pending", "Dismissed", "All"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg cursor-pointer ${
                  activeTab === tab
                    ? "bg-orange-500 text-white"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* টেবিল */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FAF6F0]/60 text-gray-400 font-bold border-b border-gray-100">
                <th className="p-4">Recipe ID</th>
                <th className="p-4">Reporter</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Description</th>
                <th className="p-4">Reported</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReports.map((report) => (
                <tr key={report._id} className="hover:bg-gray-50/50">
                  <td className="p-4 text-gray-400 font-medium">
                    {report.recipeId}
                  </td>
                  <td className="p-4 font-semibold text-orange-600">
                    {report.reporter}
                  </td>
                  <td className="p-4">
                    <span className="bg-orange-50 text-orange-500 border border-orange-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {report.reason}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 max-w-xs truncate">
                    {report.description || "—"}
                  </td>
                  <td className="p-4 text-gray-500">
                    {report.reportedAt
                      ? new Date(report.reportedAt).toLocaleDateString("en-GB")
                      : "—"}
                  </td>
                  <td className="p-4 flex items-center justify-center gap-2 font-bold">
                    <button
                      onClick={() =>
                        handleRemoveRecipe(report._id, report.recipeId)
                      }
                      className="border border-red-200 text-red-500 px-3 py-1.5 rounded-xl hover:bg-red-50 cursor-pointer flex items-center justify-center gap-1"
                    >
                      <TrashBin></TrashBin> Remove
                    </button>
                    <button
                      onClick={() =>
                        handleDismissReport(report._id, "dismissed")
                      }
                      disabled={report.status?.toLowerCase() === "dismissed"}
                      className="border border-gray-200 text-gray-500 px-3 py-1.5 rounded-xl hover:bg-gray-50 cursor-pointer disabled:opacity-40"
                    >
                      Dismiss
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecipeReportsPage;
