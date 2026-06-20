"use client";
import { useSession } from "@/lib/auth-client";
import { House } from "@gravity-ui/icons";
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
    { icon: House, label: "Overview", href: "/user" },
    { icon: House, label: "Profile", href: "/user/profile" },
    { icon: House, label: "My Recipes", href: "/user/my-recipes" },
    { icon: House, label: "Add Recipe", href: "/user/add-recipe" },
    {
      icon: House,
      label: "Purchased Recipe",
      href: "/user/purchased-recipe",
    },
  ];
  const adminItems = [
    { icon: House, label: "Home", href: "admin" },
    {
      icon: House,
      label: "Manage Users",
      href: "admin/manage-user",
    },
    {
      icon: House,
      label: "Manage Recipes",
      href: "admin/manage-recipes",
    },
    { icon: House, label: "Reports", href: "/admin/reports" },
    {
      icon: House,
      label: "Transactions",
      href: "/admin/transactions",
    },
  ];

  const activeNavItems = user.role === "admin" ? adminItems : userItems;

  return (
    <div>
      <aside className="flex flex-col gap-1">
        {activeNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
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
