import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaBolt, FaHeart, FaLock, FaUsers, FaUtensils } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import favouriteToggleApi from "../../apis/recipe/favouriteToggleApi";

const s = (id) => (id ? id.toString() : "");

const Badge = ({ children, className = "" }) => (
  <div className={`badge rounded-lg ${className}`}>{children}</div>
);

const Stat = ({ icon: Icon, iconClass = "", text }) => (
  <div className="flex items-center gap-2 text-gray-500 md:group-hover:text-gray-700 transition-colors">
    <div className="w-8 h-8 rounded-xl bg-linear-to-br from-orange-200 to-amber-200 flex items-center justify-center border border-orange-300">
      <Icon className={`w-4 h-4 ${iconClass}`} />
    </div>
    <span className="truncate">{text}</span>
  </div>
);

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  const recipeId = s(recipe?._id);
  const chefId = s(recipe?.chefId);

  const unlocked = useMemo(() => {
    if (!recipe || !userData) return true;

    if (userData.role === "CHEF") {
      return s(recipe.chefId) === s(userData._id) || !recipe.isPremium;
    }

    if (!recipe.isPremium) return true;

    const subs = userData?.profile?.subscribed ?? [];
    return subs.some((sub) => s(sub._id) === chefId);
  }, [recipe, userData, chefId]);

  const initialFav = useMemo(() => {
    const favs = userData?.favourites ?? [];
    return favs.some((fav) => s(fav) === recipeId);
  }, [userData, recipeId]);

  const [isFav, setIsFav] = useState(initialFav);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFav(initialFav);
  }, [initialFav]);

  const toggleFav = useCallback(async () => {
    if (!recipeId) return;

    setLoading(true);
    setIsFav((prev) => !prev);

    try {
      await favouriteToggleApi(recipeId);
    } catch (err) {
      setIsFav((prev) => !prev);
      toast.error("Could not update favourite. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  const handleRecipeViewButton = useCallback(() => {
    if (!recipeId) return;

    if (unlocked) {
      navigate(`/recipe/${recipeId}`);
    } else {
      toast.error("Please subscribe to this chef to unlock recipe");
      navigate(`/profile/${chefId}`);
    }
  }, [unlocked, recipeId, chefId, navigate]);

  return (
    <article
      className="group w-[300px] h-[450px] m-3"
      role="region"
      aria-label={recipe?.title ?? "Recipe"}
    >
      <div className="relative bg-base-100 border border-orange-100/60 rounded-3xl shadow-lg overflow-hidden transition-all duration-300 md:group-hover:scale-[1.02] md:group-hover:shadow-2xl md:group-hover:border-orange-200 flex flex-col h-full">
        {/* Image */}
        <figure className="relative overflow-hidden aspect-16/10">
          <img
            src={recipe?.thumbnail?.secure_url}
            alt={recipe?.title ? `${recipe.title} thumbnail` : "Recipe image"}
            className="w-full h-full object-cover transition-transform duration-700 motion-reduce:transition-none md:group-hover:scale-110"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 400px"
          />

          {recipe?.isPremium && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-linear-to-r from-amber-400 to-yellow-400 text-white font-bold border-0 shadow-md backdrop-blur-sm">
                <FaLock className="w-3 h-3 mr-1" /> PREMIUM
              </Badge>
            </div>
          )}

          {/* Fav button */}
          <button
            type="button"
            onClick={toggleFav}
            disabled={loading}
            aria-pressed={isFav}
            aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
            className={[
              "absolute top-3 right-3 btn btn-circle rounded-full border transition-all duration-200 md:hover:scale-110 backdrop-blur-md",
              isFav
                ? "bg-linear-to-br from-rose-500 to-red-400 text-white border-red-300 shadow-lg"
                : "bg-white/80 border-orange-100 text-orange-500 md:hover:bg-orange-50",
              loading ? "pointer-events-none opacity-80" : "",
            ].join(" ")}
          >
            <FaHeart
              className={`w-4 h-4 mx-auto transition-transform duration-200 ${
                isFav ? "scale-110" : "scale-100"
              }`}
            />
          </button>
        </figure>

        {/* Content */}
        <div className="card-body flex flex-col grow p-4 md:p-6">
          <div className="space-y-3">
            <h3 className="card-title text-base md:text-lg font-bold bg-linear-to-r from-orange-600 via-red-500 to-amber-500 bg-clip-text text-transparent line-clamp-1 md:group-hover:brightness-110">
              {recipe?.title}
            </h3>

            {!!recipe?.description && (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 md:group-hover:text-gray-700 transition-colors duration-200">
                {recipe.description}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm mt-2">
              <Stat
                icon={FaUsers}
                iconClass="text-orange-500"
                text={`${recipe?.servings ?? "-"} servings`}
              />
              <Stat
                icon={FaUtensils}
                iconClass="text-red-500"
                text={recipe?.cuisine ?? "Cuisine"}
              />
            </div>

            {!!recipe?.dietaryLabels?.length && (
              <div className="card-actions flex flex-wrap gap-2 mt-2">
                {recipe.dietaryLabels.slice(0, 2).map((label) => (
                  <Badge
                    key={label}
                    className="border border-orange-100 text-gray-600 bg-orange-50/60 md:hover:bg-orange-100 md:hover:text-orange-700 transition-colors"
                  >
                    {label}
                  </Badge>
                ))}
                {recipe.dietaryLabels.length > 2 && (
                  <Badge className="bg-linear-to-r from-orange-200 to-amber-300 text-gray-800 border-0">
                    +{recipe.dietaryLabels.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4">
            <button
              type="button"
              onClick={handleRecipeViewButton}
              className={[
                "w-full btn rounded-2xl font-bold transition-transform duration-200 md:hover:-translate-y-0.5 md:hover:shadow-xl border-0",
                unlocked
                  ? "bg-linear-to-r from-orange-400 to-red-400 md:hover:from-orange-500 md:hover:to-red-500 text-white shadow-orange-200/40"
                  : "bg-linear-to-r from-yellow-400 to-amber-500 md:hover:from-yellow-500 md:hover:to-amber-600 text-gray-900 shadow-amber-200/40",
              ].join(" ")}
            >
              <span className="flex items-center gap-2">
                {unlocked ? (
                  <>
                    <FaBolt className="w-3 h-3" />
                    View Recipe
                  </>
                ) : (
                  <>
                    <FaLock className="w-3 h-3" />
                    Unlock Recipe
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
