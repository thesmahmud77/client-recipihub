"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const UpdateUserInfoPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, updateSession } = useSession();
  const user = session?.user;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user?.name) {
      setValue("name", user.name);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    if (!user?.email) {
      alert("USER EMAIL NOT FOUND. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      let photoURL = user.image;

      if (data.photo && data.photo.length > 0) {
        const imgFile = data.photo[0];
        const formData = new FormData();
        formData.append("image", imgFile);

        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=d11b800a59dcca4d8f9ddb86c014f5f7`,
          { method: "POST", body: formData },
        );
        const imgbbData = await imgbbRes.json();
        if (imgbbData.success) {
          photoURL = imgbbData.data.url;
        }
      }

      const updateUser = await fetch(
        "https://server-recipihub.vercel.app/update-user",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: data.name,
            image: photoURL,
          }),
        },
      );

      const backendData = await updateUser.json();
      console.log("Backend Response:", backendData);

      if (
        updateUser.ok &&
        (backendData.matchedCount > 0 || backendData.success)
      ) {
        Swal.fire({
          title: "Profile updated successfully!",
          icon: "success",
          draggable: true,
        });

        router.push("/profile");
        router.refresh();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update profile.",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (err) {
      // console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong while updating profile!",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center border-2 rounded-2xl my-20 border-gray-300/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* হেডার */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#2A1A12] tracking-tight">
            Update Profile Info
          </h2>
          <p className="mt-2 text-sm text-[#8A7970]">
            Change your official display name and profile picture.
          </p>
        </div>

        {/* ফর্ম বডি */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5 bg-transparent"
        >
          {/* নাম ফিল্ড */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-bold text-[#2A1A12]">
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[#8A7970]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                className="w-full pl-12 pr-4 py-3 bg-[#FFFBF7] border border-[#F0E8E2] text-[#2A1A12] text-sm rounded-full focus:outline-none focus:border-[#FF7214] focus:ring-1 focus:ring-[#FF7214] transition-all placeholder-[#C0B5AD]"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-500 pl-2">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* ইমেজ আপলোড ফিল্ড */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-bold text-[#2A1A12]">
              Profile Photo
            </label>
            <div className="relative flex items-center">
              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                className="w-full px-4 py-2.5 bg-[#FFFBF7] border border-[#F0E8E2] text-[#2A1A12] text-sm rounded-full focus:outline-none file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-amber-600 file:text-white file:font-semibold file:text-xs file:cursor-pointer hover:file:bg-amber-700 transition-all text-[#8A7970]"
              />
            </div>
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#FF7214] w-full py-3 text-white rounded-full font-semibold cursor-pointer hover:bg-[#e5650f] transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Updating Info..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserInfoPage;
