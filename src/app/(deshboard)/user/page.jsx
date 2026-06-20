import OverviewStats from "@/Components/Deshboard/user/MainRoute/OverviewStats";
import PremiumBadge from "@/Components/Deshboard/user/MainRoute/PremiumBadge";
import PremiumFeatures from "@/Components/Deshboard/user/MainRoute/PremiumFeatures";
import RecentRecipes from "@/Components/Deshboard/user/MainRoute/RecentRecipes";
import { Receipt } from "@gravity-ui/icons";

const UserDeshbordHomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 my-30">
      <PremiumBadge></PremiumBadge>
      <PremiumFeatures></PremiumFeatures>
      <OverviewStats></OverviewStats>
      <RecentRecipes></RecentRecipes>
    </div>
  );
};

export default UserDeshbordHomePage;
