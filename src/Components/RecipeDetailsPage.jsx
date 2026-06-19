import Link from "next/link";

const RecipeDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8080/recipes/${id}`, {
    cache: "no-cache",
  });
  const recipe = await res.json();

  const relatedRes = await fetch(
    `http://localhost:8080/recipes-related/${recipe.category}`,
    { cache: "no-cache" },
  );
  const relatedRecipes = await relatedRes.json();

  return (
    <div className="bg-[#FAF6F0] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <span>›</span>
          <Link href="/browse-recipes" className="hover:text-orange-500">
            Browse Recipes
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{recipe.recipeName}</span>
        </nav>

        {/* Main Detail Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* বাম — ইমেজ */}
            <div>
              <div className="relative rounded-xl overflow-hidden h-72 md:h-96">
                {recipe.isFeatured && (
                  <span className="absolute top-3 left-3 z-10 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    ★ Featured
                  </span>
                )}
                <img
                  src={recipe.recipeImage}
                  alt={recipe.recipeName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* থাম্বনেইল গ্যালারি (যদি থাকে) */}
              {recipe.images?.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {recipe.images.slice(0, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="w-16 h-16 object-cover rounded-lg border-2 border-gray-100 cursor-pointer hover:border-orange-400 transition"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ডান — তথ্য */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Category Badge */}
                {recipe.category && (
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {recipe.category}
                  </span>
                )}

                {/* Title */}
                <h1 className="text-3xl font-extrabold text-[#2A1A12] mb-3">
                  {recipe.recipeName}
                </h1>

                {/* Description */}
                {recipe.description && (
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                    {recipe.description}
                  </p>
                )}

                {/* Author */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold uppercase">
                      {recipe.authorName?.[0] || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-[#2A1A12] text-sm">
                        {recipe.authorName}
                      </p>
                      <p className="text-xs text-gray-400">Recipe Author</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-rose-500 font-semibold text-sm">
                    <span>❤️</span>
                    <span>
                      {recipe.likesCount?.toLocaleString() || 0} likes
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-[#FAF6F0] rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Prep Time</p>
                    <p className="text-sm font-bold text-[#2A1A12]">
                      {recipe.preparationTime} min
                    </p>
                  </div>
                  <div className="bg-[#FAF6F0] rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Cook Time</p>
                    <p className="text-sm font-bold text-[#2A1A12]">
                      {recipe.cookTime || "—"} min
                    </p>
                  </div>
                  <div className="bg-[#FAF6F0] rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Servings</p>
                    <p className="text-sm font-bold text-[#2A1A12]">
                      {recipe.servings || "—"} people
                    </p>
                  </div>
                  <div className="bg-[#FAF6F0] rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Difficulty</p>
                    <p className="text-sm font-bold text-[#2A1A12]">
                      {recipe.difficulty || "Easy"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-3 bg-[#FF7214] text-white font-semibold rounded-full hover:bg-[#e5650f] transition-colors flex items-center justify-center gap-2">
                  🔖 Save to Collection
                </button>
                <button className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors">
                  ❤️ Like
                </button>
                <button className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors">
                  ↗ Share
                </button>
              </div>
            </div>
          </div>

          {/* Ingredients & Instructions */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Ingredients */}
            {recipe.ingredients?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#2A1A12] mb-4 border-l-4 border-orange-500 pl-3">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="mt-1 w-2 h-2 rounded-full bg-orange-400 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructions */}
            {recipe.instructions?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#2A1A12] mb-4 border-l-4 border-orange-500 pl-3">
                  Instructions
                </h2>
                <ol className="space-y-3">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Related Recipes */}
        {relatedRecipes?.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#2A1A12] border-l-4 border-orange-500 pl-3">
                  More {recipe.category} Recipes
                </h2>
                <p className="text-sm text-gray-500 mt-1 pl-4">
                  You might also love these from the same category
                </p>
              </div>
              <Link
                href="/browse-recipes"
                className="text-orange-500 font-medium hover:underline text-sm flex items-center gap-1"
              >
                Browse all {recipe.category} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedRecipes
                .filter((r) => r._id !== id)
                .slice(0, 4)
                .map((r) => (
                  <Link
                    key={r._id}
                    href={`/recipes/${r._id}`}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={r.recipeImage}
                        alt={r.recipeName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        ⏱ {r.preparationTime} min
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-[#2A1A12] text-sm mb-3 line-clamp-1">
                        {r.recipeName}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold uppercase">
                            {r.authorName?.[0] || "U"}
                          </div>
                          <span className="text-xs text-gray-500">
                            {r.authorName}
                          </span>
                        </div>
                        <span className="text-xs text-rose-500 font-semibold">
                          ❤️ {r.likesCount || 0}
                        </span>
                      </div>
                      <button className="mt-3 w-full py-2 border border-orange-400 text-orange-500 text-xs font-semibold rounded-full hover:bg-orange-50 transition-colors">
                        View Recipe
                      </button>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
