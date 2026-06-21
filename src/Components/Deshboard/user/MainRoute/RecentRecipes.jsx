"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const RecentRecipes = () => {
  const { data: session, isPending } = useSession();
  const useremail = session?.user?.email;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/my-recipes?email=${useremail}`,
        );
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Recipe fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("এই recipe টি delete করতে চান?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:8080/recipes/${id}`, {
        method: "DELETE",
      });
      // Delete করার পর list থেকে সরাও
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm text-gray-400">Loading recipes...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Recent Recipes</h2>
        <Link
          href="/user/add-recipe"
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
        >
          + Add New Recipe
        </Link>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left pb-3 text-xs text-gray-400 font-medium uppercase tracking-wide">
              Recipe
            </th>
            <th className="text-left pb-3 text-xs text-gray-400 font-medium uppercase tracking-wide">
              Cook Time
            </th>
            <th className="text-left pb-3 text-xs text-gray-400 font-medium uppercase tracking-wide">
              Likes
            </th>
            <th className="text-left pb-3 text-xs text-gray-400 font-medium uppercase tracking-wide">
              Status
            </th>
            <th className="text-left pb-3 text-xs text-gray-400 font-medium uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) => (
            <tr
              key={recipe._id}
              className={
                index !== recipes.length - 1 ? "border-b border-gray-100" : ""
              }
            >
              {/* Recipe Name + Category */}
              <td className="py-3.5">
                <p className="text-gray-800 font-medium">{recipe.recipeName}</p>
                <p className="text-xs text-gray-400">
                  {recipe.category} · {recipe.cuisineType}
                </p>
              </td>

              {/* Cook Time */}
              <td className="py-3.5 text-gray-500">🕐 {recipe.prepTime} min</td>

              {/* Likes */}
              <td className="py-3.5 text-orange-500 font-medium flex items-center justify-center gap-2">
                ❤{recipe.likesCount}
              </td>

              {/* Status Badge */}
              <td className="py-3.5">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    recipe.status === "published"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {recipe.status}
                </span>
              </td>

              {/* Actions */}
              <td className="py-3.5">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/user/edit-recipe/${recipe._id}`}
                    className="border border-gray-200 text-gray-700 text-xs px-3.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="border border-orange-400 text-orange-500 text-xs px-3.5 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {recipes.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-8">
          কোনো recipe নেই। নতুন recipe যোগ করুন।
        </p>
      )}
    </div>
  );
};

export default RecentRecipes;
