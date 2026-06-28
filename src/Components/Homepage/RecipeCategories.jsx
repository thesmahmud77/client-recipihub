import Link from "next/link";

const RecipeCategories = async () => {
  const res = await fetch("https://server-recipihub.vercel.app/featured", {
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
            href="/browse-recipes"
            className="text-orange-500 font-medium hover:underline text-sm flex items-center gap-1"
          >
            See all featured <span>➔</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCategories;
