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
        "https://images.unsplash.com/photo-1543353071-087092ec3935?w=1600&q=60",
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
            "https://images.unsplash.com/photo-1604908177522-7f17f3f04f8b?w=800&q=60",
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
            <div className="min-h-screen bg-gradient-to-br from-base-100 via-slate-50 to-accent/5">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Hero */}
                        <div className="relative mb-8">
                            <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 shadow">
                                <img
                                    src={recipe.heroImage}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover"
                                />
                                {recipe.isPremium && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <FaCrown className="mx-auto h-16 w-16 mb-4 text-yellow-400" />
                                            <h3 className="text-2xl font-bold mb-2">
                                                Premium Recipe
                                            </h3>
                                            <p className="text-lg mb-4">
                                                Subscribe to access this
                                                exclusive content
                                            </p>
                                            <button className="btn btn-lg bg-yellow-600 hover:bg-yellow-700">
                                                <FaCrown className="mr-2 h-5 w-5" />{" "}
                                                Unlock Premium
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Header */}
                                <div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="badge badge-outline">
                                            {recipe.cuisine}
                                        </span>
                                        <span className="badge badge-outline">
                                            {recipe.difficulty}
                                        </span>
                                        {recipe.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="badge badge-outline"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h1 className="text-4xl font-bold mb-4">
                                        {recipe.title}
                                    </h1>
                                    <p className="text-lg text-gray-600 mb-6">
                                        {recipe.description}
                                    </p>

                                    {/* Chef Info */}
                                    <div className="flex items-center justify-between p-6 border rounded-xl bg-white shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={chef.avatar}
                                                alt={chef.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <Link
                                                    to={`/chef/${chef.id}`}
                                                    className="font-semibold hover:text-primary"
                                                >
                                                    {chef.name}
                                                </Link>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <FaStar className="h-4 w-4 text-yellow-400" />
                                                    {chef.rating} •{" "}
                                                    {chef.recipes.length}{" "}
                                                    recipes
                                                </div>
                                            </div>
                                        </div>

                                        <button className="btn btn-outline">
                                            <FaHeart className="mr-2 h-4 w-4" />
                                            Subscribe
                                        </button>
                                    </div>

                                    {/* Meta */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                        <div className="text-center p-4 border rounded-xl bg-white">
                                            <FaUsers className="mx-auto h-6 w-6 mb-2 text-primary" />
                                            <div className="font-semibold">
                                                {recipe.servings}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Servings
                                            </div>
                                        </div>
                                        <div className="text-center p-4 border rounded-xl bg-white">
                                            <FaClock className="mx-auto h-6 w-6 mb-2 text-primary" />
                                            <div className="font-semibold">
                                                {totalTime} min
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Total Time
                                            </div>
                                        </div>
                                        <div className="text-center p-4 border rounded-xl bg-white">
                                            <FaUtensils className="mx-auto h-6 w-6 mb-2 text-primary" />
                                            <div className="font-semibold">
                                                {recipe.difficulty}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Difficulty
                                            </div>
                                        </div>
                                        <div className="text-center p-4 border rounded-xl bg-white">
                                            <FaDollarSign className="mx-auto h-6 w-6 mb-2 text-primary" />
                                            <div className="font-semibold">
                                                ${costPerServing.toFixed(2)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Per Serving
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-3 mt-6">
                                        <button
                                            className="btn btn-outline"
                                            onClick={handleFavorite}
                                        >
                                            <FaHeart
                                                className={`mr-2 h-4 w-4 ${
                                                    isFavorited
                                                        ? "text-red-500"
                                                        : ""
                                                }`}
                                            />
                                            {isFavorited
                                                ? "Favorited"
                                                : "Save Recipe"}
                                        </button>

                                        <button
                                            className="btn btn-outline"
                                            onClick={handleShare}
                                        >
                                            <FaShareAlt className="mr-2 h-4 w-4" />
                                            Share
                                        </button>

                                        <button
                                            className="btn btn-outline"
                                            onClick={handlePrint}
                                        >
                                            <FaPrint className="mr-2 h-4 w-4" />
                                            Print
                                        </button>
                                    </div>
                                </div>

                                {/* Ingredients */}
                                <div className="card bg-base-100 shadow">
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            Ingredients
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Total cost: ${totalCost.toFixed(2)}{" "}
                                            (${costPerServing.toFixed(2)} per
                                            serving)
                                        </p>

                                        <div className="space-y-3">
                                            {recipe.ingredients.map(
                                                (ingredient, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex justify-between items-center py-2 border-b last:border-0"
                                                    >
                                                        <div className="flex-1">
                                                            <span className="font-medium capitalize">
                                                                {
                                                                    ingredient.name
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="text-gray-500">
                                                            {
                                                                ingredient.quantity
                                                            }{" "}
                                                            {ingredient.unit}
                                                        </div>
                                                        <div className="text-sm text-gray-500 w-16 text-right">
                                                            $
                                                            {(
                                                                ingredient.quantity *
                                                                ingredient.pricePerUnit
                                                            ).toFixed(2)}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div className="card bg-base-100 shadow">
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            Instructions
                                        </h3>
                                        <div className="space-y-6">
                                            {recipe.steps.map((step, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-4"
                                                >
                                                    <div className="flex-shrink-0">
                                                        <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center font-semibold">
                                                            {step.step}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="mb-2">
                                                            {step.text}
                                                        </p>
                                                        {step.timeMinutes >
                                                            0 && (
                                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                                <FaClock className="h-4 w-4" />
                                                                {
                                                                    step.timeMinutes
                                                                }{" "}
                                                                minutes
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Nutrition */}
                                {nutritionData && (
                                    <div className="card bg-base-100 shadow">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                Nutrition (per serving)
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span>Calories</span>
                                                    <span className="font-semibold">
                                                        {nutritionData.calories}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Protein</span>
                                                    <span>
                                                        {nutritionData.protein}g
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Carbs</span>
                                                    <span>
                                                        {nutritionData.carbs}g
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Fat</span>
                                                    <span>
                                                        {nutritionData.fat}g
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Fiber</span>
                                                    <span>
                                                        {nutritionData.fiber}g
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Sugar</span>
                                                    <span>
                                                        {nutritionData.sugar}g
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Related */}
                                {relatedRecipes.length > 0 && (
                                    <div className="card bg-base-100 shadow">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                More {recipe.cuisine} Recipes
                                            </h4>
                                            <div className="space-y-4">
                                                {relatedRecipes.map((r) => (
                                                    <RecipeCard
                                                        key={r.id}
                                                        recipe={r}
                                                        compact
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Rating */}
                                <div className="card bg-base-100 shadow">
                                    <div className="card-body text-center">
                                        <div className="flex items-center justify-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`h-6 w-6 ${
                                                        i <
                                                        Math.floor(
                                                            recipe.rating
                                                        )
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="text-2xl font-bold mb-1">
                                            {recipe.rating}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Based on {recipe.reviewCount}{" "}
                                            reviews
                                        </div>
                                    </div>
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
