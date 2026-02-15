// Finalized

import { useRef } from "react";
import { FaHome, FaSearch, FaUtensils } from "react-icons/fa";
import { GiCookingPot, GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";

import { FloatingIcons } from "../components/FloatingFoodIcons";

export default function NotFound() {
  // Decorative floating icons reference
  const floatingIconsRef = useRef(FloatingIcons);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Background floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIconsRef.current}
      </div>

      {/* Main glass card container */}
      <div className="card glass shadow-2xl p-10 max-w-2xl text-center z-10">
        {/* Large 404 heading */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-extrabold bg-linear-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent animate-linear-x drop-shadow-lg">
            404
          </h1>
        </div>

        {/* Message section */}
        <div className="space-y-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Recipe Not Found!
          </h2>
          <p className="text-lg opacity-80">
            Oops! This recipe might have simmered away into the digital kitchen.
            Let’s get you cooking again with something delicious!
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="btn btn-primary bg-linear-to-r from-orange-500 to-red-500 text-white border-none shadow-lg hover:scale-105 transition-transform"
          >
            <FaHome className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <Link
            to="/search"
            className="btn border-2 border-orange-400 text-orange-600 hover:bg-orange-100/80 hover:scale-105 transition-transform font-semibold duration-300 w-full sm:w-44 flex items-center justify-center gap-2"
          >
            <FaSearch className="w-5 h-5 mr-2" />
            Explore Recipes
          </Link>
        </div>

        {/* Decorative cooking steps */}
        <div className="flex justify-center gap-8 text-gray-500 mb-8">
          <div className="flex items-center gap-2 animate-bounce delay-100">
            <GiKnifeFork className="w-6 h-6 text-orange-500" />
            <span className="text-sm font-medium">Chop</span>
          </div>
          <div className="flex items-center gap-2 animate-bounce delay-300">
            <GiCookingPot className="w-7 h-7 text-amber-500" />
            <span className="text-sm font-medium">Cook</span>
          </div>
          <div className="flex items-center gap-2 animate-bounce delay-500">
            <FaUtensils className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium">Serve</span>
          </div>
        </div>

        {/* AI suggestion card */}
        <div className="card bg-base-100/60 backdrop-blur-xl border border-orange-200/50 shadow-lg hover:shadow-xl transition-all p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <GiCookingPot className="w-8 h-8 text-amber-500 animate-pulse" />
            <h3 className="text-lg font-semibold text-gray-800">
              AI Kitchen Tip
            </h3>
          </div>

          <p className="text-gray-600 text-sm">
            While we search for that missing recipe, why not ask our AI Chef for
            some cooking tips or a recipe suggestion based on what you have on
            hand?
          </p>

          <Link
            to="/chat"
            className="btn btn-sm mt-4 bg-linear-to-r from-orange-500 to-red-500 text-white shadow-md hover:scale-105 transition-transform"
          >
            Try AI Chef →
          </Link>
        </div>
      </div>
    </div>
  );
}
