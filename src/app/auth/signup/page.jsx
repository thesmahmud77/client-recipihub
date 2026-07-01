"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye } from "@gravity-ui/icons";
import { EyeSlash } from "@gravity-ui/icons";
import { signUp, signIn } from "@/lib/auth-client";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Submitted Data:", data);
    setLoading(true);
    const imgFile = data.photo[0];
    const formData = new FormData();
    formData.append("image", imgFile);
    const imgbbRes = await fetch(
      `https://api.imgbb.com/1/upload?key=d11b800a59dcca4d8f9ddb86c014f5f7`,
      {
        method: "POST",
        body: formData,
      },
    );
    const imgbbData = await imgbbRes.json();
    const photoURL = imgbbData.data.url;
    try {
      const { data: authData, error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: photoURL,
        role: data.role,
        plan: "free",
        callbackURL: "/",
      });

      if (error) {
        alert(error.message);
      } else {
        alert("Account Created Successfully!");
        reset();
      }
    } catch (err) {
      alert("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF6F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* হেডার সেকশন */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#2A1A12] tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-[#8A7970]">
            Join thousands of home cooks sharing what they love.
          </p>
        </div>

        {/* ফর্ম বডি */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5 bg-transparent"
        >
          {/* ১. ফুল নেম ফিল্ড */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-bold text-[#2A1A12]">
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[#8A7970]">
                {/* User SVG Icon */}
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
                placeholder="Your full name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Name must be at least 5 characters",
                  },
                })}
                className="w-full pl-12 pr-4 py-3 bg-[#FFFBF7] border border-[#F0E8E2] text-[#2A1A12] text-sm rounded-full focus:outline-none focus:border-[#FF7214] focus:ring-1 focus:ring-[#FF7214] transition-all placeholder-[#C0B5AD]"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-500 pl-2">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* ২. ইমেইল ফিল্ড */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-bold text-[#2A1A12]">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[#8A7970]">
                {/* Mail SVG Icon */}
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-12 pr-4 py-3 bg-[#FFFBF7] border border-[#F0E8E2] text-[#2A1A12] text-sm rounded-full focus:outline-none focus:border-[#FF7214] focus:ring-1 focus:ring-[#FF7214] transition-all placeholder-[#C0B5AD]"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-500 pl-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* ৩. পাসওয়ার্ড ফিল্ড */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-bold text-[#2A1A12]">Password</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[#8A7970]">
                {/* Lock SVG Icon */}
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full pl-12 pr-12 py-3 bg-[#FFFBF7] border border-[#F0E8E2] text-[#2A1A12] text-sm rounded-full focus:outline-none focus:border-[#FF7214] focus:ring-1 focus:ring-[#FF7214] transition-all placeholder-[#C0B5AD]"
              />
              {/* Eye Off SVG Icon (Right side) */}
              <button
                type="button"
                className="absolute right-4 text-[#8A7970] hover:text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlash></EyeSlash> : <Eye></Eye>}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-500 pl-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ৪. রোল সিলেক্ট ফিল্ড */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-bold text-[#2A1A12]">Role</label>
            <select
              {...register("role", { required: true })}
              className="w-full px-5 py-3 bg-[#FFFBF7] border border-[#F0E8E2] text-[#2A1A12] text-sm rounded-full focus:outline-none focus:border-[#FF7214] focus:ring-1 focus:ring-[#FF7214] transition-all appearance-none cursor-pointer"
            >
              <option value="user">User</option>
              <option value="admin" disabled className="cursor-block">
                Admin
              </option>
            </select>
          </div>

          {/* ৫. প্রোফাইল ফটো আপলোড সেকশন (Dashed Border Card) */}
          <div className="flex flex-col gap-1 text-start">
            <label className="text-sm font-medium text-gray-700">
              Your Photo
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              className="border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-600 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-amber-600 file:text-white file:cursor-pointer"
            />
          </div>

          {/* ৬. ক্রিয়েট অ্যাকাউন্ট সাবমিট বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 w-full py-3 text-white p-2 rounded-md font-semibold cursor-pointer hover:bg-amber-700 transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Divider (or continue with) */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E6DCD3]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#FAF6F0] px-3 text-[#8A7970] text-[11px] font-medium tracking-wide">
              or continue with
            </span>
          </div>
        </div>

        {/* ৭. গুগল সাইন-ইন বাটন */}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="border-2 border-gray-700/50 w-full py-3 text-gray-700 p-2 rounded-md font-semibold cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
        >
          Continue with Google
        </button>

        {/* ফুটার লিঙ্ক */}
        <p className="text-center text-sm text-[#8A7970] mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-[#FF7214] font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
