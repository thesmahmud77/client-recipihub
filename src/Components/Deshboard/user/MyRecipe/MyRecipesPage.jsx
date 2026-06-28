"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Swal from "sweetalert2";

const MyRecipesPage = () => {
  const { data: session, isPending } = useSession();
  const useremail = session?.user?.email;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://server-recipihub.vercel.app/my-recipes?email=${useremail}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        console.log(data);
      });
  }, [useremail]);

  const handleDelete = async (id) => {
    try {
      const resDelete = await fetch(
        `https://server-recipihub.vercel.app/recipe-delete-from-own-email/${id}`,
        {
          method: "DELETE",
        },
      );

      if (resDelete) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Report has been deleted successfully.",
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
    <div className="p-6 w-[1000px]">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Recipes</h1>
        <p className="text-sm text-gray-500">
          Manage and edit your published recipes
        </p>
      </div>

      {/* Sub Header — count + Add button */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {recipes.length} recipes published
        </p>
        <Link
          href="/user/add-recipe"
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
        >
          + Add New Recipe
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wide">
                Recipe
              </th>
              <th className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wide">
                Category
              </th>
              <th className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wide">
                Likes
              </th>
              <th className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wide">
                Status
              </th>
              <th className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {recipes.map((recipe, index) => (
              <tr
                key={recipe._id}
                className={`hover:bg-gray-50 transition-colors ${
                  index !== recipes.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Recipe Image + Name */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={recipe.recipeImage}
                      alt={recipe.recipeName}
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                    />
                    <p className="text-gray-800 font-medium">
                      {recipe.recipeName}
                    </p>
                  </div>
                </td>

                {/* Category Badge */}
                <td className="px-5 py-4">
                  <span className="bg-orange-50 text-orange-500 text-xs px-3 py-1 rounded-full font-medium">
                    {recipe.category}
                  </span>
                </td>

                {/* Likes */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    :{recipe.likesCount || 0}
                  </div>
                </td>

                {/* Status Badge */}
                <td className="px-5 py-4">
                  {recipe.isFeatured ? (
                    <span className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 w-fit">
                      🔒 Premium
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium w-fit block">
                      Regular
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/recipes/${recipe._id}`}
                      className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-500"
                    >
                      <svg
                        className="size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </Link>

                    <Link
                      href={`/dashboard/user/edit-recipe/${recipe._id}`}
                      className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-500"
                    >
                      <svg
                        className="size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                        />
                      </svg>
                    </Link>

                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="w-8 h-8 flex items-center justify-center border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-400"
                    >
                      <svg
                        className="size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm mb-3">কোনো recipe নেই।</p>
            <Link
              href="/user/add-recipe"
              className="text-orange-500 text-sm font-medium underline"
            >
              নতুন recipe যোগ করুন
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipesPage;
