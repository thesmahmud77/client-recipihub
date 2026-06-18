import Link from "next/link";
import React from "react";

const HomeFeature = async () => {
  const res = await fetch("http://localhost:8080/featured", {
    cache: "no-store",
  });
  const fetchFeatures = await res.json();
  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-3">
            Featured Recipes
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Hand-picked favourites by our editorial team
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="text-orange-500 font-medium hover:underline text-sm flex items-center gap-1"
          >
            See all featured <span>➔</span>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {fetchFeatures?.map((feature) => (
          <div
            key={feature._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all"
          >
            {/* ইমেজ এবং টপ ব্যাজ সেকশন */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={feature.recipeImage}
                alt={feature.recipeName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Featured স্ট্যাটাস ট্রু থাকলে ব্যাজ দেখাবে */}
              {feature.isFeatured && (
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  ★ Featured
                </span>
              )}
              {/* টাইম ব্যাজ (ডাটাবেজের preparationTime ফিল্ড থেকে) */}
              <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                ⏱️ {feature.preparationTime} min
              </span>
            </div>

            {/* কার্ড কন্টেন্ট সেকশন */}
            <div className="p-4">
              <h3 className="font-bold text-gray-800 text-base mb-4 line-clamp-1">
                {feature.recipeName}
              </h3>

              {/* অথর এবং লাইক সেকশন */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold uppercase">
                    {feature.authorName ? feature.authorName[0] : "U"}
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {feature.authorName}
                  </span>
                </div>

                {/* লাইক কাউন্ট (ডাটাবেজের likesCount ফিল্ড থেকে) */}
                <div className="flex items-center gap-1 text-rose-500 text-xs font-semibold">
                  <span>❤️</span>
                  <span>{feature.likesCount?.toLocaleString() || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFeature;
