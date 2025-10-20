import { useState } from "react";
import {
  FaArrowRight,
  FaCrown,
  FaEye,
  FaHeart,
  FaRegClock,
  FaUserMinus,
  FaUsers,
  FaUtensils,
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
      {/* --- Enhanced Tabs Navigation --- */}
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
      <div className="space-y-8 ">
        {/* Favourites Tab */}
        {activeTab === "favourites" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">
                Your Favourite Recipes
              </h3>
              {data?.favourites?.length > 0 && (
                <span className="badge badge-lg bg-orange-500 text-white border-0">
                  {data.favourites.length}
                </span>
              )}
            </div>

            {data?.favourites?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.favourites.map((recipe) => (
                  <div key={recipe._id} className="group">
                    <RecipeCard
                      recipe={recipe}
                      onClick={() => handleRecipeClick(recipe)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="card bg-base-100 shadow-xl border border-orange-100">
                <div className="card-body text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-orange-50 flex items-center justify-center">
                    <FaHeart className="w-12 h-12 text-orange-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">
                    No favourites yet
                  </h4>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                    Start exploring amazing recipes and add them to your personal collection
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      className="btn btn-primary bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white gap-2 hover:scale-105 transition-transform"
                      onClick={() => navigate("/search")}
                    >
                      <FaSearch className="w-4 h-4" />
                      Search Recipes
                    </button>
                    <button
                      className="btn btn-outline border-orange-300 text-orange-600 gap-2"
                      onClick={() => navigate("/")}
                    >
                      <FaHome className="w-4 h-4" />
                      Browse Home
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Subscribed Tab */}
        {activeTab === "subscribed" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">Subscribed Chefs</h3>
              {data?.subscribed?.length > 0 && (
                <span className="badge badge-lg bg-orange-500 text-white border-0">
                  {data.subscribed.length}
                </span>
              )}
            </div>

            {data?.subscribed?.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.subscribed.map((chef) => (
                  <div
                    key={chef._id}
                    className="card bg-base-100 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                    onClick={() => handleChefClick(chef)}
                  >
                    <div className="card-body p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="avatar">
                          <div className="w-16 h-16 rounded-full ring-4 ring-orange-200 ring-offset-2">
                            <img
                              src={chef.profile.avatar.secure_url}
                              alt={chef.profile.name}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="text-lg font-bold text-gray-800 truncate">
                              {chef.profile.name}
                            </h4>
                            {chef.isPremium && (
                              <span className="badge bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 flex items-center gap-1">
                                <FaCrown className="w-3 h-3" /> Premium
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 line-clamp-2 mb-3 text-sm">
                            {chef.profile.bio}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <FaUtensils className="w-4 h-4 text-orange-400" />
                              <span>{chef.recipesCount} recipes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaUsers className="w-4 h-4 text-orange-400" />
                              <span>{chef.followers} followers</span>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <span className="text-xs text-gray-400">
                              Subscribed since {new Date(chef.subscribedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:items-end" onClick={(e) => e.stopPropagation()}>
                          <button
                            className="btn btn-sm btn-outline border-orange-300 text-orange-600 hover:bg-orange-50 gap-2"
                            onClick={() => handleChefClick(chef)}
                          >
                            <FaEye className="w-3 h-3" />
                            View
                          </button>
                          <button
                            className="btn btn-sm border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 gap-2"
                            onClick={(e) => handleUnsubscribe(chef._id, e)}
                          >
                            <FaUserMinus className="w-3 h-3" />
                            Unsubscribe
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card bg-base-100 shadow-xl border border-orange-100">
                <div className="card-body text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-orange-50 flex items-center justify-center">
                    <FaUsers className="w-12 h-12 text-orange-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">
                    Not following any chefs
                  </h4>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                    Subscribe to your favorite chefs to get access to their exclusive recipes and content
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      className="btn btn-primary bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white gap-2 hover:scale-105 transition-transform"
                      onClick={() => navigate("/chefs")}
                    >
                      <FaSearch className="w-4 h-4" />
                      Explore Chefs
                    </button>
                    <button
                      className="btn btn-outline border-orange-300 text-orange-600 gap-2"
                      onClick={() => navigate("/")}
                    >
                      <FaHome className="w-4 h-4" />
                      Browse Home
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">My Reviews</h3>
              {data?.reviewsGiven?.length > 0 && (
                <span className="badge badge-lg bg-orange-500 text-white border-0">
                  {data.reviewsGiven.length}
                </span>
              )}
            </div>

            {data?.reviewsGiven?.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.reviewsGiven.map((review, idx) => (
                  <div
                    key={idx}
                    className="card bg-base-100 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="card-body p-6">
                      {/* Header with rating and date */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
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
                          <span className="text-lg font-semibold text-orange-600">
                            {review.rating}.0
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Review message */}
                      <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          "{review.message}"
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-orange-100">
                        <button
                          className="btn btn-ghost text-orange-600 gap-2 hover:bg-orange-50 self-start"
                          onClick={() => navigate(`/recipe/${review.recipeId}`)}
                        >
                          View Recipe
                          <FaArrowRight className="w-3 h-3" />
                        </button>
                        
                        <div className="flex gap-2">
                          <button className="btn btn-sm btn-outline border-orange-300 text-orange-600 hover:bg-orange-50">
                            Edit
                          </button>
                          <button className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card bg-base-100 shadow-xl border border-orange-100">
                <div className="card-body text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-orange-50 flex items-center justify-center">
                    <FaRegClock className="w-12 h-12 text-orange-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">
                    No reviews yet
                  </h4>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                    Your reviews will appear here once you start rating and reviewing recipes
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      className="btn btn-primary bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white gap-2 hover:scale-105 transition-transform"
                      onClick={() => navigate("/search")}
                    >
                      <FaSearch className="w-4 h-4" />
                      Find Recipes
                    </button>
                    <button
                      className="btn btn-outline border-orange-300 text-orange-600 gap-2"
                      onClick={() => navigate("/")}
                    >
                      <FaHome className="w-4 h-4" />
                      Browse Home
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileTabs;