import Link from "next/link";
import { ShoppingCart } from "@gravity-ui/icons";
import { NodesRight } from "@gravity-ui/icons";

const RecipeDetailsPage = async ({ params }) => {
  const { id } = await params;

  // ১. মেইন রেসিপি ডাটা ফেচ
  const res = await fetch(`http://localhost:8080/recipes/${id}`, {
    cache: "no-cache",
  });
  const recipe = await res.json();

  // ২. রেসিপি ডাটা ডিস্ট্রাকচারিং
  const {
    recipeName,
    recipeImage,
    description,
    authorName,
    category,
    preparationTime,
    rating,
    reviewCount,
    likesCount,
    ingredients = [],
    instructions = [],
  } = recipe;

  // ৩. রিলেটেড রেসিপি ডাটা ফেচ
  const relatedRes = await fetch(
    `http://localhost:8080/recipes-related/${category}`,
    { cache: "no-cache" },
  );
  const relatedRecipes = await relatedRes.json();

  return (
    <div className=" min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* মেইন সেকশন: ব্যাকগ্রাউন্ড সাদা এবং রাউন্ডেড বক্স */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* বাম পাশ — ইমেজ সেকশন */}
            <div className="w-full md:w-1/2">
              <div className="rounded-xl overflow-hidden h-80 w-full">
                <img
                  src={recipeImage}
                  alt={recipeName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* ডান পাশ — কন্টেন্ট সেকশন (Flex ব্যবহার করে সাজানো) */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div className="space-y-4">
                {/* ক্যাটাগরি ট্যাগ */}
                <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {category}
                </span>

                {/* হেডিং বা নাম */}
                <h1 className="text-3xl font-extrabold text-gray-900">
                  {recipeName}
                </h1>

                {/* রেটিং এবং লাইক রো */}
                <div className="flex items-center gap-4 text-sm text-gray-600 font-medium">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400 text-base">★</span>
                    <span className="font-bold text-gray-800">
                      {rating || "4.9"}
                    </span>
                    <span className="text-gray-400">
                      ({reviewCount || "0"} reviews)
                    </span>
                  </div>
                  <span>❤️ {likesCount || 0} likes</span>
                  <span>⏱️ {preparationTime} min</span>
                </div>

                {/* ডেসক্রিপশন */}
                {description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                  </p>
                )}

                {/* শেফ বা অথর ইনফো */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center font-bold uppercase">
                    {authorName?.[0] || "U"}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">
                      {authorName}
                    </p>
                    <p className="text-xs text-gray-400">Recipe Creator</p>
                  </div>
                </div>
              </div>

              {/* অ্যাকশন বাটন */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors text-sm">
                  🔖 Save Recipe
                </button>
                <button className="px-5 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  ♡ Like
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <button className="flex items-center gap-2 bg-primary rounded-2xl px-5 py-3 cursor-pointer">
              <ShoppingCart></ShoppingCart>
              <span>Purchase Recipe</span>
              <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-lg ml-1">
                $4.99
              </span>
            </button>
            <button className="flex items-center gap-2 bg-secondary border-2 border-gray-300/50 rounded-2xl px-5 py-3 cursor-pointer">
              <NodesRight></NodesRight>
              <span>Share</span>
            </button>
          </div>
          <button className="flex items-center gap-2 bg-red-500 rounded-2xl px-5 py-3 cursor-pointer">
            Report
          </button>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 border-l-4 border-orange-500 pl-3 mb-6">
            More Quick Food Recipes
          </h2>

          {/* কার্ড গ্রিড লেআউট */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedRecipes
              .filter((r) => r._id !== id)
              .slice(0, 4)
              .map((r) => (
                <div
                  key={r._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-100 flex flex-col h-full justify-between hover:shadow-md transition-shadow"
                >
                  {/* কার্ডের উপরের অংশ (ইমেজ ও কন্টেন্ট) */}
                  <div>
                    <div className="relative h-44 w-full bg-gray-100">
                      <img
                        src={r.recipeImage}
                        alt={r.recipeName}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-xs">
                        ⏱ {r.preparationTime} min
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-gray-800 text-sm line-clamp-1">
                        {r.recipeName}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="font-medium truncate max-w-[90px]">
                          {r.authorName}
                        </span>
                        <span className="flex items-center gap-0.5 text-amber-500">
                          ★ {r.rating || "4.8"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* কার্ডের নিচের অংশ (বাটন - যা সবসময় সমান লাইনে থাকবে) */}
                  <div className="p-4 pt-0">
                    <Link
                      href={`/recipes/${r._id}`}
                      className="block w-full py-2 bg-gray-50 border border-gray-200 text-orange-500 text-xs font-bold rounded-xl hover:bg-orange-50 hover:border-orange-200 transition-colors text-center"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
