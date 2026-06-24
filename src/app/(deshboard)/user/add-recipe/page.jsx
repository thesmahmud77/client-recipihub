"use client";

import { useSession } from "@/lib/auth-client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddRecipePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  // console.log("form add recipe page", user);
  const [loading, setLoading] = useState(false);

  // Ingredients এবং Instructions এর ট্যাগ ম্যানেজ করার জন্য স্টেট
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [difficulty, setDifficulty] = useState("Medium"); // ডিফল্ট ভ্যালু

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // ১. Ingredients-এ Enter চাপলে ট্যাগ অ্যাড করার ফাংশন
  const handleKeyDownIngredient = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !ingredients.includes(value)) {
        setIngredients([...ingredients, value]);
        e.target.value = "";
      }
    }
  };

  const removeIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  // ২. Instructions-এ Enter চাপলে ট্যাগ অ্যাড করার ফাংশন
  const handleKeyDownInstruction = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !instructions.includes(value)) {
        setInstructions([...instructions, value]);
        e.target.value = "";
      }
    }
  };

  const removeInstruction = (indexToRemove) => {
    setInstructions(instructions.filter((_, index) => index !== indexToRemove));
  };

  // ৩. ফাইনাল ফর্ম সাবমিট ও ImgBB আপলোড লজিক
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let finalPhotoURL = data.imageUrl || "";

      // যদি ইউজার ফাইল আপলোড করে থাকে
      if (data.photo && data.photo[0]) {
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
        if (imgbbData.success) {
          finalPhotoURL = imgbbData.data.url;
        }
      }

      // সমস্ত ডেটা একসাথে অবজেক্ট তৈরি করা
      const recipeData = {
        recipeName: data.recipeName,
        recipeImage: finalPhotoURL,
        category: data.category,
        cuisineType: data.cuisineType,
        difficultyLevel: difficulty,
        prepTime: Number(data.prepTime),
        ingredients: ingredients,
        instructions: instructions,
        status: "published",
        authorId: user.id,
        authorName: user.name,
        authorEmail: user.email,
        likesCount: 0,
        isFeatured: false,
      };

      // console.log("Final Recipe Data to Send Backend:", recipeData);
      const reponse = await fetch("http://localhost:8080/add-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      const result = await reponse.json();
      console.log(result);
      if (result.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Seccess!",
          text: "Product added successfully to Database!",
          timer: 2500,
          showConfirmButton: false,
        });

        resetForm();
        reset();
      }
    } catch (error) {
      console.error("Error submitting recipe form:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-10 w-[1000px]">
      <h1 className="text-3xl font-bold">Add New Recipe</h1>
      <p>Share your Recipe to world</p>
      <div className="border-2 border-gray-500/20 p-5 rounded-2xl mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* ১. Recipe Name ফিল্ড */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-bold text-[#2A1A12]">
              Recipe Name
            </label>
            <input
              type="text"
              placeholder="e.g. Spicy Thai Basil Chicken"
              {...register("recipeName", {
                required: "Recipe name is required",
              })}
              className="w-full px-4 py-3 bg-[#FFFBF9] border border-[#F0E8E2] text-sm rounded-xl focus:outline-none focus:border-[#FF7214] focus:ring-1 focus:ring-[#FF7214] transition-all"
            />
            {errors.recipeName && (
              <p className="text-xs text-rose-500">
                {errors.recipeName.message}
              </p>
            )}
          </div>

          {/* ২. Recipe Image সেকশন (ফাইল ও ইউআরএল দুটোই হ্যান্ডেল করা যাবে) */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-bold text-[#2A1A12]">
              Recipe Image
            </label>
            <div>
              {/* ড্র্যাগ/ফাইল আপলোড এরিয়া */}
              <div className="md:col-span-2 text-white relative border-2 border-dashed border-[#E5DEC9] bg-[#FFFDFB] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-[#FF7214] transition-all group">
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-3 bg-[#FFF3EB] rounded-full text-[#FF7214]">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#2A1A12]">
                    Drag & drop your image here
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, WEBP up to 5MB — powered by imgbb
                  </p>
                  <span className="mt-2 px-4 py-1.5 bg-white border border-[#E5DEC9] text-xs font-medium rounded-lg text-gray-600 shadow-sm group-hover:bg-[#FF7214] group-hover:text-white transition-all">
                    Browse File
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ৩. ক্যাটাগরি, কুইজিন এবং ডিফিকাল্টি (গ্রিড লেআউট) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ক্যাটাগরি ড্রপডাউন */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-bold text-[#2A1A12]">
                Category
              </label>
              <select
                {...register("category", { required: "Select a category" })}
                className="w-full px-4 py-3 bg-[#FFFBF9] border border-[#F0E8E2] text-sm rounded-xl focus:outline-none focus:border-[#FF7214]"
              >
                <option value="">Select category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            {/* কুইজিন টাইপ ড্রপডাউন */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-bold text-[#2A1A12]">
                Cuisine Type
              </label>
              <select
                {...register("cuisineType", { required: "Select a cuisine" })}
                className="w-full px-4 py-3 bg-[#FFFBF9] border border-[#F0E8E2] text-sm rounded-xl focus:outline-none focus:border-[#FF7214]"
              >
                <option value="">Select cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Thai">Thai</option>
                <option value="Indian">Indian</option>
                <option value="Bangladeshi">Bangladeshi</option>
              </select>
            </div>

            {/* ডিফিকাল্টি লেভেল কাস্টম পিল বাটন */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-bold text-[#2A1A12]">
                Difficulty Level
              </label>
              <div className="flex items-center gap-2 h-full">
                {["Easy", "Medium", "Hard"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                      difficulty === level
                        ? level === "Easy"
                          ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                          : level === "Medium"
                            ? "bg-[#FFF3EB] border-[#FF7214] text-[#FF7214]"
                            : "bg-rose-50 border-rose-500 text-rose-600"
                        : "bg-white border-[#E5DEC9] text-black"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ৪. প্রিপারেশন টাইম ফিল্ড */}
          <div className="flex flex-col space-y-1.5 max-w-xs">
            <label className="text-sm font-bold text-[#2A1A12]">
              Preparation Time
            </label>
            <div className="flex items-center">
              <input
                type="number"
                placeholder="30"
                {...register("prepTime", { required: true, min: 1 })}
                className="w-24 px-4 py-3 bg-[#FFFBF9] border border-[#F0E8E2] text-sm rounded-l-xl focus:outline-none focus:border-[#FF7214]"
              />
              <span className="px-4 py-3 bg-[#FAF7F4] border border-l-0 border-[#F0E8E2] text-sm text-gray-500 rounded-r-xl">
                minutes
              </span>
            </div>
          </div>

          {/* ৫. Ingredients ট্যাগ ইনপুট এরিয়া */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-bold text-[#2A1A12]">
              Ingredients
            </label>
            <p className="text-xs text-gray-400">
              Press Enter after each ingredient to add it as a tag
            </p>
            <div className="w-full p-2.5 bg-[#FFFBF9] border border-[#F0E8E2] rounded-xl flex flex-wrap gap-2 items-center min-h-[50px]">
              {ingredients.map((ing, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 bg-[#FFF3EB] text-[#FF7214] text-xs font-medium px-3 py-1.5 rounded-full border border-[#FFE0CC]"
                >
                  {ing}
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="hover:text-rose-600 focus:outline-none font-bold"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add ingredient..."
                onKeyDown={handleKeyDownIngredient}
                className="flex-1 min-w-[150px] bg-transparent text-sm focus:outline-none placeholder-[#C0B5AD]"
              />
            </div>
          </div>

          {/* ৬. Instructions ট্যাগ ইনপুট এরিয়া */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-bold text-[#2A1A12]">
              Instructions
            </label>
            <p className="text-xs text-gray-400">
              Press Enter after each step to add it as a numbered tag
            </p>
            <div className="w-full p-2.5 bg-[#FFFBF9] border border-[#F0E8E2] rounded-xl flex flex-wrap gap-2 items-center min-h-[50px]">
              {instructions.map((step, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-[#FFFDFB] text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full border border-[#F0E8E2] shadow-sm"
                >
                  <span className="w-4 h-4 rounded-full bg-[#FF7214] text-white flex items-center justify-center text-[10px] font-bold">
                    {index + 1}
                  </span>
                  {step}
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="text-gray-400 hover:text-rose-600 font-bold"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add step..."
                onKeyDown={handleKeyDownInstruction}
                className="flex-1 min-w-[150px] bg-transparent text-sm focus:outline-none placeholder-[#C0B5AD]"
              />
            </div>
          </div>

          {/* ৭. ক্রিয়েট অ্যাকাউন্ট এবং সেভ ড্রাফট বাটন */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#F0EAE4]">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF7214] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-orange-200 hover:bg-[#E05E0F] transition-colors flex items-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              {loading ? "Publishing..." : "Publish Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
