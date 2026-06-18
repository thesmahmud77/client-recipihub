const HomeRating = () => {
  const stats = [
    { icon: "🍽️", number: "12,400+", label: "Recipes Shared" },
    { icon: "👨‍🍳", number: "84,000+", label: "Active Cooks" },
    { icon: "⭐", number: "4.9", label: "Average Rating" },
    { icon: "🏆", number: "320+", label: "Featured Chefs" },
  ];
  return (
    <section className="bg-orange-500 py-10 px-6 mt-15">
      <div className="flex items-center justify-between w-full ">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-3 py-4 px-25 ${
              index !== stats.length - 1 ? "border-r border-white/30" : ""
            }`}
          >
            {/* Icon Circle */}
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl">
              {stat.icon}
            </div>

            {/* Number */}
            <p className="text-white text-2xl font-bold leading-none">
              {stat.number}
            </p>

            {/* Label */}
            <p className="text-white/85 text-sm text-center">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeRating;
