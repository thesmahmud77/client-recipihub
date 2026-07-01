"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye } from "@gravity-ui/icons";
import { EyeSlash } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: authData, error } = await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        callbackURL: "/",
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      } else {
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          draggable: true,
        });
        reset();
        router.push("/");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        // text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center border-2 rounded-2xl my-20 border-gray-300/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* হেডার সেকশন */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#2A1A12] tracking-tight">
            Welcome back!
          </h2>
          <p className="mt-2 text-sm text-[#8A7970]">
            Sign in to access your recipes and saved collections.
          </p>
        </div>

        {/* ফর্ম বডি */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5 bg-transparent"
        >
          {/* ১. ইমেইল ফিল্ড */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-bold text-[#2A1A12]">
              Email Address
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

          {/* ২. পাসওয়ার্ড ফিল্ড */}
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#2A1A12]">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-[#FF7214] font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full pl-12 pr-12 py-3 bg-[#FFFBF7] border border-[#F0E8E2] text-[#2A1A12] text-sm rounded-full focus:outline-none focus:border-[#FF7214] focus:ring-1 focus:ring-[#FF7214] transition-all placeholder-[#C0B5AD]"
              />
              <button
                type="button"
                className="absolute right-4 text-[#8A7970] hover:text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-500 pl-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ৩. Remember Me চেকবক্স */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
              className="w-4 h-4 accent-[#FF7214] cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className="text-sm text-[#2A1A12] cursor-pointer select-none"
            >
              Keep me logged in
            </label>
          </div>

          {/* ৪. লগইন সাবমিট বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#FF7214] w-full py-3 text-white rounded-full font-semibold cursor-pointer hover:bg-[#e5650f] transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Login to RecipeHub"}
          </button>
        </form>

        {/* Divider */}
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

        {/* গুগল সাইন-ইন বাটন */}
        <button
          type="button"
          className="w-full py-3 bg-white border border-[#E6DCD3] text-sm font-bold text-[#2A1A12] rounded-full flex items-center justify-center space-x-2.5 hover:bg-gray-50 transition-colors shadow-xs active:scale-[0.99] transform cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61a5.66 5.66 0 01-2.45 3.71v3.08h3.95a12 12 0 003.63-8.64z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.95-3.08c-1.1.74-2.5 1.18-3.98 1.18-3.07 0-5.67-2.08-6.6-4.88H1.31v3.19A12 12 0 0012 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.4 14.31a7.16 7.16 0 010-4.62V6.5H1.31a12 12 0 000 11l4.09-3.19z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.94 11.94 0 0012 0 12 12 0 001.31 6.5l4.09 3.19c.93-2.8 3.53-4.88 6.6-4.88z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* ফুটার লিঙ্ক */}
        <p className="text-center text-sm text-[#8A7970] mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#FF7214] font-bold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
