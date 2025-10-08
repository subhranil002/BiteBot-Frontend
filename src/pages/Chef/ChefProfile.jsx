import { useState } from "react";
import {
    FaCalendarAlt,
    FaExternalLinkAlt,
    FaHeart,
    FaMapMarkerAlt,
    FaRegComment,
    FaShareAlt,
    FaStar,
    FaUtensils,
} from "react-icons/fa";

import RecipeCard from "../../components/recipe/RecipeCard";
import HomeLayout from "../../layouts/HomeLayout";

const HARDCODED_CHEF = {
    id: "chef1",
    name: "Asha Roy",
    bio: "Passionate home-to-table chef sharing Bengali and fusion recipes that are simple to recreate. I focus on fresh ingredients and approachable techniques.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60",
    specialties: ["Bengali", "Sweets", "Street Food"],
    location: "Kolkata, India",
    joinedDate: "2022-06-15T00:00:00.000Z",
    subscriptionPrice: 4.99,
    followers: 12400,
    rating: 4.8,
    isPremium: true,
    recipes: [
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

const SAMPLE_TESTIMONIALS = [
    {
        id: 1,
        author: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=60",
        rating: 5,
        text: "Amazing recipes! Every dish I've tried has been perfect.",
        date: "2 weeks ago",
    },
    {
        id: 2,
        author: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1545996124-1f5b4f1a3b6b?w=200&q=60",
        rating: 5,
        text: "Love the authenticity and attention to detail.",
        date: "1 month ago",
    },
    {
        id: 3,
        author: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=60",
        rating: 4,
        text: "Great techniques and flavor combinations.",
        date: "2 months ago",
    },
];

const ChefProfile = () => {
    const [chef] = useState(HARDCODED_CHEF);
    const handleSubscribe = () => {};
    const subscribed = false;

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-base-100 via-slate-50 to-accent/5">
                <div className="container mx-auto px-4 py-8">
                    {/* Hero */}
                    <div className="relative mb-8">
                        <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=60"
                                alt={`${chef.name} banner`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                                <img
                                    src={chef.avatar}
                                    alt={chef.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Chef Info */}
                    <div className="mt-20 mb-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">
                                        {chef.name}
                                    </h1>
                                    <p className="text-lg text-gray-600 max-w-2xl">
                                        {chef.bio}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {chef.specialties.map((s, i) => (
                                        <span
                                            key={i}
                                            className="badge badge-outline"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <FaMapMarkerAlt className="w-4 h-4" />
                                        <span>{chef.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt className="w-4 h-4" />
                                        <span>
                                            Joined{" "}
                                            {new Date(
                                                chef.joinedDate
                                            ).toLocaleDateString("en-US", {
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                                <button
                                    className={`btn btn-lg flex items-center gap-2 ${
                                        subscribed ? "btn-ghost" : "btn-primary"
                                    }`}
                                    onClick={handleSubscribe}
                                >
                                    <FaHeart className="w-4 h-4" />
                                    <span>
                                        {subscribed
                                            ? "Subscribed"
                                            : `Subscribe • $${chef.subscriptionPrice}`}
                                    </span>
                                </button>

                                <button
                                    className="btn btn-outline btn-lg flex items-center gap-2"
                                    onClick={() => {
                                        /* intentionally blank — message action left as noop */
                                    }}
                                >
                                    <FaRegComment className="w-4 h-4" />
                                    Message Chef
                                </button>

                                <button
                                    className="btn btn-ghost btn-lg flex items-center gap-2"
                                    onClick={() => {
                                        /* intentionally blank — share action left as noop */
                                    }}
                                >
                                    <FaShareAlt className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="card bg-base-100 shadow">
                                <div className="card-body p-6 text-center">
                                    <div className="text-3xl font-bold text-gray-900">
                                        {chef.followers.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Followers
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-100 shadow">
                                <div className="card-body p-6 text-center">
                                    <div className="text-3xl font-bold text-gray-900">
                                        {chef.recipes?.length || 0}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Recipes
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-100 shadow">
                                <div className="card-body p-6 text-center">
                                    <div className="flex items-center justify-center gap-1 text-3xl font-bold text-gray-900">
                                        <FaStar className="w-6 h-6 text-yellow-400" />
                                        <span>{chef.rating}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Rating
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-100 shadow">
                                <div className="card-body p-6 text-center">
                                    <div className="text-3xl font-bold text-gray-900">
                                        {chef.isPremium ? "Premium" : "Free"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Chef Type
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main content + Sidebar */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* About */}
                            <div className="card bg-base-100 shadow">
                                <div className="card-body p-6">
                                    <h3 className="text-xl font-semibold mb-4">
                                        About {chef.name.split(" ")[0]}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed text-lg mb-4">
                                        {chef.bio}
                                    </p>

                                    <h4 className="font-semibold mb-2">
                                        Cooking Philosophy
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        "I believe that great food starts with
                                        great ingredients and a passion for
                                        bringing people together. Every recipe I
                                        share comes from years of experience and
                                        a desire to make restaurant-quality
                                        dishes accessible to home cooks."
                                    </p>

                                    <h4 className="font-semibold mb-2">
                                        Specializations
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {chef.specialties.map((s, i) => (
                                            <span
                                                key={i}
                                                className="badge badge-outline text-sm"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Recipes */}
                            <div className="card bg-base-100 shadow">
                                <div className="card-body p-6">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <FaUtensils className="w-5 h-5" />
                                        Recipes by {chef.name.split(" ")[0]}
                                    </h3>

                                    {chef.recipes && chef.recipes.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {chef.recipes.map((recipe) => (
                                                <RecipeCard
                                                    key={recipe.id}
                                                    recipe={recipe}
                                                    compact
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <FaUtensils className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                            <p className="text-gray-500">
                                                No recipes available yet
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Social Links */}
                            <div className="card bg-base-100 shadow">
                                <div className="card-body p-4">
                                    <h4 className="text-lg font-medium mb-3">
                                        Connect with {chef.name.split(" ")[0]}
                                    </h4>

                                    <div className="space-y-2">
                                        <button className="btn btn-outline w-full justify-start text-sm flex items-center gap-2">
                                            <FaExternalLinkAlt className="w-4 h-4" />
                                            Instagram
                                        </button>
                                        <button className="btn btn-outline w-full justify-start text-sm flex items-center gap-2">
                                            <FaExternalLinkAlt className="w-4 h-4" />
                                            YouTube Channel
                                        </button>
                                        <button className="btn btn-outline w-full justify-start text-sm flex items-center gap-2">
                                            <FaExternalLinkAlt className="w-4 h-4" />
                                            Personal Website
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div className="card bg-base-100 shadow">
                                <div className="card-body p-4">
                                    <h4 className="text-lg font-medium mb-3">
                                        What Subscribers Say
                                    </h4>

                                    <div className="space-y-4">
                                        {SAMPLE_TESTIMONIALS.map((t) => (
                                            <div
                                                key={t.id}
                                                className="space-y-2"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={t.avatar}
                                                        alt={t.author}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="font-medium text-sm">
                                                            {t.author}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {Array.from({
                                                                length: t.rating,
                                                            }).map((_, i) => (
                                                                <FaStar
                                                                    key={i}
                                                                    className="w-3 h-3 text-yellow-400"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-gray-600">
                                                    {t.text}
                                                </p>
                                                <div className="text-xs text-gray-500">
                                                    {t.date}
                                                </div>

                                                {t.id !==
                                                    SAMPLE_TESTIMONIALS.length && (
                                                    <hr className="my-3 border-t" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default ChefProfile;
