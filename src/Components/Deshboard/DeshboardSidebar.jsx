"use client";
import { useSession } from "@/lib/auth-client";
import {
  Sparkles,
  CirclePlus,
  Receipt,
  PersonMagnifier,
  Circles3Plus,
  Persons,
  Comments,
  CircleDollar,
} from "@gravity-ui/icons";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const DeshboardSidebar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  //   console.log("User from Deshboard Sidebar", user);
  if (!user) {
    redirect("/auth/signin");
  }

  const userItems = [
    { icon: Circles3Plus, label: "Overview", href: "/user" },
    { icon: Sparkles, label: "My Recipes", href: "/user/my-recipes" },
    { icon: CirclePlus, label: "Add Recipe", href: "/user/add-recipe" },
    {
      icon: Receipt,
      label: "Purchased Recipe",
      href: "/user/purchased-recipe",
    },
  ];
  const adminItems = [
    { icon: Circles3Plus, label: "Overview", href: "/admin" },
    {
      icon: Persons,
      label: "Manage Users",
      href: "/admin/manage-users",
    },
    {
      icon: PersonMagnifier,
      label: "Manage Recipes",
      href: "/admin/manage-recipes",
    },
    { icon: Comments, label: "Reports", href: "/admin/reports" },
    {
      icon: CircleDollar,
      label: "Transactions",
      href: "/admin/transactions",
    },
  ];

  const activeNavItems = user.role === "admin" ? adminItems : userItems;

  return (
    <div>
      <aside className="flex flex-col gap-1 border-2 px-5 py-8 min-h-screen w-[220px] rounded-2xl bg-white border-2 border-gray-700/30">
        {activeNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon
                className={`size-5 ${isActive ? "text-white" : "text-gray-500"}`}
              />
              {item.label}
            </Link>
          );
        })}
      </aside>
    </div>
  );
};

export default DeshboardSidebar;
