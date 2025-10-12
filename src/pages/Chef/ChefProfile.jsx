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
        "https://happietrio.com/wp-content/uploads/2016/10/DSC_1656.jpg",
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
  const handleSubscribe = () => { };
  const subscribed = false;

  return (
    <HomeLayout>
      <div className="min-h-screen relative bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 overflow-hidden">
        {/* ✨ Ambient blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-rose-200 to-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          {/* Hero Section */}
          <div className="relative mb-20">
            <div className="w-full h-64 sm:h-80 lg:h-[22rem] rounded-3xl overflow-hidden shadow-2xl border border-orange-100">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=60"
                alt={`${chef.name} banner`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
            </div>

            {/* Avatar */}
            <div className="absolute -bottom-16 left-6 sm:left-12">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-2xl overflow-hidden ring-4 ring-orange-200">
                <img
                  src={chef.avatar}
                  alt={chef.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Chef Info */}
          <div className="mt-20 mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                {chef.name}
              </h1>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg mt-2">{chef.bio}</p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2">
                {chef.specialties.map((s, i) => (
                  <span key={i} className="badge badge-outline border-orange-400 text-orange-500">
                    {s}
                  </span>
                ))}
              </div>

              {/* Location & Joined */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="w-4 h-4 text-orange-400" />
                  <span>{chef.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="w-4 h-4 text-orange-400" />
                  <span>
                    Joined{" "}
                    {new Date(chef.joinedDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <button
                className={`btn gap-2 ${
                  subscribed
                    ? "btn-outline border-orange-400 text-orange-600 hover:bg-orange-50"
                    : "bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-500 hover:to-red-600"
                }`}
                
                onClick={handleSubscribe}
              >
                <FaHeart className="w-4 h-4" />
                <span>{subscribed ? "Subscribed" : `Subscribe • $${chef.subscriptionPrice}`}</span>
              </button>

              <button className="btn btn-outline gap-2">
                <FaRegComment className="w-4 h-4 text-orange-400" />
                Message Chef
              </button>

              <button className="btn btn-outline gap-2">
                <FaShareAlt className="w-4 h-4 text-orange-400" />
                Share
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { label: "Followers", value: chef.followers.toLocaleString() },
              { label: "Recipes", value: chef.recipes?.length || 0 },
              { label: "Rating", value: <div className="flex items-center justify-center gap-1"><FaStar className="text-yellow-400" /><span>{chef.rating}</span></div> },
              { label: "Chef Type", value: chef.isPremium ? "Premium" : "Free" },
            ].map((item, i) => (
              <div key={i} className="card bg-base-100 shadow-sm text-center p-5">
                <div className="text-2xl font-bold text-gray-800 mb-1">{item.value}</div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Left */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="card bg-base-100 shadow p-6">
                <h3 className="text-xl font-bold mb-4">About {chef.name.split(" ")[0]}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{chef.bio}</p>
                <h4 className="font-semibold text-gray-800 mb-2">Cooking Philosophy</h4>
                <p className="text-gray-600 italic mb-4">“I believe that great food starts with great ingredients…”</p>
                <h4 className="font-semibold mb-2 text-gray-800">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {chef.specialties.map((s, i) => (
                    <span key={i} className="badge badge-outline border-orange-400 text-orange-500">{s}</span>
                  ))}
                </div>
              </div>

              {/* Recipes */}
              <div className="card bg-base-100 shadow p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                  <FaUtensils className="w-5 h-5 text-orange-500" />
                  Recipes by {chef.name.split(" ")[0]}
                </h3>
                {chef.recipes?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {chef.recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} compact />)}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <FaUtensils className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                    <p>No recipes available yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Social */}
              <div className="card bg-base-100 shadow p-5">
                <h4 className="text-lg font-bold mb-3 text-gray-800">
                  Connect with {chef.name.split(" ")[0]}
                </h4>
                <div className="space-y-2">
                  {["Instagram", "YouTube Channel", "Personal Website"].map((label, i) => (
                    <button
                      key={i}
                      className="btn btn-outline w-full justify-start gap-2 text-sm border-orange-400 text-black-500 hover:bg-orange-50 hover:border-orange-500"
                    >
                      <FaExternalLinkAlt className="w-4 h-4 text-orange-400" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="card bg-base-100 shadow p-5">
                <h4 className="text-lg font-bold mb-3 text-gray-800">
                  What Subscribers Say
                </h4>
                <div className="space-y-5">
                  {SAMPLE_TESTIMONIALS.map((t) => (
                    <div key={t.id} className="border-b border-orange-50 pb-3 space-y-2">
                      <div className="flex items-center gap-3">
                        <img src={t.avatar} alt={t.author} className="w-8 h-8 rounded-full" />
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-800">{t.author}</div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <FaStar key={i} className="w-3 h-3 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{t.text}</p>
                      <div className="text-xs text-gray-400">{t.date}</div>
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

export default ChefProfile;
