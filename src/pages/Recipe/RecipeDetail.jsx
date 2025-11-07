import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClock, FaHeart, FaStar, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import favouriteToggleApi from "../../apis/recipe/favouriteToggleApi";
import HomeLayout from "../../layouts/HomeLayout";
import { getRecipeById, resetRecipe } from "../../redux/slices/recipeSlice";

function RecipeDetail() {
  const { id } = useParams();
  const { recipe, chef, error } = useSelector((state) => state.recipe);
  const { userData } = useSelector((state) => state.auth);
  const [isFav, setIsFav] = useState(
    userData?.favourites?.find((fav) => fav.toString() === id)
  );
  const [cost, setCost] = useState({ total: 0, perServing: 0 });
  const [stats, setStats] = useState({
    averageRating: 0,
    reviewCount: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    dispatch(getRecipeById(id));
    return () => {
      dispatch(resetRecipe());
    };
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || "Something went wrong");
      if (error?.data) {
        toast.error("Please subscribe to this chef to unlock recipe");
        navigate(`/profile/${error.data}`);
      }
    }
  }, [error]);

  useEffect(() => {
    if (!recipe?.ingredients) return;

    const totalCost = recipe.ingredients.reduce((sum, ing) => {
      const price = Number(ing?.marketPrice) || 0;
      return sum + price;
    }, 0);

    const costPerServing =
      recipe?.servings && recipe.servings > 0
        ? totalCost / recipe.servings
        : totalCost;

    setCost({ total: totalCost, perServing: costPerServing });

    const reviews = recipe?.reviews || [];
    const count = reviews.length;
    const avg =
      count > 0
        ? reviews.reduce((s, r) => s + (Number(r?.rating) || 0), 0) / count
        : 0;

    setStats({ averageRating: Number(avg.toFixed(1)), reviewCount: count });
  }, [recipe]);

  const toggleFav = async () => {
    setLoading(true);
    await favouriteToggleApi(recipe._id.toString());
    setIsFav(!isFav);
    setLoading(false);
  };

  if (!recipe) return "Loading...";

  const statTabs = [
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
      value: recipe.likeCount?.length || 0,
    },
  ];

  return (
    <HomeLayout>
      <div className="min-h-screen relative bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 overflow-hidden">
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

              {/* Like Button */}
              <button
                onClick={() => toggleFav()}
                disabled={loading}
                className={`absolute top-4 right-4 btn btn-circle ${
                  isFav
                    ? "bg-rose-500 text-white border-none"
                    : "bg-white/80 text-gray-700 border-none hover:bg-white"
                }`}
              >
                <FaHeart className="w-5 h-5" />
              </button>

              <div className="absolute inset-x-0 bottom-0 px-4 sm:px-10 pb-6 sm:pb-10">
                <div className="bg-gradient-to-t from-black/85 via-black/60 to-transparent text-white p-4 sm:p-6 rounded-2xl max-w-3xl mx-auto sm:mx-0 shadow-lg backdrop-blur-sm">
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-md mb-2">
                    {recipe.title}
                  </h1>

                  {/* Scrollable description area */}
                  <div className="max-h-[50px] sm:max-h-[100px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                    <p className="text-xs sm:text-base text-gray-100 whitespace-pre-line">
                      {recipe.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Chef Info */}
                <div className="card bg-base-100 shadow-md border border-orange-100 hover:shadow-orange-200/60 transition-all hover:-translate-y-1">
                  <div className="card-body">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-14 h-14 rounded-full border-2 border-orange-200">
                            <img
                              src={chef?.profile?.avatar?.secure_url}
                              alt={chef?.profile?.name || "Chef"}
                            />
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/profile/${chef?._id.toString() ?? ""}`}
                            className="card-title link link-hover text-orange-600"
                          >
                            {chef?.profile?.name || "Chef"}
                          </Link>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <FaStar className="text-yellow-400" />
                            {stats.averageRating} • {stats.reviewCount} reviews
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {statTabs.map((item, i) => (
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

                {/* Dietary */}
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
                      Estimated cost: ₹{cost?.total?.toFixed(2) ?? "0.00"}
                      {cost?.perServing > 0 &&
                        ` (₹${cost?.perServing?.toFixed(2)} per serving)`}
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
                                ₹{(Number(ing.marketPrice) || 0).toFixed(2)}
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
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Rating */}
                <div className="card bg-base-100 shadow-md border border-orange-100">
                  <div className="card-body text-center">
                    <div className="flex justify-center gap-1 mb-2 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.round(stats.averageRating)
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      ))}
                    </div>
                    <div className="text-2xl font-bold text-gray-700">
                      {stats.averageRating}
                    </div>
                    <p className="text-sm text-gray-500">
                      Based on {stats.reviewCount} reviews
                    </p>
                  </div>
                </div>

                {/* Reviews */}
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
                            <div className="flex items-center gap-1 text-yellow-400 mb-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={
                                    i < (Number(review?.rating) || 0)
                                      ? "opacity-100"
                                      : "opacity-30"
                                  }
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-700">
                              {review.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {review.createdAt
                                ? new Date(
                                    review.createdAt
                                  ).toLocaleDateString()
                                : ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* External Media */}
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
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default RecipeDetail;
