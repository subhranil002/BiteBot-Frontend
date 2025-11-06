import { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaBolt, FaFire, FaGem, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  getFreshAndNew,
  getPremium,
  getQuickAndEasy,
  getRecommended,
  getTrending,
} from "../../redux/slices/homeSlice";
import RecipeCarousel from "../recipe/RecipeCarousel";

function RecipeCarousels() {
  const {
    trendingNow,
    freshAndNew,
    recommendedForYou,
    quickAndEasy,
    premiumPicks,
  } = useSelector((state) => state.home);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (trendingNow.length === 0) {
      dispatch(getTrending());
    }
    if (freshAndNew.length === 0) {
      dispatch(getFreshAndNew());
    }
    if (quickAndEasy.length === 0) {
      dispatch(getQuickAndEasy());
    }
    if (premiumPicks.length === 0) {
      dispatch(getPremium());
    }
    if (isLoggedIn && recommendedForYou.length === 0) {
      dispatch(getRecommended());
    }
  }, [isLoggedIn]);

  return (
    <div className="mx-auto sm:px-6 lg:px-8 space-y-10 bg-gradient-to-b from-white via-orange-50/40 to-amber-50/50">
      {/* For You */}
      {recommendedForYou && (
        <section className="space-y-6">
          <div className="px-1 sm:px-2">
            <RecipeCarousel
              title={
                <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold text-gray-800 px-1 sm:px-2">
                  <FaUser className="text-orange-500 drop-shadow-sm" />
                  <span className="bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                    Recommended for You
                  </span>
                </h2>
              }
              recipes={recommendedForYou}
              onRecipeClick={() => {}}
            />
          </div>
        </section>
      )}

      {/* Trending */}
      {trendingNow && (
        <section className="space-y-6">
          <div className="sm:px-2">
            <RecipeCarousel
              title={
                <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold text-gray-800 px-2 sm:px-2">
                  <FaFire className="text-orange-500 drop-shadow-sm" />
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Trending Now
                  </span>
                </h2>
              }
              recipes={trendingNow}
              onRecipeClick={() => {}}
            />
          </div>
        </section>
      )}

      {/* New Recipes */}
      {freshAndNew && (
        <section className="space-y-6">
          <div className="px-1 sm:px-2">
            <RecipeCarousel
              title={
                <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold text-gray-800 px-1 sm:px-2">
                  <AiFillStar className="text-yellow-500 drop-shadow-sm" />
                  <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                    Fresh & New
                  </span>
                </h2>
              }
              recipes={freshAndNew}
              onRecipeClick={() => {}}
            />
          </div>
        </section>
      )}

      {/* Quick & Easy */}
      {quickAndEasy && (
        <section className="space-y-6">
          <div className="px-1 sm:px-2">
            <RecipeCarousel
              title={
                <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold text-gray-800 px-1 sm:px-2">
                  <FaBolt className="text-orange-500 drop-shadow-sm" />
                  <span className="bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                    Quick & Easy
                  </span>
                </h2>
              }
              recipes={quickAndEasy}
              onRecipeClick={() => {}}
            />
          </div>
        </section>
      )}

      {/* Premium */}
      {premiumPicks && (
        <section className="space-y-6">
          <div className="px-1 sm:px-2">
            <RecipeCarousel
              title={
                <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold text-gray-800 px-1 sm:px-2">
                  <FaGem className="text-yellow-500 drop-shadow-sm" />
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Premium Picks
                  </span>
                </h2>
              }
              recipes={premiumPicks}
              onRecipeClick={() => {}}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default RecipeCarousels;
