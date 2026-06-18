import React from "react";

const HomeHero = () => {
  return (
    <div clssName="min-h-screen flex-center">
      <div className="btn-gradient text-white text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full w-max">
        The Tastiest Place on the Internet
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight">
        Share, Discover & <span className="text-[#ff7a00]">Cook</span> the Best
        Recipes
      </h1>

      <p className="text-[#6b6b6b] text-base md:text-lg max-w-xl leading-relaxed">
        From quick weeknight dinners to gourmet weekend feasts — find, save, and
        share recipes you love.
      </p>
      {/* Static Search Bar */}
      <div className="w-full max-w-xl bg-white rounded-full shadow-md px-4 py-3 flex items-center gap-3 mt-2">
        {/* Search Icon */}
        {/* <Search className="text-[#aaaaaa] w-5 h-5 shrink-0" /> */}

        {/* Input */}
        <input
          type="text"
          placeholder="Search recipes, ingredients, or cuisines.."
          className="flex-1 text-sm text-[#333] placeholder:text-[#aaaaaa] outline-none bg-transparent"
        />

        {/* Divider */}
        <div className="w-px h-5 bg-[#e0e0e0] shrink-0" />

        {/* Search Button */}
        <button className="btn-gradient px-5 py-2 rounded-full text-sm font-semibold shrink-0">
          Search
        </button>
      </div>
    </div>
  );
};

export default HomeHero;
