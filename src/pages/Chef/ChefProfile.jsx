import { useEffect, useState } from "react";
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

// Example — matches your Mongoose User model
const MOCK_CHEF = {
  _id: "672b5d7a7b2c9b0012a8d123",
  role: "CHEF",
  email: "asha.roy@example.com",
  profile: {
    name: "Asha Roy",
    avatar: {
      secure_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60",
    },
    bio: "Passionate home-to-table chef sharing Bengali and fusion recipes that are simple to recreate. Focused on fresh ingredients and approachable techniques.",
    cuisine: ["indian", "bengali"],
    dietaryLabels: ["vegetarian", "organic"],
  },
  chefProfile: {
    education: "Culinary Arts, IHM Kolkata",
    experience: "8 years in traditional Bengali & fusion cuisine",
    externalLinks: [
      "https://instagram.com/asha_roy_cooks",
      "https://youtube.com/@asha_roy_cooks",
    ],
    subscriptionPrice: 4.99,
    recipes: [
      {
        _id: "r1",
        title: "Rosogolla (Soft Bengali Sweet)",
        heroImage:
          "https://happietrio.com/wp-content/uploads/2016/10/DSC_1656.jpg",
        description:
          "Soft, syrupy cheese balls simmered in light sugar syrup — an iconic Bengali sweet that's melt-in-your-mouth delightful.",
        servings: 8,
        cuisine: "Bengali",
        tags: ["Dessert", "Sweets", "Vegetarian"],
        isTrending: true,
        isPremium: false,
      },
      {
        _id: "r2",
        title: "Spicy Fish Curry",
        heroImage:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=60",
        description:
          "A bold, tangy fish curry with mustard and poppy seed flavors, perfect with steamed rice or rustic rotis.",
        servings: 4,
        cuisine: "Indian",
        tags: ["Seafood", "Dinner", "Spicy"],
        isTrending: false,
        isPremium: true,
      },
    ],
    reviews: [
      { name: "Sarah Johnson", message: "Amazing recipes! Every dish is perfect." },
      { name: "Mike Chen", message: "Love the authenticity and attention to detail." },
      { name: "Emma Davis", message: "Great techniques and flavor combinations." },
    ],
  },
  followers: 12400,
  rating: 4.8,
  createdAt: "2022-06-15T00:00:00.000Z",
};

const ChefProfile = () => {
  const [chef, setChef] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Here you’d replace this with your API call: e.g. axios.get(`/api/users/:id`)
    setChef(MOCK_CHEF);
  }, []);

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
  };

  if (!chef) return <div className="text-center py-20">Loading...</div>;

  const { profile, chefProfile } = chef;

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Banner */}
          <div className="relative mb-20">
            <div className="w-full h-64 sm:h-80 lg:h-[22rem] rounded-3xl overflow-hidden shadow-2xl border border-orange-100">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=60"
                alt={`${profile.name} banner`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-16 left-6 sm:left-12">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-2xl overflow-hidden ring-4 ring-orange-200">
                <img
                  src={profile.avatar?.secure_url}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-20 mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                {profile.name}
              </h1>
              <p className="text-gray-600 text-lg">{profile.bio}</p>

              {/* Cuisine Tags */}
              <div className="flex flex-wrap gap-2">
                {profile.cuisine?.map((c, i) => (
                  <span key={i} className="badge badge-outline border-orange-400 text-orange-500">
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
                    {new Date(chef.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaHeart className="w-4 h-4 text-orange-400" />
                  <span>{chef.followers.toLocaleString()} followers</span>
                </div>
              </div>
            </div>

            {/* Subscribe / message */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSubscribe}
                className={`btn gap-2 ${
                  subscribed
                    ? "btn-outline border-orange-400 text-orange-600"
                    : "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                }`}
              >
                <FaHeart />
                {subscribed ? "Subscribed" : `Subscribe • $${chefProfile.subscriptionPrice}`}
              </button>
              <button className="btn btn-outline gap-2">
                <FaRegComment className="text-orange-400" />
                Message Chef
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Followers", value: chef.followers.toLocaleString() },
              { label: "Recipes", value: chefProfile.recipes?.length || 0 },
              {
                label: "Rating",
                value: (
                  <div className="flex items-center justify-center gap-1">
                    <FaStar className="text-yellow-400" />
                    {chef.rating}
                  </div>
                ),
              },
              { label: "Chef Type", value: "Premium" },
            ].map((stat, i) => (
              <div key={i} className="card bg-base-100 p-5 text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recipes */}
          <div className="card bg-base-100 shadow p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <FaUtensils className="text-orange-500" />
              Recipes by {profile.name.split(" ")[0]}
            </h3>
            {chefProfile.recipes?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chefProfile.recipes.map((recipe) => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">No recipes yet</div>
            )}
          </div>

          {/* Reviews */}
          <div className="card bg-base-100 shadow p-6 mt-8">
            <h3 className="text-xl font-bold mb-4">What Subscribers Say</h3>
            <div className="space-y-4">
              {chefProfile.reviews.map((rev, i) => (
                <div key={i} className="border-b border-orange-50 pb-3">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{rev.name}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{rev.message}</p>
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
