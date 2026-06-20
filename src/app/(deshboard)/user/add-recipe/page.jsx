"use client";
import { useForm } from "react-hook-form";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AddRecipePage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data, status = "published") => {
    // Ingredients ও Instructions string থেকে array তে convert
    const ingredients = data.ingredients
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean);

    const instructions = data.instructions
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean);

    const recipeData = {
      recipeName: data.recipeName,
      recipeImage: data.recipeImage,
      category: data.category,
      cuisineType: data.cuisineType,
      difficultyLevel: data.difficultyLevel,
      preparationTime: Number(data.preparationTime),
      ingredients,
      instructions,
      authorId: user?.id,
      authorName: user?.name,
      authorEmail: user?.email,
      likesCount: 0,
      isFeatured: false,
      status,
    };

    try {
      const res = await fetch("http://localhost:8080/all-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });

      if (!res.ok) throw new Error("Failed to add recipe");

      alert("Recipe সফলভাবে যোগ হয়েছে!");
      router.push("/dashboard/user/my-recipes");
    } catch (error) {
      console.error(error);
      alert("কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add New Recipe</h1>
        <p className="text-sm text-gray-500">
          Share your culinary creation with the community
        </p>
      </div>

      <form className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-5">
        {/* Recipe Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Recipe Name
          </label>
          <input
            {...register("recipeName", { required: "Recipe name দিতে হবে" })}
            placeholder="e.g. Spicy Thai Basil Chicken"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 bg-gray-50"
          />
          {errors.recipeName && (
            <p className="text-xs text-red-500">{errors.recipeName.message}</p>
          )}
        </div>

        {/* Recipe Image */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Recipe Image
          </label>
          <div className="flex gap-3">
            <input
              {...register("recipeImage", { required: "Image URL দিতে হবে" })}
              placeholder="Paste image URL here..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 bg-gray-50"
            />
            <div className="w-36 border border-dashed border-orange-300 rounded-xl flex flex-col items-center justify-center gap-1 text-xs text-orange-400 cursor-pointer hover:bg-orange-50 transition-colors p-3">
              <span className="text-lg">☁️</span>
              <span>Drag & drop or click</span>
              <span className="text-orange-500 underline">via imgbb</span>
            </div>
          </div>
          {errors.recipeImage && (
            <p className="text-xs text-red-500">{errors.recipeImage.message}</p>
          )}
        </div>

        {/* Category + Cuisine + Difficulty */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register("category", { required: "Category select করুন" })}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-gray-50"
            >
              <option value="">Select category</option>
              <option value="Pasta">Pasta</option>
              <option value="Salad">Salad</option>
              <option value="Soup">Soup</option>
              <option value="Dessert">Dessert</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Main Course">Main Course</option>
              <option value="Snack">Snack</option>
              <option value="Beverage">Beverage</option>
            </select>
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Cuisine Type
            </label>
            <select
              {...register("cuisineType", { required: "Cuisine select করুন" })}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-gray-50"
            >
              <option value="">Select cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="Mexican">Mexican</option>
              <option value="Thai">Thai</option>
              <option value="Bangladeshi">Bangladeshi</option>
              <option value="American">American</option>
              <option value="Japanese">Japanese</option>
            </select>
            {errors.cuisineType && (
              <p className="text-xs text-red-500">
                {errors.cuisineType.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Difficulty Level
            </label>
            <select
              {...register("difficultyLevel", {
                required: "Difficulty select করুন",
              })}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-gray-50"
            >
              <option value="">Easy / Medium / Hard</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            {errors.difficultyLevel && (
              <p className="text-xs text-red-500">
                {errors.difficultyLevel.message}
              </p>
            )}
          </div>
        </div>

        {/* Preparation Time */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Cooking / Preparation Time
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              {...register("preparationTime", {
                required: "Time দিতে হবে",
                min: { value: 1, message: "কমপক্ষে ১ মিনিট" },
              })}
              placeholder="30"
              className="w-28 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 bg-gray-50"
            />
            <span className="text-sm text-gray-500">minutes</span>
          </div>
          {errors.preparationTime && (
            <p className="text-xs text-red-500">
              {errors.preparationTime.message}
            </p>
          )}
        </div>

        {/* Ingredients */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Ingredients
          </label>
          <textarea
            {...register("ingredients", { required: "Ingredients দিতে হবে" })}
            placeholder={
              "Enter ingredients, one per line\ne.g.\n200g Fettuccine\n2 tbsp Truffle oil"
            }
            rows={5}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 bg-gray-50 resize-none"
          />
          {errors.ingredients && (
            <p className="text-xs text-red-500">{errors.ingredients.message}</p>
          )}
        </div>

        {/* Instructions */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Instructions
          </label>
          <textarea
            {...register("instructions", { required: "Instructions দিতে হবে" })}
            placeholder={
              "Enter step-by-step cooking instructions, one per line\ne.g.\nBoil pasta.\nMix oil and cheese."
            }
            rows={5}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 bg-gray-50 resize-none"
          />
          {errors.instructions && (
            <p className="text-xs text-red-500">
              {errors.instructions.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, "published"))}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60"
          >
            🚀 {isSubmitting ? "Publishing..." : "Publish Recipe"}
          </button>
          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, "draft"))}
            disabled={isSubmitting}
            className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            Save Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipePage;
