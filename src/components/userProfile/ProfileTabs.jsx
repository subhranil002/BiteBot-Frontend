import { useState } from "react";
import {
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
    bio: "Passionate home cook exploring vegetarian cuisine from around the world.",
    dietaryLabels: ["vegetarian", "high-protein"],
    allergens: ["peanuts"],
    cuisine: ["indian", "thai", "mediterranean"],
  },
  favourites: [  // Changed from 'favorites' to match your schema
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
  subscribed: [  // Changed from 'subscriptions' to match your schema
    {
      _id: "c101",
      profile: {
        name: "Chef Aarav Sharma",
        avatar: {
          secure_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=60"
        },
        bio: "Award-winning chef specializing in modern Indian cuisine"
      },
      isPremium: true,
      recipesCount: 32,
      followers: 12400,
      subscribedDate: "2024-08-10T00:00:00.000Z",
    },
    {
      _id: "c102",
      profile: {
        name: "Chef Meena Desai",
        avatar: {
          secure_url: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=800&q=60"
        },
        bio: "Home cook sharing traditional family recipes"
      },
      isPremium: false,
      recipesCount: 14,
      followers: 3200,
      subscribedDate: "2025-02-15T00:00:00.000Z",
    },
  ],
  reviewsGiven: [  // Added reviews from your schema
    {
      recipeId: "r201",
      rating: 5,
      message: "Absolutely delicious! The spices were perfectly balanced.",
      createdAt: "2025-10-15T13:45:00.000Z",
    },
    {
      recipeId: "r202", 
      rating: 4,
      message: "Great breakfast option, would add more chili next time.",
      createdAt: "2025-10-10T09:20:00.000Z",
    }
  ]
};

function ProfileTabs() {
  const navigate = useNavigate();
  const data = MOCK_USER;
  const [activeTab, setActiveTab] = useState("favourites"); // Changed to match schema

  const handleRecipeClick = (recipe) => {
    if (!recipe?._id) return;
    navigate(`/recipe/${recipe._id}`);
  };

  const handleChefClick = (chef) => {
    if (!chef?._id) return;
    navigate(`/profile/${chef._id}`);
  };

  const handleUnsubscribe = (chefId, e) => {
    e.stopPropagation(); // Prevent navigation
    console.log(`Unsubscribed from chef: ${chefId}`);
    // Add actual unsubscribe logic here
  };

  // Tab configuration
  const tabs = [
    { key: "favourites", label: "Favourites", icon: FaHeart },
    { key: "subscribed", label: "Subscribed", icon: FaUsers },
    { key: "reviews", label: "My Reviews", icon: FaRegClock },
  ];

  return (
    <div className="w-full">
      {/* --- Tabs Navigation --- */}
      <div className="flex flex-wrap justify-center mb-8 gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`btn gap-2 rounded-xl font-semibold transition-all duration-300 min-w-[120px] ${
                isActive
                  ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg scale-105"
                  : "btn-ghost text-gray-700 border border-orange-100 hover:bg-orange-50"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-orange-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* --- Tab Contents --- */}
      <div className="mt-6 space-y-6">
        {/* Favourites - matches schema field name */}
        {activeTab === "favourites" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Your Favourite Recipes
            </h3>

            {data?.favourites?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.favourites.map((recipe) => (
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
                  No favourites yet
                </h4>
                <p className="text-gray-500 mb-4">
                  Start exploring recipes and add them to your favourites
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

        {/* Subscribed - matches schema field name */}
        {activeTab === "subscribed" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Subscribed</h3>

            {data?.subscribed?.length > 0 ? (
              <div className="space-y-4">
                {data.subscribed.map((chef) => (
                  <div
                    key={chef._id}
                    className="card bg-base-100/80 border border-orange-100 shadow-md rounded-2xl hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => handleChefClick(chef)}
                  >
                    <div className="card-body p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={chef.profile.avatar.secure_url}
                          alt={chef.profile.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-orange-200"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-800">{chef.profile.name}</h4>
                            {chef.isPremium && (
                              <span className="badge bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 flex items-center gap-1">
                                <FaCrown className="w-3 h-3" /> Premium
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {chef.profile.bio}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {chef.recipesCount} recipes • {chef.followers} followers
                          </p>
                          <p className="text-xs text-gray-400">
                            Subscribed since {new Date(chef.subscribedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn btn-sm btn-outline border-orange-300 text-orange-600 hover:bg-orange-50"
                          onClick={() => handleChefClick(chef)}
                        >
                          View Profile
                        </button>
                        <button
                          className="btn btn-sm border-red-300 text-red-500 hover:bg-red-50 flex items-center gap-1"
                          onClick={(e) => handleUnsubscribe(chef._id, e)}
                        >
                          <FaUserMinus className="w-4 h-4" /> UnSubscribe
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
                  Not Subscribed anyone yet
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

        {/* Reviews - from your schema */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              My Reviews
            </h3>

            {data?.reviewsGiven?.length > 0 ? (
              <div className="space-y-4">
                {data.reviewsGiven.map((review, idx) => (
                  <div
                    key={idx}
                    className="card bg-base-100/80 border border-orange-100 rounded-xl shadow-sm p-5 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="rating rating-sm">
                          {[...Array(5)].map((_, i) => (
                            <input
                              key={i}
                              type="radio"
                              name={`rating-${idx}`}
                              className="mask mask-star-2 bg-orange-500"
                              checked={i < review.rating}
                              readOnly
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.rating}/5
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{review.message}</p>
                    <button
                      className="btn btn-sm btn-ghost text-orange-600 self-start -ml-2"
                      onClick={() => navigate(`/recipe/${review.recipeId}`)}
                    >
                      View Recipe →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card bg-base-100/80 border border-orange-100 text-center p-12 shadow rounded-2xl">
                <FaRegClock className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  No reviews yet
                </h4>
                <p className="text-gray-500 mb-4">
                  Your reviews will appear here once you rate some recipes
                </p>
                <button
                  className="btn bg-gradient-to-r from-orange-400 to-red-500 text-white hover:scale-105 transition-transform"
                  onClick={() => navigate("/")}
                >
                  Explore Recipes
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileTabs;