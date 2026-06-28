"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Swal from "sweetalert2";

const SavedFavoritesPage = () => {
  const { data: session, isPending } = useSession();
  const userEmail = session?.user?.email;

  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userEmail) {
      fetch(
        `https://server-recipihub.vercel.app/favorite-recipes?email=${userEmail}`,
        {
          // ✅ সঠিক endpoint
          cache: "no-cache",
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setFavData(data); // ✅ state এ store
          setLoading(false);
        });
    } else if (!isPending) {
      setLoading(false);
    }
  }, [userEmail, isPending]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 font-medium">Loading...</p>
      </div>
    );
  }

  const handleRemoveToFav = async (id) => {
    // console.log(id);
    try {
      const resDelete = await fetch(
        `https://server-recipihub.vercel.app/remove-to-fav/${id}`,
        {
          method: "DELETE",
        },
      );

      if (resDelete) {
        Swal.fire({
          icon: "success",
          title: "Remove",
          text: "Remove Recipe from your Fav List",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", "Failed to delete from server.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong with the network!", "error");
    }
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-8 text-gray-800 max-w-6xl mx-auto px-4 space-y-6 w-[1000px]">
      {/* হেডার */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Saved Favorites
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Your personal collection of saved recipes
        </p>
      </div>

      <div className="text-sm font-medium text-gray-500">
        {favData.length} saved recipes {/* ✅ সঠিক variable */}
      </div>

      {/* এম্পটি স্টেট */}
      {favData.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <span className="text-4xl">⭐</span>
          <p className="text-gray-500 mt-3 font-medium">
            You haven't saved any recipes yet!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favData.map(
            (
              recipe, // ✅ সঠিক variable
            ) => (
              <div
                key={recipe._id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={recipe.recipeImage || "https://placehold.co/600x400"}
                      alt={recipe.recipeName}
                      className="w-full h-full object-cover"
                    />
                    {recipe.category && (
                      <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {recipe.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-extrabold text-gray-800 text-sm md:text-base line-clamp-1">
                      {recipe.recipeName}
                    </h3>
                  </div>
                </div>

                {/* অ্যাকশন বাটন */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-3">
                  <Link
                    href={`/recipes/${recipe.recipeId}`} // ✅ recipeId দিয়ে navigate
                    className="py-2 px-3 flex items-center justify-center bg-[#FDFBF7] border border-gray-300 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 text-center"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleRemoveToFav(recipe._id)}
                    className="py-2 px-3 flex items-center justify-center border border-red-200 text-red-500 text-xs font-bold rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default SavedFavoritesPage;
