"use client";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

const DeshboardAvater = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex flex-col items-center gap-3 p-6 border border-gray-200 rounded-2xl w-fit">
      {/* Avatar + Crown Badge */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-amber-500">
          <img src={user?.image} alt="" />
        </div>

        {/* Crown Badge */}
        <div className="absolute bottom-0 right-0 w-6 h-6 px-3 py-3 bg-black rounded-full flex items-center justify-center border-3 border-white">
          <span className="text-amber-600 text-xs">👑</span>
        </div>
      </div>

      {/* Name & Email */}
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">{user?.name}</h2>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      {/* Stats */}
      <div className="flex w-full border-t border-gray-200 pt-4 mt-1">
        <div className="flex-1 text-center border-r border-gray-200">
          <p className="text-lg font-medium">24</p>
          <p className="text-xs text-gray-500">Recipes</p>
        </div>
        <div className="flex-1 text-center border-r border-gray-200">
          <p className="text-lg font-medium">1.2k</p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-lg font-medium">8.4k</p>
          <p className="text-xs text-gray-500">Likes</p>
        </div>
      </div>
    </div>
  );
};

export default DeshboardAvater;
