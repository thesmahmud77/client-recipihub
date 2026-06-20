const OverviewStats = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Recipe Uploads Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm text-gray-500 mb-2">Recipe Uploads</p>
        <div className="flex items-baseline justify-between gap-2 mb-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-gray-900">24</span>
            <span className="text-sm text-gray-500">recipes published</span>
          </div>
          {/* Unlimited Badge */}
          <span className="flex items-center gap-1 bg-orange-50 text-orange-500 border border-orange-100 rounded-full px-3 py-0.5 text-xs whitespace-nowrap">
            ♾️ Unlimited
          </span>
        </div>
        <p className="text-xs text-gray-400">
          As a Premium member, you can upload as many recipes as you like — no
          cap, no restrictions.
        </p>
      </div>

      {/* Profile Views Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm text-gray-500 mb-2">Profile Views</p>
        <div className="mb-2">
          <span className="text-3xl font-semibold text-gray-900">7,621</span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            className="size-4 text-green-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <span className="text-xs text-green-700 font-medium">
            +18% this month
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverviewStats;
