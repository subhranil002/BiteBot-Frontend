// Finalized

import HeroSection from "../components/home/HeroSection";
import RecipeCarousels from "../components/home/RecipeCarousels";
import HomeLayout from "../layouts/HomeLayout";

export default function Home() {
  return (
    <HomeLayout>
      {/* Vertical spacing between sections */}
      <div className="space-y-12">
        {/* Top banner / introduction section */}
        <HeroSection />

        {/* Recipe category carousels */}
        <RecipeCarousels />
      </div>
    </HomeLayout>
  );
}
