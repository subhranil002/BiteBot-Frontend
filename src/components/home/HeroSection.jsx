// Finalized

import { FaComments, FaHeart, FaRupeeSign, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

/* Reusable feature chip with tone-based styling */
function FeatureChip({ icon: Icon, text, tone }) {
  // Style variations based on tone
  const map = {
    orange: {
      base: "bg-orange-100/60 border-orange-200/60",
      hover: "hover:bg-orange-50",
      icon: "bg-orange-200/80 text-orange-600",
    },
    amber: {
      base: "bg-amber-100/60 border-amber-200/60",
      hover: "hover:bg-amber-50",
      icon: "bg-amber-200/80 text-amber-600",
    },
  };

  const t = map[tone];

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${t.base} ${t.hover}`}
    >
      {/* Icon container */}
      <div className={`p-2 rounded-full ${t.icon}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="font-medium text-gray-700">{text}</span>
    </div>
  );
}

/* Small reusable badge component */
function Badge({ children, tone }) {
  const map = {
    orange: "bg-orange-100 text-orange-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className={`badge font-medium px-3 py-2 ${map[tone]}`}>{children}</div>
  );
}

/* Hero section displayed at the top of the homepage */
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-amber-50">
      <div className="container mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Left: Heading, description, and actions */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Cook Smarter with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 drop-shadow-sm">
                  BiteBot
                </span>
              </h1>

              {/* Short product description */}
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover perfect recipes using AI-powered search. Find dishes
                based on ingredients you already have and connect with talented
                chefs worldwide.
              </p>
            </div>

            {/* Highlighted feature chips */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
              <FeatureChip
                icon={FaSearch}
                text="AI-Powered Search"
                tone="orange"
              />
              <FeatureChip icon={FaHeart} text="Save Favorites" tone="amber" />
            </div>

            {/* Primary action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/chat"
                className="btn btn-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-orange-600/30 transition-all duration-300 transform w-full sm:w-44 flex items-center justify-center gap-2"
              >
                <FaComments className="w-5 h-5" />
                Start Chat
              </Link>

              <Link
                to="/search"
                className="btn btn-lg border-2 border-orange-400 text-orange-600 hover:bg-orange-100/80 font-semibold rounded-2xl transition-all duration-300 w-full sm:w-44 flex items-center justify-center gap-2"
              >
                Explore Recipes
              </Link>
            </div>
          </div>

          {/* Right: Featured recipe card (hidden on small screens) */}
          <div className="hidden sm:flex justify-center">
            <div className="card w-full max-w-md bg-white border border-orange-100 rounded-3xl shadow-xl overflow-hidden transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl">
              {/* Recipe image */}
              <figure className="relative overflow-hidden">
                <img
                  src="https://thehappyfoodie.co.uk/wp-content/uploads/2023/06/106_SpicyButterTomatoWhiteFish1-1229x1536.jpg"
                  alt="Spicy Butter Tomato White Fish"
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </figure>

              {/* Recipe details */}
              <div className="p-6 space-y-3">
                <h2 className="text-xl font-bold text-gray-800">
                  Spicy Butter Tomato White Fish
                </h2>

                <div className="flex justify-between items-center">
                  <Badge tone="orange">25 mins</Badge>
                  <div className="flex gap-2">
                    <Badge tone="amber">Seafood</Badge>
                    <Badge tone="red">Spicy</Badge>
                  </div>
                </div>

                {/* Price and calorie info */}
                <div className="flex justify-end items-center gap-3 text-sm mt-2">
                  <span className="flex items-center font-bold text-orange-600 gap-1">
                    <FaRupeeSign className="text-base" />
                    500
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-amber-600">320 calories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
