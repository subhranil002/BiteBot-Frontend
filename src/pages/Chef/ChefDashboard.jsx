import { useEffect, useState } from "react";
import {
    FaChartBar,
    FaChartLine,
    FaDollarSign,
    FaEye,
    FaPlus,
    FaStar,
    FaUsers,
    FaHeart,
    FaUtensils,
    FaGraduationCap,
    FaBriefcase,
    FaLink,
    FaCalendarAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import RecipeCard from "../../components/recipe/RecipeCard";
import HomeLayout from "../../layouts/HomeLayout";

// 🧑‍🍳 Updated data with subscribers field
const MOCK_USER = {
    profile: {
        name: "Chef Aarav Sharma",
        avatar: {
            secure_url:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=60",
        },
        bio: "Award-winning chef specializing in Indian fusion cuisine with over 10 years of experience.",
        cuisine: ["indian", "fusion", "continental"],
        dietaryLabels: ["high-protein", "vegetarian"],
    },
    chefProfile: {
        education: "Le Cordon Bleu, Paris",
        experience: "10 years of culinary excellence specializing in Indian fusion cuisine. Former head chef at 'Spice Route' restaurant.",
        externalLinks: [
            "https://www.instagram.com/chefaarav",
            "https://www.youtube.com/@chefaarav",
        ],
        subscriptionPrice: 7.99,
        subscribers: ["user1", "user2", "user3", "user4", "user5"], // 5 subscribers
        recipes: [
            {
                _id: "r101",
                title: "Paneer Tikka Masala",
                thumbnail: {
                    secure_url: "https://recipes.timesofindia.com/thumb/54408184.cms?imgsize=148310&width=800&height=800"
                },
                description: "Grilled paneer cubes simmered in rich, spiced tomato gravy.",
                isPremium: true,
                servings: 4,
                cuisine: "Indian",
                tags: ["Spicy", "Vegetarian", "Dinner"],
                views: 54321,
                averageRating: 4.9,
                reviewCount: 128,
                totalCookingTime: 45,
                likes: 89
            },
            {
                _id: "r102",
                title: "Chocolate Lava Cake",
                thumbnail: {
                    secure_url: "https://tse2.mm.bing.net/th/id/OIP.mD9uvqMGLhaAxor-MWFSiQHaKX?rs=1&pid=ImgDetMain&o=7&rm=3"
                },
                description: " vanilla ice cream.",
                isPremium: false,
                servings: 2,
                cuisine: "French",
                tags: ["Dessert", "Chocolate", "Sweet"],
                views: 21890,
                averageRating: 4.7,
                reviewCount: 89,
                totalCookingTime: 30,
                likes: 67
            },
            {
                _id: "r103",
                title: "Mango Lassi Smoothie",
                thumbnail: {
                    secure_url: "https://tse2.mm.bing.net/th/id/OIP.rQSjsk71q8SFuYx22ioqNwHaIo?rs=1&pid=ImgDetMain&o=7&rm=3"
                },
                description: "Refreshing and sweet mango yogurt drink perfect for summer.",
                isPremium: false,
                servings: 2,
                cuisine: "Indian",
                tags: ["Drink", "Vegetarian", "Cooling"],
                views: 12050,
                averageRating: 4.5,
                reviewCount: 56,
                totalCookingTime: 10,
                likes: 45
            },
        ],
        reviews: [
            { name: "Riya Patel", message: "Loved the fusion flavors! The recipes are amazing!", rating: 5 },
            { name: "Carlos Rivera", message: "Recipes are easy to follow and taste incredible!", rating: 4 },
            { name: "Priya Sharma", message: "Best Indian fusion recipes I've ever tried!", rating: 5 },
        ],
        averageRating: 4.8,
    },
    subscribers: 1250, // Total subscriber count
    createdAt: "2021-03-22T00:00:00.000Z",
    _id: "chef-77",
};

const ChefDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Simulate fetching from backend
        setUserData(MOCK_USER);
    }, []);

    if (!userData) {
        return (
            <HomeLayout>
                <div className="flex justify-center items-center min-h-screen">
                    <span className="loading loading-spinner loading-lg text-orange-500"></span>
                </div>
            </HomeLayout>
        );
    }

    const { chefProfile, profile } = userData;

    const stats = {
        totalLikes: chefProfile.recipes.reduce((sum, r) => sum + (r.views || 0), 0),
        subscribers: userData.subscribers || 0,
        monthlyEarnings: Math.round(chefProfile.subscriptionPrice * userData.subscribers),
        totalRecipes: chefProfile.recipes.length,
        averageRating: chefProfile.averageRating
    };

    return (
        <HomeLayout>
            <div className="min-h-screen bg-linear-to-br from-orange-50 via-rose-50 to-amber-50">
                <div className="container mx-auto px-4 py-8 space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Chef Profile Card */}
                        <div className="card bg-base-100 shadow-xl border border-orange-100 lg:flex-1">
                            <div className="card-body">
                                <div className="flex flex-col sm:flex-row items-start gap-6">
                                    <div className="avatar">
                                        <div className="w-24 h-24 rounded-full ring-4 ring-orange-200 ring-offset-2">
                                            <img src={profile.avatar?.secure_url} alt={profile.name} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h1 className="card-title text-3xl bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                            {profile.name}
                                        </h1>
                                        <p className="text-gray-600 mt-2">{profile.bio}</p>

                                        {/* Cuisine Tags */}
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {profile.cuisine?.map((cuisine, index) => (
                                                <div key={index} className="badge badge-outline border-orange-400 text-orange-500">
                                                    {cuisine}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="card bg-base-100 shadow-xl border border-orange-100 w-full lg:w-80">
                            <div className="card-body">
                                <h3 className="card-title text-gray-800">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button
                                        className="btn btn-neutral w-full gap-2"
                                        onClick={() => navigate("/recipe/add")}
                                    >
                                        <FaPlus className="w-4 h-4" />
                                        Add New Recipe
                                    </button>
                                    <button
                                        className="btn btn-outline border-orange-300 text-orange-600 w-full gap-2"
                                        onClick={() => navigate(`/profile/${userData._id}`)}
                                    >
                                        <FaEye className="w-4 h-4" />
                                        View Public Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                label: "Total Likes",
                                icon: FaHeart,
                                value: stats.totalLikes.toLocaleString(), color: "text-blue-500"
                            },
                            {
                                label: "Subscribers",
                                icon: FaUsers,
                                value: stats.subscribers.toLocaleString(),
                                color: "text-green-500"
                            },
                            {
                                label: "Monthly Earnings",
                                icon: FaDollarSign,
                                value: `$${stats.monthlyEarnings.toLocaleString()}`,
                                color: "text-emerald-500"
                            },
                            {
                                label: "Average Rating",
                                icon: FaStar,
                                value: `${stats.averageRating}/5`,
                                color: "text-purple-500"
                            },
                        ].map(({ label, icon: Icon, value, growth, color }) => (
                            <div key={label} className="card bg-base-100 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="card-body p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-sm font-semibold text-gray-600">{label}</div>
                                        <Icon className={`w-6 h-6 ${color}`} />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800 mb-2">
                                        {value}
                                    </div>
                                    <div className="text-sm text-green-500 font-medium">
                                        {growth}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recipes Section */}
                    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-gray-800">Your Top Recipes</h2>
                                <p className="text-gray-600">Manage and track your recipe performance</p>
                            </div>
                            <div className="flex justify-center sm:justify-end">
                                <button
                                    className="btn btn-neutral w-full sm:w-auto gap-2"
                                    onClick={() => navigate("/recipe/add")}
                                >
                                    <FaPlus className="w-4 h-4" />
                                    New Recipe
                                </button>
                            </div>
                        </div>

                        {chefProfile.recipes.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-6 ">
                                {chefProfile.recipes.map((recipe) => (
                                    <div
                                        key={recipe._id}
                                        className="w-full sm:w-[48%] lg:w-[30%] flex flex-col items-center"
                                    >
                                        {/* Fix overflow and center the card */}
                                        <div className="w-full flex justify-center overflow-hidden">
                                            <RecipeCard recipe={recipe} />
                                        </div>

                                        {/* Footer area */}
                                        <div className="w-full p-4 border-t border-orange-100 mt-4 bg-base-100 shadow-sm rounded-lg">
                                            <div className="flex justify-between text-sm">
                                                <span
                                                    className={`badge ${recipe.isPremium ? "badge-primary" : "badge-ghost"}`}
                                                >
                                                    {recipe.isPremium ? "Premium" : "Free"}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <FaHeart className="w-4 h-4 text-rose-400" />
                                                    <span className="font-medium">{recipe.likes}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FaStar className="w-4 h-4 text-yellow-400" />
                                                    <span className="font-medium">{recipe.averageRating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="card bg-base-100 shadow-xl text-center py-12">
                                <FaUtensils className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-xl font-bold text-gray-700 mb-2">No recipes yet</h3>
                                <p className="text-gray-500 mb-6">
                                    Start creating amazing recipes to build your subscriber base
                                </p>
                                <button
                                    className="btn btn-primary gap-2"
                                    onClick={() => navigate("/recipe/add")}
                                >
                                    <FaPlus className="w-4 h-4" />
                                    Create Your First Recipe
                                </button>
                            </div>
                        )}

                    </div>


                    {/* Additional Info Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                        {/* Recent Reviews */}
                        <div className="card bg-base-100 shadow-xl border border-orange-100">
                            <div className="card-body">
                                <h3 className="card-title text-gray-800">
                                    <FaStar className="text-yellow-400" />
                                    Recent Reviews
                                </h3>
                                <div className="space-y-4 max-h-80 overflow-y-auto">
                                    {chefProfile.reviews.slice(0, 3).map((review, index) => (
                                        <div key={index} className="border-b border-orange-100 pb-4 last:border-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold text-gray-800">{review.name}</span>
                                                <div className="rating rating-xs">
                                                    {[...Array(5)].map((_, i) => (
                                                        <input
                                                            key={i}
                                                            type="radio"
                                                            className="mask mask-star-2 bg-yellow-400"
                                                            checked={i < review.rating}
                                                            readOnly
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm">{review.message}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default ChefDashboard;