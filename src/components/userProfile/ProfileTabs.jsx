import { useState } from "react";
import {
  FaCog,
  FaCrown,
  FaHeart,
  FaRegClock,
  FaUserMinus,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import RecipeCard from "../recipe/RecipeCard";

// 🧑‍🍳 Mocked user data shaped like your Mongoose schema
const MOCK_USER = {
  _id: "u12345",
  profile: {
    name: "Riya Patel",
    avatar: {
      secure_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60",
    },
    cuisine: ["Indian", "Thai"],
    dietaryLabels: ["Vegetarian", "High-protein"],
  },
  favorites: [
    {
      _id: "r201",
      title: "Veg Biryani",
      heroImage:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=60",
      description:
        "Fragrant basmati rice layered with spiced vegetables and saffron.",
      isPremium: false,
      servings: 4,
      cuisine: "Indian",
      tags: ["Dinner", "Vegetarian", "Spicy"],
      rating: 4.6,
    },
    {
      _id: "r202",
      title: "Avocado Toast Deluxe",
      heroImage:
        "https://images.unsplash.com/photo-1604908554053-f9a3a9d44f2b?w=800&q=60",
      description:
        "Creamy avocado spread on crispy sourdough topped with eggs and chili flakes.",
      isPremium: true,
      servings: 2,
      cuisine: "Fusion",
      tags: ["Breakfast", "Healthy"],
      rating: 4.9,
    },
  ],
  subscriptions: [
    {
      _id: "c101",
      name: "Chef Aarav Sharma",
      avatar:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=60",
      isPremium: true,
      recipesCount: 32,
      followers: 12400,
      subscribedDate: "2024-08-10T00:00:00.000Z",
    },
    {
      _id: "c102",
      name: "Chef Meena Desai",
      avatar:
        "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=800&q=60",
      isPremium: false,
      recipesCount: 14,
      followers: 3200,
      subscribedDate: "2025-02-15T00:00:00.000Z",
    },
  ],
  activity: [
    {
      type: "favorite",
      description: "You added 'Veg Biryani' to your favorites.",
      timestamp: "2025-10-15T13:45:00.000Z",
    },
    {
      type: "subscription",
      description: "You subscribed to Chef Aarav Sharma.",
      timestamp: "2025-09-20T09:20:00.000Z",
    },
  ],
};

function ProfileTabs() {
  const navigate = useNavigate();
  const data = MOCK_USER;
  const [localTab, setLocalTab] = useState("favorites");

  const currentTab = localTab;

  const handleRecipeClick = (recipe) => {
    if (!recipe?._id) return;
    navigate(`/recipe/${recipe._id}`);
  };

  const handleChefClick = (chef) => {
    if (!chef?._id) return;
    navigate(`/chef/${chef._id}`);
  };

  const handleUnsubscribe = (chefId) => {
    console.log(`Unsubscribed from chef: ${chefId}`);
  };

  return (
    <div className="w-full">
      {/* --- Tabs Navigation --- */}
      <div className="flex flex-wrap justify-center mb-8 gap-3">
        {[
          { key: "favorites", label: "Favorites", icon: FaHeart },
          { key: "subscriptions", label: "Subscriptions", icon: FaUsers },
          { key: "activity", label: "Activity", icon: FaRegClock },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = currentTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setLocalTab(tab.key)}
              className={`btn gap-2 rounded-xl font-semibold transition-all duration-300
                ${
                  active
                    ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg scale-105"
                    : "btn-ghost text-gray-700 border border-orange-100 hover:bg-orange-50"
                }`}
            >
              <Icon className={`w-4 h-4 ${active ? "text-white" : "text-orange-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* --- Tab Contents --- */}
      <div className="mt-6 space-y-6">
        {/* Favorites */}
        {currentTab === "favorites" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Your Favorite Recipes
            </h3>

            {data?.favorites?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.favorites.map((recipe) => (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    onClick={() => handleRecipeClick(recipe)}
                  />
                ))}
              </div>
            ) : (
              <div className="card bg-base-100/80 border border-orange-100 text-center p-12 shadow rounded-2xl">
                <FaHeart className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  No favorites yet
                </h4>
                <p className="text-gray-500 mb-4">
                  Start exploring recipes and add them to your favorites
                </p>
                <button
                  className="btn bg-gradient-to-r from-orange-400 to-red-500 text-white hover:scale-105 transition-transform"
                  onClick={() => navigate("/")}
                >
                  Discover Recipes
                </button>
              </div>
            )}
          </div>
        )}

        {/* Subscriptions */}
        {currentTab === "subscriptions" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Subscribed Chefs</h3>

            {data?.subscriptions?.length > 0 ? (
              <div className="space-y-4">
                {data.subscriptions.map((chef) => (
                  <div
                    key={chef._id}
                    className="card bg-base-100/80 border border-orange-100 shadow-md rounded-2xl hover:shadow-lg transition-all"
                  >
                    <div className="card-body p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={chef.avatar}
                          alt={chef.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-orange-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-800">{chef.name}</h4>
                            {chef.isPremium && (
                              <span className="badge bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 flex items-center gap-1">
                                <FaCrown className="w-3 h-3" /> Premium
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {chef.recipesCount} recipes • {chef.followers} followers
                          </p>
                          <p className="text-xs text-gray-400">
                            Subscribed since{" "}
                            {new Date(chef.subscribedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-end">
                        <button
                          className="btn btn-sm btn-outline border-orange-300 text-orange-600 hover:bg-orange-50"
                          onClick={() => handleChefClick(chef)}
                        >
                          View Profile
                        </button>
                        <button
                          className="btn btn-sm border-red-300 text-red-500 hover:bg-red-50 flex items-center gap-1"
                          onClick={() => handleUnsubscribe(chef._id)}
                        >
                          <FaUserMinus className="w-4 h-4" /> Unsubscribe
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card bg-base-100/80 border border-orange-100 shadow-md rounded-2xl text-center p-12">
                <FaUsers className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  No subscriptions yet
                </h4>
                <p className="text-gray-500 mb-4">
                  Follow your favorite chefs to see their latest recipes
                </p>
                <button
                  className="btn bg-gradient-to-r from-orange-400 to-red-500 text-white hover:scale-105 transition-transform"
                  onClick={() => navigate("/")}
                >
                  Discover Chefs
                </button>
              </div>
            )}
          </div>
        )}

        {/* Activity */}
        {currentTab === "activity" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Activity
            </h3>
            {data?.activity?.length > 0 ? (
              <div className="space-y-4">
                {data.activity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="card bg-base-100/80 border border-orange-100 rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card bg-base-100/80 border border-orange-100 shadow-md rounded-2xl text-center p-12">
                <FaRegClock className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  No activity yet
                </h4>
                <p className="text-gray-500">
                  Your activity will appear here as you interact with recipes and chefs
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileTabs;
