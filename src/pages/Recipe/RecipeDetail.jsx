import { useEffect, useState } from "react";
import {
    FaClock,
    FaCrown,
    FaDollarSign,
    FaHeart,
    FaPrint,
    FaShareAlt,
    FaStar,
    FaUsers,
    FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import RecipeCard from "../../components/recipe/RecipeCard";
import HomeLayout from "../../layouts/HomeLayout";

const HARDCODED_CHEF = {
    id: "chef-77",
    name: "Asha Roy",
    rating: 4.8,
    recipes: [{ id: "r1" }, { id: "r2" }],
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60",
};

const HARDCODED_RECIPE = {
    id: "recipe-123",
    title: "Spicy Fish Curry",
    description:
        "A fragrant, tangy Bengali fish curry with mustard and spices. Great with steamed rice.",
    heroImage:
        "https://tse4.mm.bing.net/th/id/OIP.yegn3aAPGUyQs6Ko3z2TNQAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    chefId: HARDCODED_CHEF.id,
    isPremium: false,
    cuisine: "Bengali",
    difficulty: "Medium",
    tags: ["seafood", "curry", "spicy"],
    servings: 4,
    prepMinutes: 20,
    cookMinutes: 30,
    rating: 4.6,
    reviewCount: 128,
    ingredients: [
        { name: "Rohu fish", quantity: 1, unit: "kg", pricePerUnit: 6.5 },
        { name: "Mustard paste", quantity: 0.05, unit: "kg", pricePerUnit: 40 },
        { name: "Turmeric", quantity: 0.02, unit: "kg", pricePerUnit: 10 },
        { name: "Salt", quantity: 0.01, unit: "kg", pricePerUnit: 2 },
    ],
    steps: [
        {
            step: 1,
            text: "Clean and cut the fish. Marinate with salt and turmeric.",
            timeMinutes: 0,
        },
        { step: 2, text: "Fry the fish lightly until golden.", timeMinutes: 8 },
        {
            step: 3,
            text: "Prepare mustard paste and temper with spices.",
            timeMinutes: 10,
        },
        { step: 4, text: "Cook fish with gravy until done.", timeMinutes: 12 },
    ],
};

const SAMPLE_RELATED = [
    {
        id: "r1",
        title: "Rosogolla (Soft Bengali Sweet)",
        heroImage:
            "https://happietrio.com/wp-content/uploads/2016/10/DSC_1656.jpg",
        description:
            "Soft, syrupy cheese balls simmered in light sugar syrup — an iconic Bengali sweet that's melt-in-your-mouth delightful.",
        isPremium: false,
        isTrending: true,
        servings: 8,
        cuisine: "Bengali",
        tags: ["Dessert", "Sweets", "Vegetarian"],
    },
    {
        id: "r2",
        title: "Spicy Fish Curry",
        heroImage:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=60",
        description:
            "A bold, tangy fish curry with mustard and poppy seed flavors, perfect with steamed rice or rustic rotis.",
        isPremium: true,
        isTrending: false,
        servings: 4,
        cuisine: "Indian",
        tags: ["Seafood", "Dinner", "Spicy"],
    },
];

function RecipeDetail() {
    const [recipe] = useState(HARDCODED_RECIPE);
    const [chef] = useState(HARDCODED_CHEF);
    const [relatedRecipes] = useState(SAMPLE_RELATED);
    const [isFavorited, setIsFavorited] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [nutritionData, setNutritionData] = useState(null);

    useEffect(() => {
        const cost = recipe.ingredients.reduce((sum, ing) => {
            return sum + Number(ing.quantity) * Number(ing.pricePerUnit);
        }, 0);
        setTotalCost(cost);

        setNutritionData({
            calories: 250 + recipe.ingredients.length * 40,
            protein: 12 + recipe.ingredients.length * 3,
            carbs: 18 + recipe.ingredients.length * 2,
            fat: 8 + recipe.ingredients.length * 1,
            fiber: 2 + recipe.ingredients.length * 0.5,
            sugar: 3 + recipe.ingredients.length * 0.3,
        });
    }, [recipe]);

    const handleFavorite = () => {
        setIsFavorited((s) => !s);
        // intentionally no toast or external side-effects
    };

    const handleShare = () => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const totalTime = recipe.prepMinutes + recipe.cookMinutes;
    const costPerServing = recipe.servings
        ? totalCost / recipe.servings
        : totalCost;

    return (
        <HomeLayout>
            <div className="min-h-screen relative bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 overflow-hidden">
                {/* ✨ Floating gradient lights for futuristic depth */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                    <div className="max-w-6xl mx-auto space-y-10">
                        {/* 🍛 Hero Section */}
                        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-orange-100">
                            <img
                                src={recipe.heroImage}
                                alt={recipe.title}
                                className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                            <div className="absolute bottom-8 left-6 sm:left-10">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
                                    {recipe.title}
                                </h1>
                                <p className="text-sm sm:text-base text-white/90 max-w-lg mt-1">
                                    {recipe.description}
                                </p>
                            </div>
                        </div>

                        {/* 🌶️ Main Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left (Main content) */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* 👩‍🍳 Chef Info */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/60 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-md shadow-orange-100 hover:shadow-orange-200/60 transition-transform hover:-translate-y-1">
                                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                        <img
                                            src={chef.avatar}
                                            alt={chef.name}
                                            className="w-14 h-14 rounded-full border-2 border-orange-200 object-cover"
                                        />
                                        <div>
                                            <Link
                                                to={`/profile/${chef.id}`}
                                                className="font-semibold text-gray-800 hover:text-orange-500 transition-colors"
                                            >
                                                {chef.name}
                                            </Link>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <FaStar className="text-yellow-400" /> {chef.rating} •{" "}
                                                {chef.recipes.length} recipes
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 rounded-xl border border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 flex items-center justify-center">
                                        <FaHeart className="mr-2 text-orange-500" /> Subscribe
                                    </button>
                                </div>

                                {/* ⏱️ Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { icon: <FaUsers />, label: "Servings", value: recipe.servings },
                                        { icon: <FaClock />, label: "Total Time", value: `${totalTime} min` },
                                        { icon: <FaUtensils />, label: "Difficulty", value: recipe.difficulty },
                                        { icon: <FaDollarSign />, label: "Per Serving", value: `$${costPerServing.toFixed(2)}` },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="p-4 text-center bg-white/70 backdrop-blur-md border border-orange-100 rounded-2xl shadow-sm shadow-orange-100 hover:shadow-orange-200/60 transition-all hover:-translate-y-1"
                                        >
                                            <div className="text-orange-500 mx-auto h-6 w-6 mb-1">{item.icon}</div>
                                            <div className="font-semibold text-gray-700">{item.value}</div>
                                            <div className="text-sm text-gray-500">{item.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* 🧂 Ingredients */}
                                <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-lg shadow-orange-200/40">
                                    <h3 className="text-xl font-bold mb-3 text-gray-800">Ingredients</h3>

                                    <p className="text-sm text-gray-500 mb-4">
                                        Total cost: ${totalCost?.toFixed(2) ?? "0.00"}
                                        ({costPerServing?.toFixed(2) ?? "0.00"} per serving)
                                    </p>

                                    <div className="divide-y divide-orange-100">
                                        {recipe.ingredients.map((ing) => (
                                            <div
                                                key={ing.name}
                                                className="grid grid-cols-3 gap-4 py-2 text-gray-700"
                                            >
                                                <span className="font-medium">{ing.name}</span>
                                                <span className="text-gray-600 text-sm">
                                                    {ing.quantity} {ing.unit}
                                                </span>
                                                <span className="text-sm text-gray-500 text-right">
                                                    ${(ing.quantity * (ing.pricePerUnit ?? 0)).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                {/* 🪄 Instructions */}
                                <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-lg shadow-orange-200/40">
                                    <h3 className="text-xl font-bold mb-4 text-gray-800">Instructions</h3>
                                    <div className="space-y-6">
                                        {recipe.steps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full font-semibold shadow-md flex-shrink-0">
                                                    {step.step}
                                                </div>
                                                <div>
                                                    <p className="text-gray-700 leading-relaxed">{step.text}</p>
                                                    {step.timeMinutes > 0 && (
                                                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                            <FaClock className="text-orange-400" /> {step.timeMinutes} minutes
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 🍽️ Sidebar */}
                            <div className="space-y-6">
                                {/* 🥗 Nutrition */}
                                {nutritionData && (
                                    <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-md shadow-orange-200/50">
                                        <h4 className="text-lg font-bold text-gray-800 mb-4">Nutrition (per serving)</h4>
                                        <div className="space-y-2 text-gray-700 text-sm">
                                            {Object.entries(nutritionData).map(([key, val]) => (
                                                <div key={key} className="flex justify-between capitalize">
                                                    <span>{key}</span>
                                                    <span className="font-semibold">{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 🧁 Related Recipes */}
                                {relatedRecipes.length > 0 && (
                                    <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-md shadow-orange-200/50">
                                        <h4 className="text-lg font-bold text-gray-800 mb-4">
                                            More {recipe.cuisine} Recipes
                                        </h4>
                                        <div className="space-y-4">
                                            {relatedRecipes.map((r) => (
                                                <RecipeCard key={r.id} recipe={r} compact />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* ⭐ Rating */}
                                <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-md shadow-orange-200/50 text-center">
                                    <div className="flex justify-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`text-xl ${i < Math.floor(recipe.rating)
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-700">{recipe.rating}</div>
                                    <p className="text-sm text-gray-500">
                                        Based on {recipe.reviewCount} reviews
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>

    );
}

export default RecipeDetail;
