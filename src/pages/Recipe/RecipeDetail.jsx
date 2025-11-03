import { useEffect, useState } from "react";
import { FaClock, FaHeart, FaStar, FaUsers } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import getRecipeByIdApi from "../../apis/recipe/getRecipeByIdApi";
// import RecipeCard from "../../components/recipe/RecipeCard";
import HomeLayout from "../../layouts/HomeLayout";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [chef, setChef] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [cost, setCost] = useState({
    total: 0,
    perServing: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) navigate("/");
    (async () => {
      const res = await getRecipeByIdApi(id);
      setRecipe(res.data);
      setChef(res.data.chefId);
    })();
  }, [id]);

  useEffect(() => {
    const totalCost = recipe?.ingredients.reduce((sum, ing) => {
      return sum + Number(ing.quantity) * Number(ing.marketPrice || 0);
    }, 0);
    const costPerServing = recipe?.servings
      ? totalCost / recipe.servings
      : totalCost;
    setCost({
      total: totalCost,
      perServing: costPerServing,
    });
  }, [recipe]);

  const handleLike = () => {
    setIsLiked((s) => !s);
  };

  console.log(recipe);

  if (!recipe) return "Loading...";

  return (
    <HomeLayout>
      <div className="min-h-screen relative bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 py-10 relative z-10">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Hero Section */}
            <div className="hero relative rounded-3xl overflow-hidden shadow-xl border border-orange-100">
              <div className="hero-overlay bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
              <img
                src={recipe.thumbnail?.secure_url}
                alt={recipe.title}
                className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Like Button in Hero */}
              <button
                onClick={handleLike}
                className={`absolute top-4 right-4 btn btn-circle ${
                  isLiked
                    ? "bg-rose-500 text-white border-none"
                    : "bg-white/80 text-gray-700 border-none hover:bg-white"
                }`}
              >
                <FaHeart className="w-5 h-5" />
              </button>

              <div className="hero-content text-start text-white absolute bottom-8 left-6 sm:left-10">
                <div className="max-w-lg">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
                    {recipe.title}
                  </h1>
                  <p className="text-sm sm:text-base text-white/90 mt-1">
                    {recipe.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left (Main content) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Chef Info */}
                <div className="card bg-base-100 shadow-md border border-orange-100 hover:shadow-orange-200/60 transition-all hover:-translate-y-1">
                  <div className="card-body">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-14 h-14 rounded-full border-2 border-orange-200">
                            <img
                              src={chef.profile?.avatar?.secure_url}
                              alt={chef.profile?.name}
                            />
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/profile/${chef._id}`}
                            className="card-title link link-hover text-orange-600"
                          >
                            {chef.profile?.name}
                          </Link>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <FaStar className="text-yellow-400" />{" "}
                            {recipe.averageRating} • {recipe.reviewCount}{" "}
                            reviews
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-outline border-orange-300 text-orange-600 hover:bg-orange-50">
                        <FaHeart className="text-orange-500" /> Subscribe
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <FaUsers />,
                      label: "Servings",
                      value: recipe.servings,
                    },
                    {
                      icon: <FaClock />,
                      label: "Total Time",
                      value: `${recipe.totalCookingTime} min`,
                    },
                    {
                      icon: <FaHeart />,
                      label: "Likes",
                      value: recipe.likes?.length || 0,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="card bg-base-100 shadow-sm border border-orange-100 hover:shadow-orange-200/60 transition-all hover:-translate-y-1"
                    >
                      <div className="card-body items-center text-center p-4">
                        <div className="text-orange-500 text-xl mb-1">
                          {item.icon}
                        </div>
                        <div className="card-title text-gray-700">
                          {item.value}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dietary Labels */}
                {recipe.dietaryLabels?.length > 0 && (
                  <div className="card bg-base-100 shadow-sm border border-orange-100">
                    <div className="card-body">
                      <h3 className="card-title text-gray-800">
                        Dietary Information
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recipe.dietaryLabels.map((label, index) => (
                          <div
                            key={index}
                            className="badge badge-outline border-green-400 text-green-600"
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Ingredients */}
                <div className="card bg-base-100 shadow-lg border border-orange-100">
                  <div className="card-body">
                    <h3 className="card-title text-gray-800">Ingredients</h3>

                    <p className="text-sm text-gray-500">
                      Estimated cost: ${cost?.total?.toFixed(2) ?? "0.00"}
                      {cost?.perServing > 0 &&
                        ` ($${cost?.perServing?.toFixed(2)} per serving)`}
                    </p>

                    <div className="overflow-x-auto">
                      <table className="table table-zebra">
                        <thead>
                          <tr>
                            <th>Ingredient</th>
                            <th>Quantity</th>
                            <th className="text-right">Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recipe.ingredients.map((ing, index) => (
                            <tr key={index}>
                              <td className="font-medium">{ing.name}</td>
                              <td className="text-gray-600">
                                {ing.quantity} {ing.unit}
                              </td>
                              <td className="text-right text-gray-500">
                                $
                                {(
                                  (ing.quantity || 0) * (ing.marketPrice || 0)
                                ).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="card bg-base-100 shadow-lg border border-orange-100">
                  <div className="card-body">
                    <h3 className="card-title text-gray-800">Instructions</h3>
                    <div className="space-y-8">
                      {recipe.steps.map((step, i) => (
                        <div key={i} className="space-y-4">
                          {/* Instruction Text */}
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full font-semibold shadow-md flex-shrink-0">
                              {step.stepNo}
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-700 leading-relaxed text-lg">
                                {step.instruction}
                              </p>
                            </div>
                          </div>

                          {/* Step Image */}
                          {step.imageUrl?.secure_url && (
                            <div className="w-full">
                              <img
                                src={step.imageUrl.secure_url}
                                alt={`Step ${step.stepNo}`}
                                className="rounded-lg shadow-md w-full max-h-96 object-cover"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* External Media Links */}
                {recipe.externalMediaLinks?.length > 0 && (
                  <div className="card bg-base-100 shadow-lg border border-orange-100">
                    <div className="card-body">
                      <h3 className="card-title text-gray-800">
                        Related Media
                      </h3>
                      <div className="space-y-2">
                        {recipe.externalMediaLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
                          >
                            <span className="font-medium text-orange-600">
                              {link.name}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Rating & Reviews */}
                <div className="card bg-base-100 shadow-md border border-orange-100">
                  <div className="card-body text-center">
                    <div className="rating rating-lg rating-half justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <input
                          key={i}
                          type="radio"
                          name="rating-10"
                          className="bg-yellow-400 mask mask-star-2 mask-half-1"
                          checked={i < Math.floor(recipe.averageRating)}
                          readOnly
                        />
                      ))}
                    </div>
                    <div className="text-2xl font-bold text-gray-700">
                      {recipe.averageRating}
                    </div>
                    <p className="text-sm text-gray-500">
                      Based on {recipe.reviewCount} reviews
                    </p>
                    <div className="mt-3 text-sm text-gray-600">
                      {recipe.likes?.length || 0} likes
                    </div>
                  </div>
                </div>

                {/* Reviews Preview */}
                {recipe.reviews?.length > 0 && (
                  <div className="card bg-base-100 shadow-md border border-orange-100">
                    <div className="card-body">
                      <h4 className="card-title text-gray-800">
                        Recent Reviews
                      </h4>
                      <div className="space-y-4 max-h-80 overflow-y-auto">
                        {recipe.reviews.slice(0, 3).map((review, index) => (
                          <div
                            key={index}
                            className="border-b border-orange-100 pb-3 last:border-0"
                          >
                            <div className="rating rating-xs mb-1">
                              {[...Array(5)].map((_, i) => (
                                <input
                                  key={i}
                                  type="radio"
                                  className="mask mask-star-2 bg-yellow-400"
                                  checked={i < review.rating}
                                  readOnly
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-700">
                              {review.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Related Recipes */}
                {/* {relatedRecipes.length > 0 && (
                  <div className="card bg-base-100 shadow-md border border-orange-100">
                    <div className="card-body">
                      <h4 className="card-title text-gray-800">
                        More {recipe.cuisine} Recipes
                      </h4>
                      <div className="space-y-4">
                        {relatedRecipes.map((r) => (
                          <RecipeCard key={r._id} recipe={r} compact />
                        ))}
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default RecipeDetail;
