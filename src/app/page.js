import HomeHero from "@/Components/Homepage/hero";
import HeroRecipes from "@/Components/Homepage/HeroRecipes";
import HomeFeature from "@/Components/Homepage/HomeFeature";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HomeHero></HomeHero>
      <HomeFeature></HomeFeature>
      <HeroRecipes></HeroRecipes>
    </div>
  );
}
