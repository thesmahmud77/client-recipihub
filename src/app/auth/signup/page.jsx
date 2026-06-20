"use client";
import { useForm } from "react-hook-form";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IMGBB_KEY = "d11b800a59dcca4d8f9ddb86c014f5f7";

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-orange-400 bg-white";
const selectClass =
  "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-orange-400 bg-white";
const textareaClass =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-orange-400 bg-white resize-none";

const AddRecipePage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // imgbb তে image upload
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.data.url;
  };

  // Preview দেখানো
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data, status = "published") => {
    try {
      setUploading(true);

      // ১. imgbb তে image upload করো
      const imgFile = data.photo[0];
      const recipeImage = await uploadImage(imgFile);

      // ২. ingredients ও instructions → array তে convert
      const ingredients = data.ingredients
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean);

      const instructions = data.instructions
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean);

      // ৩. পুরো recipe object তৈরি
      const recipeData = {
        recipeName: data.recipeName,
        recipeImage, // imgbb থেকে পাওয়া URL
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
        createdAt: new Date().toISOString(),
      };

      // ৪. Backend API তে POST করো
      const res = await fetch("http://localhost:8080/all-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });

      if (!res.ok) throw new Error("Recipe add করতে সমস্যা হয়েছে");

      alert("Recipe সফলভাবে যোগ হয়েছে!");
      router.push("/dashboard/user/my-recipes");
    } catch (error) {
      console.error(error);
      alert("কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setUploading(false);
    }
  };

  const isLoading = isSubmitting || uploading;

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
            className={inputClass}
          />
          {errors.recipeName && (
            <p className="text-xs text-red-500">{errors.recipeName.message}</p>
          )}
        </div>

        {/* Recipe Image — imgbb upload */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Recipe Image
          </label>
          <div className="flex gap-3">
            {/* Preview Box */}
            <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden bg-gray-50 min-h-[100px] flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover max-h-40"
                />
              ) : (
                <p className="text-sm text-gray-400">
                  Image preview এখানে দেখাবে
                </p>
              )}
            </div>

            {/* Upload Button */}
            <label className="w-36 border-2 border-dashed border-orange-300 rounded-xl flex flex-col items-center justify-center gap-1 text-xs text-orange-400 cursor-pointer hover:bg-orange-50 transition-colors p-3">
              <span className="text-2xl">☁️</span>
              <span className="text-center">
                Drag & drop or click to upload
              </span>
              <span className="text-orange-500 underline font-medium">
                via imgbb
              </span>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: "Image select করতে হবে" })}
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          {errors.photo && (
            <p className="text-xs text-red-500">{errors.photo.message}</p>
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
              className={selectClass}
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
              className={selectClass}
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
              className={selectClass}
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
              className={`w-28 ${inputClass}`}
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
          <p className="text-xs text-gray-400">
            প্রতিটি ingredient আলাদা line এ লিখুন
          </p>
          <textarea
            {...register("ingredients", { required: "Ingredients দিতে হবে" })}
            placeholder={"200g Fettuccine\n2 tbsp Truffle oil\n50g Parmesan"}
            rows={5}
            className={textareaClass}
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
          <p className="text-xs text-gray-400">
            প্রতিটি step আলাদা line এ লিখুন
          </p>
          <textarea
            {...register("instructions", { required: "Instructions দিতে হবে" })}
            placeholder={
              "Boil pasta.\nMix oil and cheese.\nToss pasta in sauce."
            }
            rows={5}
            className={textareaClass}
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
            disabled={isLoading}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60"
          >
            🚀 {isLoading ? "Publishing..." : "Publish Recipe"}
          </button>
          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, "draft"))}
            disabled={isLoading}
            className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            {isLoading ? "Saving..." : "Save Draft"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipePage;
