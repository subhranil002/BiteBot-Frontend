import { AiFillStar } from "react-icons/ai";
import { FaBolt, FaFire, FaGem, FaUser } from "react-icons/fa";
import RecipeCarousel from "../recipe/RecipeCarousel";

function RecipeCarousels() {
    const sampleRecipes = [
        {
            id: "r1",
            title: "Spicy Chickpea Curry",
            description:
                "A hearty and flavorful curry that's perfect for weeknight dinners. Packed with protein and aromatic spices.",
            prepMinutes: 15,
            cookMinutes: 25,
            servings: 4,
            rating: 4.8,
            tags: ["vegetarian", "gluten-free", "spicy"],
            cuisine: "Indian",
            isPremium: false,
            heroImage:
                "https://thehappyfoodie.co.uk/wp-content/uploads/2023/06/106_SpicyButterTomatoWhiteFish1-1229x1536.jpg",
        },
        {
            id: "r2",
            title: "Chef's Secret Truffle Pasta",
            description:
                "An indulgent pasta dish featuring real truffle oil and aged parmesan. A restaurant-quality experience at home.",
            prepMinutes: 10,
            cookMinutes: 12,
            servings: 2,
            rating: 4.9,
            tags: ["premium", "contains-dairy", "luxury"],
            cuisine: "Italian",
            isPremium: true,
            heroImage:
                "https://thehappyfoodie.co.uk/wp-content/uploads/2023/06/106_SpicyButterTomatoWhiteFish1-1229x1536.jpg",
        },
        {
            id: "r3",
            title: "Mediterranean Buddha Bowl",
            description:
                "A colorful and nutritious bowl packed with fresh vegetables, quinoa, and tahini dressing.",
            prepMinutes: 20,
            cookMinutes: 15,
            servings: 2,
            rating: 4.6,
            tags: ["vegetarian", "healthy", "gluten-free", "fresh"],
            cuisine: "Mediterranean",
            isPremium: false,
            heroImage:
                "https://thehappyfoodie.co.uk/wp-content/uploads/2023/06/106_SpicyButterTomatoWhiteFish1-1229x1536.jpg",
        },
        {
            id: "r4",
            title: "Quick Lemon Garlic Salmon",
            description:
                "A fresh and zesty salmon dish that comes together in under 20 minutes.",
            prepMinutes: 8,
            cookMinutes: 12,
            servings: 2,
            rating: 4.7,
            tags: ["pescatarian", "quick"],
            cuisine: "Mediterranean",
            isPremium: false,
            heroImage:
                "https://thehappyfoodie.co.uk/wp-content/uploads/2023/06/106_SpicyButterTomatoWhiteFish1-1229x1536.jpg",
        },
        {
            id: "r5",
            title: "Classic Caesar Salad",
            description:
                "A crisp and creamy Caesar salad with homemade dressing and crunchy croutons.",
            prepMinutes: 15,
            cookMinutes: 0,
            servings: 2,
            rating: 4.5,
            tags: ["vegetarian", "quick"],
            cuisine: "American",
            isPremium: false,
            heroImage:
                "https://thehappyfoodie.co.uk/wp-content/uploads/2023/06/106_SpicyButterTomatoWhiteFish1-1229x1536.jpg",
        },
        {
            id: "r6",
            title: "Premium Wagyu Steak",
            description:
                "Juicy Wagyu beef steak seared to perfection with a buttery crust.",
            prepMinutes: 5,
            cookMinutes: 15,
            servings: 1,
            rating: 5.0,
            tags: ["premium", "high-protein"],
            cuisine: "French",
            isPremium: true,
            heroImage:
                "https://thehappyfoodie.co.uk/wp-content/uploads/2023/06/106_SpicyButterTomatoWhiteFish1-1229x1536.jpg",
        },
        {
            id: "r7",
            title: "Healthy Quinoa Salad",
            description:
                "A light and healthy quinoa salad with fresh vegetables and herbs.",
            prepMinutes: 20,
            cookMinutes: 15,
            servings: 3,
            rating: 4.4,
            tags: ["vegan", "gluten-free", "healthy"],
            cuisine: "Fusion",
            isPremium: false,
            heroImage:
                "https://thehappyfoodie.co.uk/wp-content/uploads/2023/06/106_SpicyButterTomatoWhiteFish1-1229x1536.jpg",
        },
        {
            id: "r8",
            title: "Spicy Korean Kimchi Ramen",
            description:
                "A bold and flavorful ramen with kimchi and a kick of spice.",
            prepMinutes: 10,
            cookMinutes: 15,
            servings: 1,
            rating: 4.6,
            tags: ["spicy", "vegetarian"],
            cuisine: "Korean",
            isPremium: false,
            heroImage:
                "https://thehappyfoodie.co.uk/wp-content/uploads/2023/06/106_SpicyButterTomatoWhiteFish1-1229x1536.jpg",
        },
    ];

    const buildFromRawJson = () => {
        const merged = [...sampleRecipes];
        const getTotalTime = (r) => (r.prepMinutes || 0) + (r.cookMinutes || 0);

        const trending = [...merged].slice(0, 8);
        const newest = [...sampleRecipes].slice(0, 8);
        const forYou = [...merged].slice(0, 8);
        const premium = merged.filter((r) => r.isPremium).slice(0, 8);
        const quickEasy = merged
            .filter(
                (r) => (r.tags || []).includes("quick") || getTotalTime(r) <= 30
            )
            .slice(0, 8);

        return { trending, newest, forYou, premium, quickEasy };
    };

    const data = buildFromRawJson();

    return (
        <div className="container mx-auto px-6 py-16 space-y-20 bg-gradient-to-b from-white via-orange-50/40 to-amber-50/50">
            {/* Trending */}
            {data.trending && (
                <section className="space-y-6">
                    <h2 className="flex items-center gap-3 text-3xl font-extrabold text-gray-800">
                        <FaFire className="text-orange-500 drop-shadow-sm" />
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Trending Now
                        </span>
                    </h2>
                    <RecipeCarousel
                        recipes={data.trending}
                        onRecipeClick={() => {}}
                    />
                </section>
            )}

            {/* New Recipes */}
            {data.newest && (
                <section className="space-y-6">
                    <h2 className="flex items-center gap-3 text-3xl font-extrabold text-gray-800">
                        <AiFillStar className="text-yellow-500 drop-shadow-sm" />
                        <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                            Fresh & New
                        </span>
                    </h2>
                    <RecipeCarousel
                        recipes={data.newest}
                        onRecipeClick={() => {}}
                    />
                </section>
            )}

            {/* For You */}
            {data.forYou && (
                <section className="space-y-6">
                    <h2 className="flex items-center gap-3 text-3xl font-extrabold text-gray-800">
                        <FaUser className="text-blue-500 drop-shadow-sm" />
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                            Recommended for You
                        </span>
                    </h2>
                    <RecipeCarousel
                        recipes={data.forYou}
                        onRecipeClick={() => {}}
                    />
                </section>
            )}

            {/* Quick & Easy */}
            {data.quickEasy && (
                <section className="space-y-6">
                    <h2 className="flex items-center gap-3 text-3xl font-extrabold text-gray-800">
                        <FaBolt className="text-green-500 drop-shadow-sm" />
                        <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                            Quick & Easy
                        </span>
                    </h2>
                    <RecipeCarousel
                        recipes={data.quickEasy}
                        onRecipeClick={() => {}}
                    />
                </section>
            )}

            {/* Premium */}
            {data.premium && (
                <section className="space-y-6">
                    <h2 className="flex items-center gap-3 text-3xl font-extrabold text-gray-800">
                        <FaGem className="text-purple-500 drop-shadow-sm" />
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Premium Picks
                        </span>
                    </h2>
                    <RecipeCarousel
                        recipes={data.premium}
                        onRecipeClick={() => {}}
                    />
                </section>
            )}
        </div>
    );
}

export default RecipeCarousels;
