import { useState } from "react";
import {
    FaClock,
    FaHeart,
    FaLock,
    FaStar,
    FaUsers,
    FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, className = "" }) => {
    const [isFav, setIsFav] = useState(false);
    const totalTime = recipe.prepMinutes + recipe.cookMinutes;

    return (
        <div
            className={`card max-w-[350px] md:card-normal bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 ${className}`}
        >
            {/* Image with overlay elements */}
            <figure className="relative">
                <img
                    src={recipe.heroImage}
                    alt={recipe.title}
                    className="w-full object-cover h-48 md:h-56"
                />

                {/* Premium badge */}
                {recipe.isPremium && (
                    <div className="absolute top-3 left-3">
                        <div className="badge badge-primary gap-1 p-3 font-semibold">
                            <FaLock className="w-3 h-3" />
                            Premium
                        </div>
                    </div>
                )}

                {/* Favorite button */}
                <button
                    onClick={() => setIsFav(!isFav)}
                    className={`absolute top-3 right-3 btn btn-circle btn-sm ${
                        isFav ? "btn-error" : "btn-ghost bg-base-100/80"
                    }`}
                >
                    <FaHeart
                        className={`w-4 h-4 ${isFav ? "fill-current" : ""}`}
                    />
                </button>
            </figure>

            {/* Card content */}
            <div className="card-body p-4 md:p-5">
                <h3 className="card-title text-base-content line-clamp-2 text-lg">
                    {recipe.title}
                </h3>

                {recipe.description && (
                    <p className=" text-sm line-clamp-2">
                        {recipe.description}
                    </p>
                )}

                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-3 text-xs ">
                    <div className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        <span>{totalTime}m</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaUsers className="w-3 h-3" />
                        <span>{recipe.servings} servings</span>
                    </div>
                    {recipe.rating && (
                        <div className="flex items-center gap-1">
                            <FaStar className="w-3 h-3 text-warning" />
                            <span>{recipe.rating}</span>
                        </div>
                    )}
                </div>

                {/* Tags */}
                {recipe.tags && recipe.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {recipe.tags.slice(0, 3).map((tag) => (
                            <div
                                key={tag}
                                className="badge badge-outline badge-sm"
                            >
                                {tag}
                            </div>
                        ))}
                        {recipe.tags.length > 3 && (
                            <div className="badge badge-ghost badge-sm">
                                +{recipe.tags.length - 3}
                            </div>
                        )}
                    </div>
                )}

                {/* Cuisine and action button */}
                <div className="card-actions justify-between items-center mt-2">
                    {recipe.cuisine && (
                        <div className="flex items-center gap-1 text-sm ">
                            <FaUtensils className="w-3 h-3" />
                            <span>{recipe.cuisine}</span>
                        </div>
                    )}

                    <Link
                        to={`/recipe/${recipe.id}`}
                        className={`btn ${
                            recipe.isPremium ? "btn-primary" : "btn-secondary"
                        }`}
                    >
                        {recipe.isPremium ? "Unlock Recipe" : "View Recipe"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
