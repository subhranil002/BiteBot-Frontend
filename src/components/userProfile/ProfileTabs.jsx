import { useState } from "react";
import {
    FaCog,
    FaCrown,
    FaHeart,
    FaRegClock,
    FaUserMinus,
    FaUsers,
    FaUtensils,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import RecipeCard from "../recipe/RecipeCard";

const DEFAULT_PROFILE = {
    favorites: [],
    subscriptions: [
        {
            id: "chef1",
            name: "Chef Asha",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60",
            isPremium: true,
            recipes: 24,
            followers: 1200,
            subscribedDate: new Date().toISOString(),
        },
        {
            id: "chef2",
            name: "Chef Rahul",
            avatar: "",
            isPremium: false,
            recipes: 12,
            followers: 540,
            subscribedDate: new Date().toISOString(),
        },
    ],
    subscriptionRecipes: [],
    activity: [],
};

function ProfileTabs() {
    const navigate = useNavigate();
    const data = DEFAULT_PROFILE;
    const [localTab, setLocalTab] = useState("favorites");
    const controlled = typeof activeTab !== "undefined";
    const currentTab = localTab;

    const setTab = (val) => {
        if (!controlled) setLocalTab(val);
    };

    const handleRecipeClick = (recipe) => {
        if (!recipe?.id) return;
        navigate(`/recipe/${recipe.id}`);
    };

    const handleChefClick = (chef) => {
        if (!chef?.id) return;
        navigate(`/chef/${chef.id}`);
    };

    const handleUnsubscribe = () => {};

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
                  onClick={() => setTab(tab.key)}
                  className={`px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-md
                    ${
                      active
                        ? "bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg scale-105"
                        : "bg-white/80 text-gray-700 hover:bg-orange-50 hover:shadow-md border border-orange-100"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-orange-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
      
          {/* --- Tab Contents --- */}
          <div className="mt-6">
            {/* Favorites */}
            {currentTab === "favorites" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Your Favorite Recipes
                </h3>
      
                {data?.favorites?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.favorites.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onClick={() => handleRecipeClick(recipe)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="card bg-white/80 backdrop-blur-md border border-orange-100 shadow-md rounded-2xl">
                    <div className="card-body p-12 text-center">
                      <FaHeart className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                      <h4 className="text-lg font-semibold mb-2 text-gray-800">
                        No favorites yet
                      </h4>
                      <p className="text-gray-500 mb-4">
                        Start exploring recipes and add them to your favorites
                      </p>
                      <button
                        className="btn bg-gradient-to-r from-orange-400 to-red-400 text-white hover:scale-105 transition-transform"
                        onClick={() => navigate("/")}
                      >
                        Discover Recipes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
      
            {/* Subscriptions */}
            {currentTab === "subscriptions" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Subscribed Chefs
                </h3>
      
                {data?.subscriptions?.length > 0 ? (
                  <div className="space-y-4">
                    {data.subscriptions.map((chef) => (
                      <div
                        key={chef.id}
                        className="card bg-white/80 border border-orange-100 backdrop-blur-md shadow-md rounded-2xl hover:shadow-orange-200 transition-all"
                      >
                        <div className="card-body p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={chef.avatar}
                                alt={chef.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-orange-200"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-gray-800">
                                    {chef.name}
                                  </h4>
                                  {chef.isPremium && (
                                    <span className="badge bg-gradient-to-r from-yellow-400 to-orange-400 text-white flex items-center gap-1 border-0">
                                      <FaCrown className="w-3 h-3" /> Premium
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">
                                  {chef.recipes} recipes • {chef.followers} followers
                                </p>
                                <p className="text-xs text-gray-400">
                                  Subscribed since{" "}
                                  {new Date(
                                    chef.subscribedDate
                                  ).toLocaleDateString()}
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
                                onClick={() => handleUnsubscribe(chef.id)}
                              >
                                <FaUserMinus className="w-4 h-4" /> Unsubscribe
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card bg-white/80 border border-orange-100 shadow-md rounded-2xl">
                    <div className="card-body p-12 text-center">
                      <FaUsers className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                      <h4 className="text-lg font-semibold mb-2 text-gray-800">
                        No subscriptions yet
                      </h4>
                      <p className="text-gray-500 mb-4">
                        Follow your favorite chefs to see their latest recipes
                      </p>
                      <button
                        className="btn bg-gradient-to-r from-orange-400 to-red-400 text-white hover:scale-105 transition-transform"
                        onClick={() => navigate("/")}
                      >
                        Discover Chefs
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
      
            {/* Activity */}
            {currentTab === "activity" && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Recent Activity
                </h3>
                {data?.activity?.length > 0 ? (
                  <div className="space-y-4">
                    {data.activity.map((activity, idx) => (
                      <div
                        key={idx}
                        className="bg-white/80 border border-orange-100 rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-2" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">
                              {activity.description}
                            </p>
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
                  <div className="card bg-white/80 border border-orange-100 shadow-md rounded-2xl">
                    <div className="card-body p-12 text-center">
                      <FaRegClock className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                      <h4 className="text-lg font-semibold mb-2 text-gray-800">
                        No activity yet
                      </h4>
                      <p className="text-gray-500">
                        Your activity will appear here as you interact with recipes
                        and chefs
                      </p>
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
