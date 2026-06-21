"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CATEGORIES = [
  { label: "All", emoji: "🍽️" },
  { label: "Quick Food", emoji: "⚡" },
  { label: "Breakfast", emoji: "🌅" },
  { label: "Seafood", emoji: "🦞" },
  { label: "Pasta", emoji: "🍝" },
  { label: "Noodles", emoji: "🍜" },
  { label: "Fast Food", emoji: "🍔" },
  { label: "Salad", emoji: "🥗" },
  { label: "Desserts", emoji: "🍮" },
  { label: "Vegan", emoji: "🌿" },
];

/* ─── Skeleton card while loading ─── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-orange-100 animate-pulse">
    <div className="h-48 bg-orange-50" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-orange-50 rounded-full w-4/5" />
      <div className="h-3 bg-orange-50 rounded-full w-2/5" />
      <div className="h-9 bg-orange-50 rounded-xl mt-4" />
    </div>
  </div>
);

/* ─── Individual recipe card ─── */
const RecipeCard = ({ recipe }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(234,88,12,0.15)] hover:border-orange-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-orange-50 flex-shrink-0">
        {recipe.recipeImage && !imgError ? (
          <img
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-orange-50 to-amber-100">
            🍽️
          </div>
        )}

        {/* Premium badge */}
        {recipe.isFeatured && (
          <span className="absolute top-3 right-3 bg-stone-900 text-amber-400 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-amber-400/20">
            ✦ Premium
          </span>
        )}

        {/* Category pill over image */}
        <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-orange-600 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {recipe.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
          {recipe.recipeName}
        </h3>

        {/* Likes */}
        <div className="flex items-center gap-1 text-stone-400 text-xs mt-auto">
          <svg
            className="w-3.5 h-3.5 fill-rose-400 text-rose-400"
            viewBox="0 0 20 20"
          >
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
          <span className="font-medium text-stone-500">
            {recipe.likesCount ?? 0} likes
          </span>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 pb-4">
        <Link
          href={`/recipes/${recipe._id}`}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-stone-900 hover:bg-orange-600 text-white text-xs font-semibold tracking-wide rounded-xl transition-colors duration-200"
        >
          View Recipe
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

/* ─── Empty state ─── */
const EmptyState = ({ category }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white rounded-2xl border-2 border-dashed border-orange-100 text-center px-6">
    <span className="text-6xl mb-4">🫙</span>
    <p className="font-bold text-stone-800 text-xl mb-2">Nothing here yet</p>
    <p className="text-stone-400 text-sm max-w-xs">
      No recipes found in{" "}
      <span className="font-semibold text-orange-500">{category}</span>. Try a
      different category.
    </p>
  </div>
);

/* ─── Main Page ─── */
const BrowseRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* Fetch all recipes once on mount */
  useEffect(() => {
    fetch("http://localhost:8080/all-recipes")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  /* Re-filter client-side whenever category or master list changes */
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter(
          (r) => r.category?.toLowerCase() === selectedCategory.toLowerCase(),
        ),
      );
    }
  }, [selectedCategory, recipes]);

  return (
    <div className="min-h-screen bg-orange-50/40 font-sans">
      {/* ── Hero Banner ── */}
      <div className="bg-stone-900 px-6 py-14 md:px-12 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-800/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Recipe Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Discover your next <br />
            <span className="text-orange-500">favourite dish</span>
          </h1>
          <p className="mt-4 text-stone-400 text-sm max-w-md leading-relaxed">
            Hand-picked recipes from every cuisine — filter by category, explore
            by flavour.
          </p>

          {!loading && !error && (
            <div className="mt-6 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-stone-300 text-xs font-medium">
              🍴 <span className="text-white font-bold">{recipes.length}</span>{" "}
              recipes available
            </div>
          )}
        </div>
      </div>

      {/* ── Sticky Category Filter Bar ── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {CATEGORIES.map(({ label, emoji }) => (
              <button
                key={label}
                onClick={() => setSelectedCategory(label)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0
                  ${
                    selectedCategory === label
                      ? "bg-stone-900 text-white shadow-md scale-105"
                      : "bg-orange-50 text-stone-600 hover:bg-orange-100 hover:text-orange-700 border border-orange-100"
                  }`}
              >
                <span>{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-bold text-stone-800">
            {selectedCategory === "All" ? "All Recipes" : selectedCategory}
          </h2>
          {!loading && (
            <p className="text-stone-400 text-sm">
              <span className="font-semibold text-stone-600">
                {filteredRecipes.length}
              </span>{" "}
              {filteredRecipes.length === 1 ? "recipe" : "recipes"}
            </p>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">⚠️</span>
            <p className="font-bold text-stone-800 text-lg mb-1">
              Failed to load recipes
            </p>
            <p className="text-stone-400 text-sm">
              Check your connection and try again.
            </p>
          </div>
        )}

        {/* Recipe grid */}
        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            ) : filteredRecipes.length === 0 ? (
              <EmptyState category={selectedCategory} />
            ) : (
              filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseRecipes;
