import { FaHeart, FaUtensils } from "react-icons/fa";
import { useSelector } from "react-redux";
import RecipeCard from "../components/recipe/RecipeCard";
import HomeLayout from "../layouts/HomeLayout";
import { Link } from "react-router-dom";

function Favorites() {
  const { userData } = useSelector((state) => state.auth);

  const favorites = userData?.favourites

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/60 to-amber-50/60 py-12">
        {/* Header */}
        <div className="text-center px-6 space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent">
              Your Favorites
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            All your saved recipes — ready to cook, explore, and enjoy
            <FaUtensils className="text-gray-400 text-2xl inline-block" />
          </p>
        </div>

        {/* Favorites Section */}
        {favorites && favorites.length > 0 ? (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <div className="flex items-center gap-3 mb-8">
              <FaHeart className="text-orange-500 text-2xl" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                Saved Recipes
              </h2>
            </div>

            <div
              className="
                flex flex-wrap justify-start gap-8
              "
            >
              {favorites.map((recipe) => (
                <div
                  key={recipe._id}
                  className="
                    flex justify-center
                    w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)]
                    max-w-[320px]
                    h-[560px]
                  "
                >
                  <RecipeCard recipe={recipe} />
                </div>
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
              No Favorites Yet
            </h3>

            <p className="text-gray-600 max-w-md flex flex-wrap justify-center items-center gap-1">
              You haven’t saved any recipes yet. Explore and tap the
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

export default Favorites;
