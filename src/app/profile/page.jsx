"use client";

import PremiumBadge from "@/Components/Deshboard/user/MainRoute/PremiumBadge";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) return <p className="text-center mt-10">লোড হচ্ছে...</p>;
  if (!user) return <p className="text-center mt-10">অনুগ্রহ করে লগইন করুন।</p>;

  return (
    <div className="max-w-[1200px] min-h-screen mx-auto mt-10 p-8 bg-white border border-gray-200 rounded-3xl shadow-sm space-y-10">
      <div className="flex items-center justify-between border-b pb-4">
        <PremiumBadge />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12 bg-gray-50 p-8 rounded-2xl">
        <div className="flex-shrink-0">
          <img
            src={user.image || "/default-avatar.png"}
            alt={user.name}
            className="w-64 h-64 rounded-2xl object-cover border-4 border-white shadow-md"
          />
        </div>

        {/* ইউজার ডিটেইলস */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {user.name}
            </h1>
            <p className="text-lg text-gray-500 mt-1">{user.email}</p>
          </div>

          <p className="text-gray-600 max-w-xl leading-relaxed">
            "Welcome to my kitchen workspace! I am passionate about exploring
            traditional flavors, experimenting with fusion recipes, and sharing
            homemade love with food lovers worldwide."
          </p>

          <div className="pt-2">
            <Link
              href="/profile/update-user-info"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm shadow-amber-700/20"
            >
              Update Info
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-gray-100 bg-[#FFFBF7] rounded-2xl space-y-2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            My Activity
          </h3>
          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="text-3xl font-black text-gray-900">12</p>
              <p className="text-xs text-gray-500 font-medium">
                Recipes Shared
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900">145</p>
              <p className="text-xs text-gray-500 font-medium">
                Total Followers
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-gray-100 bg-[#FFFBF7] rounded-2xl space-y-2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            Cooking Style
          </h3>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg">
              Desserts
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg">
              Traditional Bengali
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg">
              Baking
            </span>
          </div>
        </div>

        <div className="p-6 border border-gray-100 bg-[#FFFBF7] rounded-2xl space-y-2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            Preferences
          </h3>
          <p className="text-xs text-gray-600 pt-1">
            Email Notifications:{" "}
            <span className="text-green-600 font-bold">Enabled</span>
          </p>
          <p className="text-xs text-gray-600">
            Account Security:{" "}
            <span className="text-amber-600 font-bold">
              Standard (Better-Auth)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
