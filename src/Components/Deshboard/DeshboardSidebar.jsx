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
import { redirect } from "next/navigation";

const DeshboardSidebar = () => {
  const { data: session } = useSession();
  const user = session?.user;
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
    { icon: Circles3Plus, label: "Overview", href: "admin" },
    {
      icon: Persons,
      label: "Manage Users",
      href: "admin/manage-user",
    },
    {
      icon: PersonMagnifier,
      label: "Manage Recipes",
      href: "admin/manage-recipes",
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
      <aside className="flex flex-col gap-1 border-2 px-2 py-2 border-gray-700/20 rounded min-h-screen">
        {activeNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </Link>
        ))}
      </aside>
    </div>
  );
};

export default DeshboardSidebar;
