"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = () => {
    fetch("http://localhost:8080/all-recipes")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  };

  useEffect(() => {
    fetch("http://localhost:8080/all-recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const refreshRecipesList = () => {
    fetch("http://localhost:8080/all-recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error:", err));
  };

  const handleDeleteRecipe = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/all-recipes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        Swal.fire("Deleted!", "Recipe has been deleted.", "success");
        refreshRecipesList();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to delete recipe.", "error");
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    const nextStatus = !currentStatus;

    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe._id === id ? { ...recipe, isFeatured: nextStatus } : recipe,
      ),
    );

    try {
      const res = await fetch(`http://localhost:8080/all-recipes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: nextStatus }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: nextStatus ? "Marked as Featured" : "Removed from Featured",
          timer: 1000,
          showConfirmButton: false,
        });
        refreshRecipesList();
      } else {
        refreshRecipesList();
      }
    } catch (err) {
      console.error("Error updating featured status:", err);
      refreshRecipesList();
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen p-6 md:p-8 text-gray-800 w-[1000px]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Recipes</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Delete recipes or toggle featured status
          </p>
        </div>

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
                    recipe.isFeatured === true ||
                    recipe.status?.toLowerCase() === "featured";

                  return (
                    <tr
                      key={recipe._id || idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {recipe.image || recipe.recipeImage ? (
                            <div className="w-12 h-10 rounded-xl overflow-hidden flex-shrink-0">
                              <img
                                src={recipe.image || recipe.recipeImage}
                                alt={recipe.recipeName || "Recipe Image"}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "https://placehold.co/600x400";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-10 rounded-xl bg-orange-100 text-[#EA580C] font-bold flex items-center justify-center text-xs flex-shrink-0">
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

                      <td className="py-4 px-6 text-gray-500 font-medium">
                        {recipe.author || recipe.authorName || "Anonymous"}
                      </td>

                      <td className="py-4 px-6">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 uppercase tracking-wide">
                          {recipe.category || "General"}
                        </span>
                      </td>

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

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {/* Feature/Unfeature Button */}
                          <button
                            onClick={() =>
                              handleToggleFeatured(recipe._id, isFeatured)
                            }
                            className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-colors cursor-pointer ${
                              isFeatured
                                ? "bg-amber-500 text-white border-amber-600 hover:bg-amber-600"
                                : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600"
                            }`}
                          >
                            {isFeatured ? "Unfeature" : "Feature"}
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteRecipe(recipe._id)}
                            className="text-xs px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl font-semibold transition-colors cursor-pointer"
                          >
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
