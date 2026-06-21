import Link from "next/link";
import { ShoppingCart, NodesRight } from "@gravity-ui/icons";

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
  } = recipe;

  // ৩. রিলেটেড রেসিপি ডাটা ফেচ
  const relatedRes = await fetch(
    `http://localhost:8080/recipes-related/${category}`,
    { cache: "no-cache" },
  );
  const relatedRecipes = await relatedRes.json();

  // Favorite API

  const handleFavorite = async () => {
    // এখানে আপনার সেশন থেকে ইউজারের ইমেইল নিতে হবে (যেমন: const email = session?.user?.email)
    const userEmail = "sajjad@example.com"; // উদাহরণস্বরূপ

    if (!userEmail) {
      alert("প্রথমে লগইন করুন।");
      return;
    }

    setLoading(true);

    // ডুপ্লিকেট _id এরর এড়াতে আইডি আলাদা করে বাকি ডাটা স্প্রেড করা
    const { _id, ...restOfRecipe } = recipe;

    const favoritePayload = {
      recipeId: _id,
      userEmail,
      savedAt: new Date(),
      ...restOfRecipe, // ড্যাশবোর্ডে কার্ডের জন্য সব ডাটা ফ্ল্যাট আকারে যাবে
    };

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-8 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* মেইন কার্ড সেকশন */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">
            {/* বাম পাশ — ইমেজ সেকশন */}
            <div className="w-full md:w-1/2">
              <div className="rounded-xl overflow-hidden h-80 w-full shadow-2xs">
                <img
                  src={recipeImage}
                  alt={recipeName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* ডান পাশ — কন্টেন্ট সেকশন */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div className="space-y-4">
                {/* ক্যাটাগরি ট্যাগ */}
                <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {category}
                </span>

                {/* রেসিপি নাম */}
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                  {recipeName}
                </h1>

                {/* রেটিং এবং লাইক ইনফো */}
                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-500 font-medium border-y border-gray-50 py-2">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400 text-base">★</span>
                    <span className="font-bold text-gray-800">
                      {rating || "4.9"}
                    </span>
                    <span className="text-gray-400">
                      ({reviewCount || "0"} reviews)
                    </span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span>❤️ {likesCount || 0} likes</span>
                  <span className="text-gray-300">|</span>
                  <span>⏱️ {preparationTime} min</span>
                </div>

                {/* ডেসক্রিপশন */}
                {description && (
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {description}
                  </p>
                )}

                {/* শেফ বা অথর ইনফো */}
                <div className="flex items-center gap-3 p-3 bg-[#FDFBF7] rounded-xl border border-gray-50/50">
                  <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold uppercase text-xs">
                    {authorName?.[0] || "U"}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-xs md:text-sm">
                      {authorName}
                    </p>
                    <p className="text-[11px] text-gray-400">Recipe Creator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === নতুন ইউনিফাইড অ্যাকশন বাটন সেকশন === */}
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

          {/* 4. Favorite Button */}
          <button
            onClick={() => handleFavorite()}
            className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs md:text-sm font-medium rounded-xl px-4 py-3 border border-gray-200/60 transition-colors cursor-pointer"
          >
            <span>⭐</span>
            <span>Favorite</span>
          </button>

          {/* 5. Report Button */}
          <button className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs md:text-sm font-semibold rounded-xl px-4 py-3 border border-red-100/70 transition-colors cursor-pointer sm:ml-auto">
            <span>⚠️</span>
            <span>Report</span>
          </button>
        </div>

        {/* রিলেটেড রেসিপি সেকশন */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-800 border-l-4 border-orange-500 pl-3 mb-4">
            More Quick Food Recipes
          </h2>

          {/* কার্ড গ্রিড লেআউট */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedRecipes
              ?.filter((r) => r._id !== id)
              ?.slice(0, 4)
              ?.map((r) => (
                <div
                  key={r._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-100 flex flex-col h-full justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative h-40 w-full bg-gray-100">
                      <img
                        src={r.recipeImage}
                        alt={r.recipeName}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs">
                        ⏱ {r.preparationTime} min
                      </span>
                    </div>

                    <div className="p-4 space-y-1.5">
                      <h3 className="font-bold text-gray-800 text-xs line-clamp-1">
                        {r.recipeName}
                      </h3>
                      <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span className="font-medium truncate max-w-[90px]">
                          {r.authorName}
                        </span>
                        <span className="flex items-center gap-0.5 text-amber-500">
                          ★ {r.rating || "4.8"}
                        </span>
                      </div>
                    </div>
                  </div>

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
