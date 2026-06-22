"use client";

import React, { useState, useEffect } from "react";

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  // ১. এপিআই থেকে সরাসরি রেসিপি ডেটা ফেচ করা
  useEffect(() => {
    fetch("http://localhost:8080/all-recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  return (
    <div className="bg-[#FAF7F2] min-h-screen p-6 md:p-8 text-gray-800 w-[1000px]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* টাইটেল পার্ট */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Recipes</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Delete recipes or toggle featured status
          </p>
        </div>

        {/* রেসিপি টেবিল কার্ড */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FDFBF7] border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-6">Recipe</th>
                  <th className="py-4 px-6">Author</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Featured</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {recipes.map((recipe, idx) => {
                  const isFeatured =
                    recipe.isFeatured ||
                    recipe.status?.toLowerCase() === "featured";

                  return (
                    <tr
                      key={recipe._id || idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      {/* RECIPE: ইমেজ এবং নাম */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {recipe.image || recipe.recipeImage ? (
                            <img
                              src={recipe.image || recipe.recipeImage}
                              alt=""
                              className="w-12 h-10 rounded-xl object-cover bg-gray-50"
                            />
                          ) : (
                            <div className="w-12 h-10 rounded-xl bg-orange-100 text-[#EA580C] font-bold flex items-center justify-center text-xs">
                              🍳
                            </div>
                          )}
                          <span className="font-semibold text-gray-900 truncate max-w-[200px]">
                            {recipe.name ||
                              recipe.recipeName ||
                              "Untitled Recipe"}
                          </span>
                        </div>
                      </td>

                      {/* AUTHOR */}
                      <td className="py-4 px-6 text-gray-500 font-medium">
                        {recipe.author || recipe.authorName || "Anonymous"}
                      </td>

                      {/* CATEGORY Badge */}
                      <td className="py-4 px-6">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 uppercase tracking-wide">
                          {recipe.category || "General"}
                        </span>
                      </td>

                      {/* FEATURED Status Badge */}
                      <td className="py-4 px-6">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            isFeatured
                              ? "bg-amber-50 text-amber-600 border border-amber-100"
                              : "bg-gray-50 text-gray-400"
                          }`}
                        >
                          {isFeatured ? "⭐ Featured" : "Regular"}
                        </span>
                      </td>

                      {/* ACTIONS Buttons */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {/* Feature/Unfeature Button */}
                          <button className="text-xs px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-xl font-medium border border-gray-200 text-gray-600 transition-colors">
                            {isFeatured ? "Unfeature" : "Feature"}
                          </button>

                          {/* Delete Button */}
                          <button className="text-xs px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl font-semibold transition-colors">
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

export default ManageRecipes;
