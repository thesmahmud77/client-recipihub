import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* ১. ব্র্যান্ড এবং সোশ্যাল সেকশন (Left Column) */}
        <div className="md:col-span-4 flex flex-col space-y-5">
          <div className="flex items-center space-x-3">
            {/* কমলারঙা লোগো সার্কেল */}
            <div className="w-10 h-10 bg-[#FF7214] rounded-full flex items-center justify-center text-white font-black text-xl shadow-sm">
              R
            </div>
            <span className="text-xl font-bold text-[#2A1A12]">RecipeHub</span>
          </div>

          <p className="text-sm text-[#8A7970] leading-relaxed max-w-sm">
            A cozy place to discover, share, and celebrate the joy of cooking.
            Made with love for food lovers everywhere.
          </p>

          {/* সোশ্যাল মিডিয়া পিওর SVG আইকন গ্রুপ */}
          <div className="flex items-center space-x-3 pt-2">
            {[
              {
                // Instagram SVG
                svg: (
                  <svg
                    className="w-4 h-4 text-[#625046]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                ),
                href: "#",
              },
              {
                // Twitter / X SVG
                svg: (
                  <svg
                    className="w-4 h-4 text-[#625046]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                ),
                href: "#",
              },
              {
                // Youtube SVG
                svg: (
                  <svg
                    className="w-4 h-4 text-[#625046]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                    <polygon points="10 15 15 12 10 9" />
                  </svg>
                ),
                href: "#",
              },
              {
                // Facebook SVG
                svg: (
                  <svg
                    className="w-4 h-4 text-[#625046]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
                href: "#",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="w-9 h-9 rounded-full bg-[#F5EFEA] flex items-center justify-center hover:bg-[#EFE7DF] transition-colors"
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

        {/* ২. লিঙ্কস সেকশন (Middle Columns) */}
        <div className="md:col-span-5 grid grid-cols-3 gap-4 pt-2">
          {/* Explore Links */}
          <div>
            <h4 className="text-xs font-bold text-[#2A1A12] uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                "Browse Recipes",
                "Categories",
                "Featured",
                "New & Trending",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-[#8A7970] hover:text-[#FF7214] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-xs font-bold text-[#2A1A12] uppercase tracking-wider mb-4">
              Community
            </h4>
            <ul className="space-y-3">
              {[
                "Top Chefs",
                "Submit a Recipe",
                "Cookbook Club",
                "Newsletter",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-[#8A7970] hover:text-[#FF7214] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-xs font-bold text-[#2A1A12] uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Privacy Policy",
                "Terms of Service",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-[#8A7970] hover:text-[#FF7214] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ৩. নিউজলেটার সেকশন (Right Column) */}
        <div className="md:col-span-3 flex flex-col space-y-4 pt-2">
          <div>
            <h4 className="text-sm font-bold text-[#2A1A12] mb-1">
              Get weekly recipes
            </h4>
            <p className="text-xs text-[#8A7970] leading-relaxed">
              Fresh recipes delivered to your inbox every Sunday.
            </p>
          </div>

          <div className="flex flex-col space-y-2.5 w-full">
            {/* পিওর এইচটিএমএল/টেইলউইন্ড ইনপুট */}
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-[#FCF9F6] border border-[#F0E8E2] text-sm text-[#2A1A12] placeholder-[#C0B5AD] rounded-full focus:outline-none focus:border-[#FF7214] focus:ring-1 focus:ring-[#FF7214] transition-all"
            />

            {/* পিওর এইচটিএমএল/টেইলউইন্ড বাটন */}
            <button
              type="button"
              className="w-full py-3 bg-[#FF7214] text-white font-medium text-sm rounded-full shadow-sm hover:bg-[#E65F05] transition-colors active:scale-[0.99] transform"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
