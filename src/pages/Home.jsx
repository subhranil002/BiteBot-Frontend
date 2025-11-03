import HeroSection from "../components/home/HeroSection";
import RecipeCarousels from "../components/home/RecipeCarousels";
// import RecipeGrid from "../components/home/RecipeGrid";
import HomeLayout from "../layouts/HomeLayout";

function Home() {
  return (
    <HomeLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        {<HeroSection />}
        {/* Recipe Carousels */}
        <RecipeCarousels />
        {/* Recipe Grid/List */}
        {/* <RecipeGrid /> */}
      </div>
    </HomeLayout>
  );
}

export default Home;
