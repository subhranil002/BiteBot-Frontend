import { AiFillStar } from "react-icons/ai";
import { FaBolt, FaFire, FaGem, FaUser } from "react-icons/fa";

import RecipeCarousel from "../recipe/RecipeCarousel";

function RecipeCarousels() {
    // Hardcoded JSON data
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

    // Data processor
    const buildFromRawJson = () => {
        const merged = [...sampleRecipes];
        const getTotalTime = (r) => (r.prepMinutes || 0) + (r.cookMinutes || 0);

        const trending = [...merged]
            .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
            .slice(0, 8);

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
        <div className="container mx-auto px-4 py-8 space-y-12">
            {/* Trending */}
            {data.trending && (
                <section className="mb-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 text-primary">
                        <FaFire className="text-error" />
                        <span>Trending Now</span>
                    </h2>
                    <RecipeCarousel
                        recipes={data.trending}
                        onRecipeClick={() => {}}
                    />
                </section>
            )}

            {/* New Recipes */}
            {data.newest && (
                <section className="mb-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 text-primary">
                        <AiFillStar className="text-warning" />
                        <span>Fresh & New</span>
                    </h2>
                    <RecipeCarousel
                        recipes={data.newest}
                        onRecipeClick={() => {}}
                    />
                </section>
            )}

            {/* For You */}
            {data.forYou && (
                <section className="mb-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 text-primary">
                        <FaUser className="text-info" />
                        <span>Recommended for You</span>
                    </h2>
                    <RecipeCarousel
                        recipes={data.forYou}
                        onRecipeClick={() => {}}
                    />
                </section>
            )}

            {/* Quick & Easy */}
            {data.quickEasy && (
                <section className="mb-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 text-primary">
                        <FaBolt className="text-success" />
                        <span>Quick & Easy</span>
                    </h2>
                    <RecipeCarousel
                        recipes={data.quickEasy}
                        onRecipeClick={() => {}}
                    />
                </section>
            )}

            {/* Premium */}
            {data.premium && (
                <section className="mb-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 text-primary">
                        <FaGem className="text-secondary" />
                        <span>Premium Picks</span>
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
