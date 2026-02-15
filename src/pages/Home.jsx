import HeroSection from "../components/home/HeroSection";
import RecipeCarousels from "../components/home/RecipeCarousels";
import HomeLayout from "../layouts/HomeLayout";

function Home() {
  return (
    <HomeLayout>
      <div className="space-y-12">
        <HeroSection />
        <RecipeCarousels />
      </div>
    </HomeLayout>
  );
}

export default Home;
