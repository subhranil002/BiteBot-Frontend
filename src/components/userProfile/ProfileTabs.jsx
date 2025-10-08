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
            {/* Tabs navigation - using DaisyUI / Tailwind */}
            <div className="tabs tabs-boxed w-full grid grid-cols-4">
                <button
                    className={`tab flex items-center justify-center gap-2 ${
                        currentTab === "favorites" ? "tab-active" : ""
                    }`}
                    onClick={() => setTab("favorites")}
                >
                    <FaHeart className="w-4 h-4" />
                    <span className="hidden sm:inline">Favorites</span>
                </button>

                <button
                    className={`tab flex items-center justify-center gap-2 ${
                        currentTab === "subscriptions" ? "tab-active" : ""
                    }`}
                    onClick={() => setTab("subscriptions")}
                >
                    <FaUsers className="w-4 h-4" />
                    <span className="hidden sm:inline">Subscriptions</span>
                </button>

                <button
                    className={`tab flex items-center justify-center gap-2 ${
                        currentTab === "activity" ? "tab-active" : ""
                    }`}
                    onClick={() => setTab("activity")}
                >
                    <FaRegClock className="w-4 h-4" />
                    <span className="hidden sm:inline">Activity</span>
                </button>
            </div>

            {/* Tab contents */}
            <div className="mt-6">
                {/* Favorites */}
                {currentTab === "favorites" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Your Favorite Recipes
                        </h3>

                        {data?.favorites?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.favorites.map((recipe) => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        onClick={() =>
                                            handleRecipeClick(recipe)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="card bg-base-100 shadow">
                                <div className="card-body p-12 text-center">
                                    <FaHeart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <h4 className="text-lg font-semibold mb-2">
                                        No favorites yet
                                    </h4>
                                    <p className="text-gray-500 mb-4">
                                        Start exploring recipes and add them to
                                        your favorites
                                    </p>
                                    <div>
                                        <button
                                            className="btn"
                                            onClick={() => navigate("/")}
                                        >
                                            Discover Recipes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Subscriptions */}
                {currentTab === "subscriptions" && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">
                                Subscribed Chefs
                            </h3>

                            {data?.subscriptions?.length > 0 ? (
                                <div className="space-y-4">
                                    {data.subscriptions.map((chef) => (
                                        <div
                                            key={chef.id}
                                            className="card bg-base-100 shadow overflow-hidden"
                                        >
                                            <div className="card-body p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        {chef.avatar ? (
                                                            <img
                                                                src={
                                                                    chef.avatar
                                                                }
                                                                alt={chef.name}
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                                                                {chef.name?.charAt(
                                                                    0
                                                                ) ?? "U"}
                                                            </div>
                                                        )}

                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-semibold">
                                                                    {chef.name}
                                                                </h4>
                                                                {chef.isPremium && (
                                                                    <span className="badge badge-primary gap-2 flex items-center">
                                                                        <FaCrown className="w-3 h-3" />
                                                                        Premium
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <p className="text-sm text-gray-500">
                                                                {chef.recipes}{" "}
                                                                recipes •{" "}
                                                                {chef.followers}{" "}
                                                                followers
                                                            </p>

                                                            <p className="text-xs text-gray-500">
                                                                Subscribed since{" "}
                                                                {new Date(
                                                                    chef.subscribedDate
                                                                ).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <button
                                                            className="btn btn-outline"
                                                            onClick={() =>
                                                                handleChefClick(
                                                                    chef
                                                                )
                                                            }
                                                        >
                                                            View Profile
                                                        </button>

                                                        <button
                                                            className="btn btn-outline gap-2"
                                                            onClick={() =>
                                                                handleUnsubscribe(
                                                                    chef.id
                                                                )
                                                            }
                                                        >
                                                            <FaUserMinus className="w-4 h-4" />
                                                            Unsubscribe
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="card bg-base-100 shadow">
                                    <div className="card-body p-12 text-center">
                                        <FaUsers className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                        <h4 className="text-lg font-semibold mb-2">
                                            No subscriptions yet
                                        </h4>
                                        <p className="text-gray-500 mb-4">
                                            Follow your favorite chefs to see
                                            their latest recipes
                                        </p>
                                        <div>
                                            <button
                                                className="btn"
                                                onClick={() => navigate("/")}
                                            >
                                                Discover Chefs
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Subscription Recipes */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">
                                Latest from Your Subscriptions
                            </h3>

                            {data?.subscriptionRecipes?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {data.subscriptionRecipes.map((recipe) => (
                                        <RecipeCard
                                            key={recipe.id}
                                            recipe={recipe}
                                            onClick={() =>
                                                handleRecipeClick(recipe)
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="card bg-base-100 shadow">
                                    <div className="card-body p-8 text-center">
                                        <FaUtensils className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                                        <h4 className="font-semibold mb-2">
                                            No subscription recipes yet
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Subscribe to chefs to see their
                                            latest recipes here
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Activity */}
                {currentTab === "activity" && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Recent Activity
                        </h3>

                        {data?.activity?.length > 0 ? (
                            <div className="space-y-4">
                                {data.activity.map((activity, idx) => (
                                    <div
                                        key={idx}
                                        className="card bg-base-100 shadow"
                                    >
                                        <div className="card-body p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-primary rounded-full" />
                                                <div className="flex-1">
                                                    <p className="text-sm">
                                                        {activity.description}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(
                                                            activity.timestamp
                                                        ).toLocaleString(
                                                            undefined,
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="card bg-base-100 shadow">
                                <div className="card-body p-12 text-center">
                                    <FaRegClock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <h4 className="text-lg font-semibold mb-2">
                                        No activity yet
                                    </h4>
                                    <p className="text-gray-500">
                                        Your activity will appear here as you
                                        interact with recipes and chefs
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
