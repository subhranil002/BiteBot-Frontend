import { useState } from "react";
import {
    FaCalendarAlt,
    FaHeart,
    FaRegComment,
    FaStar,
    FaUtensils,
} from "react-icons/fa";

import RecipeCard from "../../components/recipe/RecipeCard";
import HomeLayout from "../../layouts/HomeLayout";

const ChefProfile = ({ profileData }) => {
    function modifyCloudinaryURL(url) {
        if (url === "" || url === null) return "";
        if (import.meta.env.VITE_IMAGE_TRANSFORMATION === "true") {
            return url.replace(
                "/upload/",
                "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
            );
        }
        return url;
    }

    const [subscribed] = useState(false);

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Banner */}
                    <div className="relative mb-20">
                        <div className="w-full h-64 sm:h-80 lg:h-[22rem] rounded-3xl overflow-hidden shadow-2xl border border-orange-100">
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=60"
                                alt="banner"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="absolute -bottom-16 left-6 sm:left-12">
                            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-2xl overflow-hidden ring-4 ring-orange-200">
                                {profileData?.profile?.avatar ? (
                                    <img
                                        alt="Profile Avatar"
                                        src={modifyCloudinaryURL(
                                            profileData?.profile?.avatar
                                                ?.secure_url || ""
                                        )}
                                    />
                                ) : (
                                    <div className="bg-orange-100 flex items-center justify-center text-2xl font-semibold text-orange-500">
                                        {profileData?.profile?.name?.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="mt-20 mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                        <div className="space-y-4 max-w-2xl">
                            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                                {profileData?.profile?.name}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {profileData?.profile?.bio}
                            </p>

                            {/* Cuisine */}
                            <div className="flex flex-wrap gap-2">
                                {profileData?.profile?.cuisine?.map((c, i) => (
                                    <span
                                        key={i}
                                        className="badge badge-outline border-orange-400 text-orange-500"
                                    >
                                        {c}
                                    </span>
                                ))}
                            </div>

                            {/* Joined + followers */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <FaCalendarAlt className="w-4 h-4 text-orange-400" />
                                    <span>
                                        Joined{" "}
                                        {new Date(
                                            profileData.createdAt
                                        ).toLocaleDateString("en-IN", {
                                            month: "long",
                                            year: "numeric",
                                            timeZone: "Asia/Kolkata",
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaHeart className="w-4 h-4 text-orange-400" />
                                    <span>
                                        {profileData?.chefProfile?.subscribers
                                            ?.length || 0}{" "}
                                        Subscribers
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Subscribe / message */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {}}
                                className={`btn gap-2 ${
                                    subscribed
                                        ? "btn-outline border-orange-400 text-orange-600"
                                        : "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                                }`}
                            >
                                <FaHeart />
                                {subscribed
                                    ? "Subscribed"
                                    : `Subscribe • $${profileData?.chefProfile?.subscriptionPrice}`}
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                        {[
                            {
                                label: "Subscribers",
                                value:
                                    profileData?.chefProfile?.subscribers
                                        ?.length || 0,
                            },
                            {
                                label: "Recipes",
                                value:
                                    profileData?.chefProfile?.recipes?.length ||
                                    0,
                            },
                            {
                                label: "Chef Type",
                                value:
                                    profileData?.chefProfile
                                        ?.subscriptionPrice > 0
                                        ? "Premium"
                                        : "Free",
                            },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="card bg-base-100 p-5 text-center"
                            >
                                <div className="text-2xl font-bold">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recipes */}
                    <div className="card bg-base-100 shadow p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                            <FaUtensils className="text-orange-500" />
                            Recipes by {profileData?.profile?.name}
                        </h3>
                        {profileData?.chefProfile?.recipes?.length ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {profileData?.chefProfile?.recipes.map(
                                    (recipe) => (
                                        <RecipeCard
                                            key={recipe._id}
                                            recipe={recipe}
                                        />
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                No recipes yet
                            </div>
                        )}
                    </div>

                    {/* Reviews */}
                    <div className="card bg-base-100 shadow p-6 mt-8">
                        <h3 className="text-xl font-bold mb-4">
                            What Subscribers Say
                        </h3>
                        <div className="space-y-4">
                            {profileData?.chefProfile?.reviews.map((rev, i) => (
                                <div
                                    key={i}
                                    className="border-b border-orange-50 pb-3"
                                >
                                    <div className="flex items-center gap-2">
                                        <FaStar className="text-yellow-400" />
                                        <span className="font-semibold">
                                            {rev.name}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {rev.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default ChefProfile;
