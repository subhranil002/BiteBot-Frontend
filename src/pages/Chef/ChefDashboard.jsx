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

// 🧑‍🍳 Example data shaped according to your Mongoose user model
const MOCK_USER = {
  profile: {
    name: "Chef Aarav Sharma",
    avatar: {
      secure_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=60",
    },
    cuisine: ["indian", "fusion"],
    dietaryLabels: ["high-protein", "vegetarian"],
  },
  chefProfile: {
    education: "Le Cordon Bleu, Paris",
    experience: "10 years of culinary excellence specializing in Indian fusion cuisine.",
    externalLinks: [
      "https://www.instagram.com/chefaarav",
      "https://www.youtube.com/@chefaarav",
    ],
    subscriptionPrice: 7.99,
    recipes: [
      {
        _id: "r101",
        title: "Paneer Tikka Masala",
        heroImage: "https://images.unsplash.com/photo-1626082927389-c8a2a3cfcb9f?w=800&q=60",
        description: "Grilled paneer cubes simmered in rich, spiced tomato gravy.",
        isPremium: true,
        isTrending: true,
        servings: 4,
        cuisine: "Indian",
        tags: ["Spicy", "Vegetarian", "Dinner"],
        views: 54321,
        rating: 4.9,
      },
      {
        _id: "r102",
        title: "Chocolate Lava Cake",
        heroImage: "https://images.unsplash.com/photo-1601972599720-b7a76a2d42a4?w=800&q=60",
        description: "Decadent molten chocolate cake served warm with vanilla ice cream.",
        isPremium: false,
        isTrending: false,
        servings: 2,
        cuisine: "French",
        tags: ["Dessert", "Chocolate", "Sweet"],
        views: 21890,
        rating: 4.7,
      },
      {
        _id: "r103",
        title: "Mango Lassi Smoothie",
        heroImage: "https://images.unsplash.com/photo-1627308595121-8879f36a1eeb?w=800&q=60",
        description: "Refreshing mango yogurt drink perfect for summer.",
        isPremium: false,
        isTrending: false,
        servings: 2,
        cuisine: "Indian",
        tags: ["Drink", "Vegetarian", "Cooling"],
        views: 12050,
        rating: 4.5,
      },
    ],
    reviews: [
      { name: "Riya Patel", message: "Loved the fusion flavors!" },
      { name: "Carlos Rivera", message: "Recipes are easy to follow and taste amazing!" },
    ],
  },
  followers: 12500,
  rating: 4.8,
  createdAt: "2021-03-22T00:00:00.000Z",
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
          <span className="loading loading-spinner text-orange-500"></span>
        </div>
      </HomeLayout>
    );
  }

  const { chefProfile } = userData;

  const stats = {
    totalViews: chefProfile.recipes.reduce((sum, r) => sum + (r.views || 0), 0),
    followers: userData.followers || 0,
    earnings: Math.round(chefProfile.subscriptionPrice * (userData.followers / 10)),
    engagementRate: ((chefProfile.recipes.length / 100) * 5.2).toFixed(1),
  };

  return (
    <HomeLayout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-orange-600">
              Welcome, {userData.profile.name.split(" ")[0]} 👨‍🍳
            </h1>
            <p className="text-gray-500">Track your recipes, followers, and performance.</p>
          </div>

          <div className="flex gap-3">
            <button
              className="btn btn-primary gap-2"
              onClick={() => navigate("/add-recipe")}
            >
              <FaPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Recipe</span>
            </button>
            <button className="btn btn-ghost" onClick={() => navigate("/profile")}>
              View Profile
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Views", icon: FaEye, value: stats.totalViews.toLocaleString() },
            { label: "Followers", icon: FaUsers, value: stats.followers.toLocaleString() },
            { label: "Earnings", icon: FaDollarSign, value: `$${stats.earnings.toLocaleString()}` },
            { label: "Engagement", icon: FaChartLine, value: `${stats.engagementRate}%` },
          ].map(({ label, icon: Icon, value }) => (
            <div key={label} className="card bg-base-100 shadow border border-orange-100">
              <div className="card-body p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-600">{label}</div>
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <div className="mt-3 text-2xl font-bold text-gray-800">{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Recipes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Popular Recipes</h2>
            <button className="btn btn-ghost gap-2" onClick={() => navigate("/profile")}>
              <FaChartBar className="w-4 h-4" />
              <span className="hidden sm:inline">View All Analytics</span>
            </button>
          </div>

          {chefProfile.recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chefProfile.recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="card bg-base-100 shadow hover:shadow-md transition-shadow"
                >
                  <div className="card-body p-0">
                    <RecipeCard recipe={recipe} />
                    <div className="p-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <FaEye className="w-4 h-4 text-gray-400" />
                            <span>{recipe.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaStar className="w-4 h-4 text-yellow-400" />
                            <span>{recipe.rating}</span>
                          </div>
                        </div>
                        <span
                          className={`badge ${
                            recipe.isPremium ? "badge-primary" : "badge-ghost"
                          }`}
                        >
                          {recipe.isPremium ? "Premium" : "Free"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card bg-base-100 shadow text-center p-10">
              <FaChartBar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No recipes yet</h3>
              <p className="text-gray-500 mb-4">
                Start creating recipes to see your analytics here.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/add-recipe")}
              >
                Create Recipe
              </button>
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default ChefDashboard;
