const PremiumFeatures = () => {
  const features = [
    { icon: "♾️", label: "Unlimited Recipe Uploads" },
    { icon: "⭐", label: "Featured Recipe Eligibility" },
    { icon: "⚡", label: "Priority in Search Results" },
    { icon: "🚫", label: "Ad-Free Experience" },
    { icon: "📚", label: "Access to Exclusive Collections" },
    { icon: "✅", label: "Verified Chef Badge" },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 w-full">
      <h2 className="text-lg font-semibold ">Your Premium Features</h2>

      <div className="grid grid-cols-3 gap-2.5">
        {features.map((feature) => (
          <div
            key={feature.label}
            className="flex items-center justify-between bg-orange-50 border-2 border-orange-300 rounded-xl px-3 py-3"
          >
            {/* Icon + Label */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 text-base shrink-0">
                {feature.icon}
              </div>
              <span className="text-sm text-gray-800">{feature.label}</span>
            </div>

            {/* Check icon */}
            <svg
              className="size-5 text-green-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumFeatures;
