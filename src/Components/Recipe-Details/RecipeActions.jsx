"use client";

import React, { useState } from "react";
import { ShoppingCart, NodesRight } from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";
import Swal from "sweetalert2";

const RecipeActions = ({ recipe }) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const handleFavorite = async () => {
    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Please Login First",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    setLoading(true);

    const targetPrepTime = recipe?.preparationTime || recipe?.prepTime || 0;

    const recipeData = {
      recipeName: recipe.recipeName,
      recipeImage: recipe.recipeImage,
      category: recipe.category,
      cuisineType: recipe.cuisineType,
      difficultyLevel: recipe.difficultyLevel,
      prepTime: Number(targetPrepTime),
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      status: recipe.status,
      recipeId: recipe._id,
      authorName: recipe.authorName,
      authorEmail: recipe.authorEmail,
      likesCount: recipe.likesCount,
      isFeatured: recipe.isFeatured,
      favEmail: user.email,
      role: user.role,
      savedAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:8080/favorite-recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      const data = await res.json();
      // console.log(data, "Data From Server");

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: data.message,
          timer: 2000,
          confirmButtonColor: "#3b82f6",
        });
      } else if (res.status === 409) {
        Swal.fire({
          icon: "info",
          title: data.message,
          confirmButtonColor: "#3b82f6",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "ব্যর্থ হয়েছে!",
          text: data.message || "কিছু একটা সমস্যা হয়েছে।",
          confirmButtonColor: "#f59e0b",
        });
      }
    } catch (error) {
      console.error("Error saving favorite recipe:", error);

      Swal.fire({
        icon: "error",
        title: "ব্যর্থ হয়েছে!",
        text: "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।",
        confirmButtonColor: "#f59e0b",
      });
    }
    {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
      {/* 1. Purchase Button */}
      <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-semibold rounded-xl px-5 py-3 transition-colors cursor-pointer">
        <ShoppingCart className="w-4 h-4" />
        <span>Purchase Recipe</span>
        <span className="bg-white/20 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md ml-0.5">
          $4.99
        </span>
      </button>

      {/* 2. Like Button */}
      <button className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs md:text-sm font-medium rounded-xl px-4 py-3 border border-gray-200/60 transition-colors cursor-pointer">
        <span>❤️</span>
        <span>Like</span>
      </button>

      {/* 3. Share Button */}
      <button className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs md:text-sm font-medium rounded-xl px-4 py-3 border border-gray-200/60 transition-colors cursor-pointer">
        <NodesRight className="w-4 h-4 text-gray-500" />
        <span>Share</span>
      </button>

      {/* 4. Favorite Button (onClick এখন পারফেক্টলি কাজ করবে) */}
      <button
        onClick={handleFavorite}
        disabled={loading}
        className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs md:text-sm font-medium rounded-xl px-4 py-3 border border-gray-200/60 transition-colors cursor-pointer disabled:opacity-60"
      >
        <span>{loading ? "⌛" : "⭐"}</span>
        <span>{loading ? "Saving..." : "Favorite"}</span>
      </button>

      {/* 5. Report Button */}
      <button className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs md:text-sm font-semibold rounded-xl px-4 py-3 border border-red-100/70 transition-colors cursor-pointer sm:ml-auto">
        <span>⚠️</span>
        <span>Report</span>
      </button>
    </div>
  );
};

export default RecipeActions;
