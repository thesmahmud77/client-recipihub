const HomeHero = () => {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-16 px-4">
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
    </div>
  );
};

export default HomeHero;
