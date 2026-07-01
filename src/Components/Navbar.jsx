"use client";
import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF7214",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign out!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Better-Auth signOut-এর সাকসেস হুক ব্যবহার করে রিডাইরেক্ট
          await signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/auth/signin"); // লগআউট সফল হলে লগইন পেজে নিয়ে যাবে
              },
            },
          });

          Swal.fire({
            icon: "success",
            title: "Signed Out!",
            text: "You have been logged out successfully.",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Logout error:", error);
          Swal.fire("Error", "Something went wrong during sign out.", "error");
        }
      }
    });
  };

  const navLinkClass = (path) =>
    pathname === path
      ? "text-amber-600 font-bold border-b-2 border-amber-600 pb-0.5"
      : "text-[#2A1A12] font-bold hover:text-amber-600 transition-colors";

  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* লোগো */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-[#2A1A12] tracking-tight"
        >
          smahmud77
        </Link>

        {/* নেভ লিঙ্ক */}
        <div className="flex items-center gap-8">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link
            href="/browse-recipes"
            className={navLinkClass("/browse-recipes")}
          >
            Browse Recipes
          </Link>
          {user && (
            <Link
              href={`/${user.role}`}
              className={navLinkClass(`/${user.role}`)}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* ইউজার সেকশন */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/profile"
                className="text-sm font-bold text-[#2A1A12] hover:text-amber-600 transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={handleLogOut}
                className="px-5 py-2 bg-[#FF7214] text-white text-sm font-semibold rounded-full hover:bg-[#e5650f] transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signup"
                className="text-sm font-bold text-[#2A1A12] hover:text-amber-600 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/auth/signin"
                className="px-5 py-2 bg-[#FF7214] text-white text-sm font-semibold rounded-full hover:bg-[#e5650f] transition-colors"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
