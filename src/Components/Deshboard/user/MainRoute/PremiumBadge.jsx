import { CrownDiamond, Gear, ShoppingCart } from "@gravity-ui/icons";

const PremiumBadge = ({ user }) => {
  return (
    <div className="rounded-2xl bg-[#1a1200] p-5 flex items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-4 flex-1">
        {/* Crown Icon */}
        <div className="w-11 h-11 rounded-full bg-[#2e2000] border-2 border-[#a06000] flex items-center justify-center shrink-0">
          <CrownDiamond className="size-5 text-amber-400" />
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <p className="text-[11px] font-medium text-amber-600 uppercase tracking-widest mb-0.5">
            Membership Status
          </p>
          <h2 className="text-xl font-medium text-amber-300 mb-1">
            Premium Member
          </h2>
          <p className="text-sm text-gray-500 mb-2.5">
            You have full, unlimited access to all RecipeHub premium features.
            Your culinary journey has no limits.
          </p>

          {/* Progress Bar + Renew Date */}
          <div className="flex items-center gap-2">
            <div className="w-20 h-1 rounded-full bg-amber-600" />
            <span className="text-xs text-gray-500">
              Renews on Dec 31, 2025
            </span>
          </div>
        </div>
      </div>

      {/* ডান পাশ — Price + Button */}
      <div className="flex flex-col items-end gap-2.5 shrink-0">
        <form action="/api/checkout_sessionss" method="POST">
          <section>
            <button
              type="submit"
              role="link"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-semibold rounded-xl px-5 py-3 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Purchase Recipe</span>
              <span className="bg-white/20 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md ml-0.5">
                $19.00
              </span>
            </button>
          </section>
        </form>

        <button className="flex items-center gap-1.5 bg-amber-300 text-amber-900 text-sm font-medium px-4 py-2 rounded-xl hover:bg-amber-200 transition-colors">
          <Gear className="size-4" />
          Update the plan
        </button>
      </div>
    </div>
  );
};

export default PremiumBadge;
