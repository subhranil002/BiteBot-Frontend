import RecipeCard from "../recipe/RecipeCard";

const RecipeGrid = () => {
    const recipes = [
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

    return (
        <section className="container mx-auto px-6 py-16 bg-gradient-to-b from-white via-orange-50/40 to-amber-50/40">
            {/* Header Bar */}
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                    More Recipes
                </h2>
                <button
                    onClick={() => {}}
                    className="px-5 py-2.5 text-sm font-medium rounded-full border border-orange-200 text-orange-600 hover:bg-orange-100 transition-all duration-200"
                >
                    Browse All →
                </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        className="h-full"
                    />
                ))}
            </div>

            {/* No Results */}
            {recipes.length === 0 && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl text-orange-500">🔍</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        No recipes found
                    </h3>
                    <p className="text-gray-500">
                        Try browsing our featured categories above.
                    </p>
                </div>
            )}
        </section>
    );
};

export default RecipeGrid;
