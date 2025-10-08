import { useEffect, useState } from "react";
import {
    FaChartBar,
    FaChartLine,
    FaDollarSign,
    FaEye,
    FaPlus,
    FaStar,
    FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import RecipeCard from "../../components/recipe/RecipeCard";
import HomeLayout from "../../layouts/HomeLayout";

const HARDCODED_DASHBOARD = {
    stats: {
        totalViews: 123456,
        followers: 8420,
        earnings: 12450,
        engagementRate: 18.3,
    },
    popularRecipes: [
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
    ],
};

const ChefDashboard = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        setDashboardData(HARDCODED_DASHBOARD);
    }, []);

    const handleRecipeClick = (recipe) => {
        navigate(`/recipe/${recipe.id}`);
    };

    return (
        <HomeLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Chef Dashboard
                            </h1>
                            <p className="text-gray-500">
                                Monitor your recipes performance and earnings
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                className="btn gap-2"
                                onClick={() => navigate("/add-recipe")}
                                type="button"
                            >
                                <FaPlus className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                    Add Recipe
                                </span>
                            </button>

                            <button
                                className="btn btn-ghost"
                                onClick={() => navigate("/profile")}
                                type="button"
                            >
                                View Profile
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="card bg-base-100 shadow">
                            <div className="card-body p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium">
                                            Total Views
                                        </div>
                                    </div>
                                    <FaEye className="w-5 h-5 text-gray-400" />
                                </div>

                                <div className="mt-3 text-2xl font-bold">
                                    {dashboardData?.stats?.totalViews?.toLocaleString() ||
                                        "0"}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    <span className="text-success">+12%</span>{" "}
                                    from last month
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow">
                            <div className="card-body p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium">
                                            Followers
                                        </div>
                                    </div>
                                    <FaUsers className="w-5 h-5 text-gray-400" />
                                </div>

                                <div className="mt-3 text-2xl font-bold">
                                    {dashboardData?.stats?.followers?.toLocaleString() ||
                                        "0"}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    <span className="text-success">+8%</span>{" "}
                                    from last month
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow">
                            <div className="card-body p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium">
                                            Earnings
                                        </div>
                                    </div>
                                    <FaDollarSign className="w-5 h-5 text-gray-400" />
                                </div>

                                <div className="mt-3 text-2xl font-bold">
                                    $
                                    {dashboardData?.stats?.earnings?.toLocaleString() ||
                                        "0"}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    <span className="text-success">+24%</span>{" "}
                                    from last month
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow">
                            <div className="card-body p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium">
                                            Engagement
                                        </div>
                                    </div>
                                    <FaChartLine className="w-5 h-5 text-gray-400" />
                                </div>

                                <div className="mt-3 text-2xl font-bold">
                                    {dashboardData?.stats?.engagementRate ??
                                        "0"}
                                    %
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    <span className="text-success">+5%</span>{" "}
                                    from last month
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Popular Recipes */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">
                                Popular Recipes
                            </h2>

                            <button
                                className="btn btn-ghost gap-2"
                                onClick={() => navigate("/profile")}
                                type="button"
                            >
                                <FaChartBar className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                    View All Analytics
                                </span>
                            </button>
                        </div>

                        {dashboardData?.popularRecipes?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {dashboardData.popularRecipes.map((recipe) => (
                                    <div
                                        key={recipe.id}
                                        className="card bg-base-100 shadow hover:shadow-md transition-shadow"
                                    >
                                        <div className="card-body p-0">
                                            <RecipeCard
                                                recipe={recipe}
                                                onClick={() =>
                                                    handleRecipeClick(recipe)
                                                }
                                                compact={false}
                                            />

                                            <div className="p-4 border-t">
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1">
                                                            <FaEye className="w-4 h-4 text-gray-400" />
                                                            <span>
                                                                {recipe.views?.toLocaleString() ||
                                                                    "0"}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <FaStar className="w-4 h-4 text-yellow-400" />
                                                            <span>
                                                                {recipe.rating ??
                                                                    "0"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <span
                                                        className={`badge ${
                                                            recipe.isPremium
                                                                ? "badge-primary"
                                                                : "badge-ghost"
                                                        }`}
                                                    >
                                                        {recipe.isPremium
                                                            ? "Premium"
                                                            : "Free"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="card bg-base-100 shadow">
                                <div className="card-body p-12 text-center">
                                    <FaChartBar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No recipes yet
                                    </h3>
                                    <p className="text-gray-500 mb-4">
                                        Start creating recipes to see analytics
                                        and earnings
                                    </p>
                                    <button
                                        className="btn"
                                        onClick={() => navigate("/add-recipe")}
                                        type="button"
                                    >
                                        Create Your First Recipe
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h3 className="text-lg font-medium mb-4">
                                Quick Actions
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button
                                    className="btn btn-outline h-auto p-4 flex flex-col items-center gap-2"
                                    type="button"
                                    onClick={() => navigate("/add-recipe")}
                                >
                                    <FaPlus className="w-6 h-6" />
                                    <span>Add New Recipe</span>
                                </button>

                                <button
                                    className="btn btn-outline h-auto p-4 flex flex-col items-center gap-2"
                                    type="button"
                                    onClick={() => {
                                        /* noop - manage followers */
                                    }}
                                >
                                    <FaUsers className="w-6 h-6" />
                                    <span>Manage Followers</span>
                                </button>

                                <button
                                    className="btn btn-outline h-auto p-4 flex flex-col items-center gap-2"
                                    type="button"
                                    onClick={() => {
                                        /* noop - view earnings */
                                    }}
                                >
                                    <FaDollarSign className="w-6 h-6" />
                                    <span>View Earnings</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default ChefDashboard;
