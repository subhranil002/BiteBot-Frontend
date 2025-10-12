import { useState } from "react";
import {
    FaHeart,
    FaLock,
    FaStar,
    FaUsers,
    FaUtensils,
    FaFire,
    FaBolt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, className = "" }) => {
    const [isFav, setIsFav] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const totalTime = recipe.prepMinutes + recipe.cookMinutes;

    return (
        <div
          className={`relative group cursor-pointer ${className}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Soft orange-red-yellow hover glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-100 to-rose-100 rounded-3xl blur-xl transition-all duration-500 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-95"
            }`}
          ></div>
      
          {/* Main card container */}
          <div className="relative bg-base-100 border border-orange-100/60 rounded-3xl shadow-lg overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:border-orange-200 flex flex-col h-full">
            
            {/* Image section */}
            <figure className="relative overflow-hidden h-48 md:h-56">
              <img
                src={recipe.heroImage}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
      
              {/* Premium badge */}
              {recipe.isPremium && (
                <div className="absolute top-4 left-4">
                  <div className="badge bg-gradient-to-r from-amber-400 to-yellow-400 text-white font-bold border-0 shadow-md backdrop-blur-sm">
                    <FaLock className="w-3 h-3 mr-1" /> PREMIUM
                  </div>
                </div>
              )}
      
              {/* Trending badge */}
              {recipe.isTrending && (
                <div className="absolute top-4 left-4">
                  <div className="badge bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold border-0 shadow-md backdrop-blur-sm">
                    <FaFire className="w-3 h-3 mr-1" /> TRENDING
                  </div>
                </div>
              )}
      
              {/* Favorite button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsFav(!isFav);
                }}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full border transition-all duration-300 hover:scale-110 backdrop-blur-md ${
                  isFav
                    ? "bg-gradient-to-br from-rose-500 to-red-400 text-white border-red-300 shadow-lg"
                    : "bg-white/80 border-orange-100 text-orange-500 hover:bg-orange-50"
                }`}
              >
                <FaHeart
                  className={`w-4 h-4 mx-auto transition-all duration-300 ${
                    isFav ? "scale-110" : "scale-100"
                  }`}
                />
              </button>
            </figure>
      
            {/* Content section */}
            <div className="flex flex-col flex-grow p-5 md:p-6 justify-between">
              <div className="space-y-3">
                <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 via-red-500 to-amber-500 bg-clip-text text-transparent line-clamp-2 group-hover:brightness-110">
                  {recipe.title}
                </h3>
      
                {recipe.description && (
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                    {recipe.description}
                  </p>
                )}
      
                {/* Meta info */}
                <div className="grid grid-cols-2 gap-3 text-sm mt-2">
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-gray-700 transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center border border-orange-300">
                      <FaUsers className="w-3 h-3 text-orange-500" />
                    </div>
                    <span>{recipe.servings} servings</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-gray-700 transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center border border-orange-300">
                      <FaUtensils className="w-3 h-3 text-red-500" />
                    </div>
                    <span>{recipe.cuisine}</span>
                  </div>
                </div>
      
                {/* Tags */}
                {recipe.tags && recipe.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recipe.tags.slice(0, 3).map((tag) => (
                      <div
                        key={tag}
                        className="badge border border-orange-100 text-gray-600 bg-orange-50/50 hover:bg-orange-100 hover:text-orange-700 transition-all duration-300 rounded-lg"
                      >
                        {tag}
                      </div>
                    ))}
                    {recipe.tags.length > 3 && (
                      <div className="badge bg-gradient-to-r from-orange-200 to-amber-300 text-gray-800 border-0">
                        +{recipe.tags.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
      
              {/* Button area */}
              <div className="pt-4">
                <Link
                  to={`/recipe/${recipe.id}`}
                  className={`w-full btn rounded-2xl font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                    recipe.isPremium
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 border-0 text-gray-900 shadow-amber-200/40"
                      : "bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 border-0 text-white shadow-orange-200/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {recipe.isPremium ? (
                      <>
                        <FaLock className="w-3 h-3" />
                        Unlock Recipe
                      </>
                    ) : (
                      <>
                        <FaBolt className="w-3 h-3" />
                        View Recipe
                      </>
                    )}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default RecipeCard;
