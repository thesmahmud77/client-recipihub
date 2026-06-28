"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "@/lib/auth-client";
import Swal from "sweetalert2";

const ReportRecipePage = ({ recipe }) => {
  // ডামি ডাটা (যদি মেইন recipe প্রপ্স থেকে কোনো ডাটা না আসে তবে এটি ফলব্যাক হিসেবে কাজ করবে)
  const activeRecipe = recipe || {
    _id: "00000001",
    recipeName: "Lemon Herb Roast Chicken",
    recipeImage: "https://placehold.co/600x400",
    category: "Dinner",
    authorName: "Sophia Lin",
    authorEmail: "sophia@example.com",
  };

  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    if (!userEmail) {
      Swal.fire({
        icon: "warning",
        title: "Please Login First",
        // text: "রিপোর্ট করতে প্রথমে লগইন করুন।",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    setSubmitting(true);

    const reportData = {
      recipeId: activeRecipe._id,
      recipeName: activeRecipe.recipeName,
      recipeImage: activeRecipe.recipeImage,
      category: activeRecipe.category,
      authorEmail: activeRecipe.authorEmail,
      reporter: userEmail,
      reason: formData.reason,
      description: formData.description,
      reportedAt: new Date(),
      status: "pending",
    };
    console.log(reportData);

    try {
      const res = await fetch(
        "https://server-recipihub.vercel.app/report-recipe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reportData),
        },
      );

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Report Submited",
          text: "Your Reports Transfer to the Admin",
          timer: 2000,
          confirmButtonColor: "#f97316",
        });
        reset();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Report Not Submited",
          confirmButtonColor: "#f59e0b",
        });
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* টপ হেডার */}
        <div className="border-b border-gray-200/60 pb-5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <span>⚠️</span> Report Recipe Section
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review the details on the left and submit your report using the form
            on the right.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: Report Recipe Details (40% width on desktop) */}
          <div className="md:col-span-5 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs">
            <div className="relative h-56 bg-gray-100">
              <img
                src={activeRecipe.recipeImage}
                alt={activeRecipe.recipeName || "Recipe Image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400";
                }}
              />
              {activeRecipe.category && (
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {activeRecipe.category}
                </span>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Recipe ID: #{activeRecipe._id}
                </span>
                <h3 className="font-extrabold text-gray-900 text-lg md:text-xl">
                  {activeRecipe.recipeName}
                </h3>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Author Name:</span>
                  <span className="font-semibold text-gray-800">
                    {activeRecipe.authorName || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Author Email:</span>
                  <span className="font-semibold text-gray-800 text-xs">
                    {activeRecipe.authorEmail || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Reporting Form (60% width on desktop) */}
          <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Specify the Issue
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Please select an appropriate reason and describe the issue
                comprehensively.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* ড্রপডাউন সিলেক্ট ফিল্ড */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Reason for Report
                </label>
                <select
                  {...register("reason", {
                    required: "Please select a reason to proceed",
                  })}
                  className={`w-full p-3 bg-gray-50 border ${
                    errors.reason ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-sm text-gray-800 focus:outline-none focus:border-orange-500`}
                >
                  <option value="">Select a reason...</option>
                  <option value="Offensive Content">Offensive Content</option>
                  <option value="Spam">Spam</option>
                  <option value="Copyright Issue">Copyright Issue</option>
                  <option value="Other">Other</option>
                </select>
                {errors.reason && (
                  <p className="text-xs font-semibold text-red-500">
                    {errors.reason.message}
                  </p>
                )}
              </div>

              {/* ডেসক্রিপশন টেক্সট এরিয়া */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Detailed Description (Optional)
                </label>
                <textarea
                  {...register("description")}
                  rows="5"
                  placeholder="Provide more specific details or instances regarding this recipe issue..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-orange-500 resize-none"
                ></textarea>
              </div>

              {/* সাবমিট বাতন */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
              >
                {submitting ? "Submitting Report..." : "Submit Report"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportRecipePage;
