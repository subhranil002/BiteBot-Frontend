import { useEffect, useState } from "react";
import { FaHeart, FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";

import getFavouritesApi from "../../apis/user/getFavouritesApi";
import RecipeCard from "../../components/recipe/RecipeCard";
import HomeLayout from "../../layouts/HomeLayout";

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getFavouritesApi();
      setFavourites(res.data);
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/60 to-amber-50/60 py-12">
        {/* Header */}
        <div className="text-center px-6 space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent">
              Your Favourites
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            All your saved recipes — ready to cook, explore, and enjoy
            <FaUtensils className="text-gray-400 text-2xl inline-block" />
          </p>
        </div>

        {/* Favourites Section */}
        {favourites && favourites.length > 0 ? (
          <div className="container mx-auto sm:px-6 lg:px-8 flex justify-center">
            <div
              className="
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
              "
            >
              {favourites.map((recipe) => (
                <RecipeCard key={recipe._id.toString()} recipe={recipe} />
              ))}
            </div>
          </div>
        ) : (
          // Empty State
          <div className="flex  flex-col items-center justify-center text-center mt-24 space-y-4 px-6">
            <div className="bg-orange-100 p-6 rounded-full">
              <FaHeart className="text-6xl text-orange-500" />
            </div>

            <h3 className="text-2xl font-bold text-gray-800">
              No Favourites Yet
            </h3>

            <p className="text-gray-600 max-w-md flex flex-wrap justify-center items-center gap-1">
              You haven&apos;t saved any recipes yet. Explore and tap the
              <FaHeart className="text-pink-500 inline-block mx-1" />
              to save your favorite dishes!
            </p>

            <Link
              to="/"
              className="btn mt-4 bg-gradient-to-r from-orange-500 to-red-500 
             hover:from-orange-600 hover:to-red-600 text-white 
             font-semibold border-0 shadow-md hover:shadow-lg 
             transition-all duration-300 normal-case text-lg 
             rounded-xl px-6 py-3"
              aria-label="Explore Recipes"
            >
              Explore Recipes
            </Link>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default Favourites;
