import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import RecipeCard from "../components/recipe/RecipeCard";
import recipesData from "../data/recipes.json";
import { FaStar } from "react-icons/fa";

const DEFAULT_FILTERS = {
  minPrice: 0,
  maxPrice: 500,
  cuisine: "",
  rating: 0,
  vegetarianOnly: false,
};

function SearchResults() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("relevance");

  // Extract query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("q")?.toLowerCase() || "");
  }, [location.search]);

  // Derived filtered + sorted recipes
  const filteredRecipes = useMemo(() => {
    let results = recipesData.filter((recipe) => {
      const price = recipe.price || 100;
      const meetsSearch =
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.description?.toLowerCase().includes(searchTerm) ||
        recipe.tags?.some((tag) => tag.toLowerCase().includes(searchTerm));
      const meetsCuisine =
        !filters.cuisine ||
        recipe.cuisine?.toLowerCase() === filters.cuisine.toLowerCase();
      const meetsPrice =
        price >= filters.minPrice && price <= filters.maxPrice;
      const meetsRating = recipe.rating >= filters.rating;
      const meetsVeg =
        !filters.vegetarianOnly ||
        recipe.tags?.includes("Vegetarian") ||
        recipe.tags?.includes("Vegan");

      return meetsSearch && meetsCuisine && meetsPrice && meetsRating && meetsVeg;
    });

    // Sorting
    if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "time") {
      results.sort(
        (a, b) =>
          (a.prepMinutes + a.cookMinutes) -
          (b.prepMinutes + b.cookMinutes)
      );
    }

    return results;
  }, [searchTerm, filters, sortBy]);

  // Helper to update filters
  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 py-8 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          
          {/* Sidebar Filters */}
          <aside className="bg-white rounded-2xl border border-orange-200 shadow-md p-5 h-fit sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Filters</h3>

            {/* Price Filter */}
            <div className="mb-5">
              <h4 className="font-semibold text-gray-700 mb-2">Price Range ($)</h4>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  className="input input-sm border-orange-200 w-20"
                  value={filters.minPrice}
                  onChange={(e) => updateFilter("minPrice", Number(e.target.value))}
                />
                <span>–</span>
                <input
                  type="number"
                  className="input input-sm border-orange-200 w-20"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
                />
              </div>
            </div>

            {/* Cuisine Filter */}
            <div className="mb-5">
              <h4 className="font-semibold text-gray-700 mb-2">Cuisine</h4>
              <select
                className="select select-bordered w-full border-orange-200"
                value={filters.cuisine}
                onChange={(e) => updateFilter("cuisine", e.target.value)}
              >
                <option value="">All</option>
                {["Indian", "Italian", "Chinese", "Mexican"].map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="mb-5">
              <h4 className="font-semibold text-gray-700 mb-2">Customer Rating</h4>
              {[4, 3, 2].map((stars) => (
                <label key={stars} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    className="radio radio-warning"
                    checked={filters.rating === stars}
                    onChange={() => updateFilter("rating", stars)}
                  />
                  <div className="flex text-amber-400">
                    {Array.from({ length: stars }, (_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">& Up</span>
                </label>
              ))}
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  name="rating"
                  className="radio radio-warning"
                  checked={filters.rating === 0}
                  onChange={() => updateFilter("rating", 0)}
                />
                <span className="text-sm text-gray-600">All</span>
              </label>
            </div>

            {/* Vegetarian Filter */}
            <div className="mb-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  checked={filters.vegetarianOnly}
                  onChange={(e) => updateFilter("vegetarianOnly", e.target.checked)}
                />
                <span className="text-sm text-gray-700">Vegetarian only</span>
              </label>
            </div>

            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="btn btn-sm w-full bg-gradient-to-r from-orange-400 to-red-400 text-white border-0 hover:from-orange-500 hover:to-red-500"
            >
              Clear Filters
            </button>
          </aside>

          {/* Main Results Area */}
          <main>
            {/* Header + Sort */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Results for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                  “{searchTerm}”
                </span>{" "}
                ({filteredRecipes.length})
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Sort by:</span>
                <select
                  className="select select-bordered border-orange-200 text-gray-700"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Highest Rated</option>
                  <option value="time">Quickest to Cook</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-20">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                  alt="No results"
                  className="w-32 h-32 mx-auto mb-4 opacity-70"
                />
                <p className="text-gray-600 text-lg">
                  No recipes found for <b>{searchTerm}</b>. Try different filters!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                  key={recipe.id}
                  recipe={{
                    id: recipe.id,
                    title: recipe.name,
                    description: recipe.description,
                    heroImage: recipe.image,
                    servings: recipe.servings || 2,
                    cuisine: recipe.cuisine || "Indian",
                    prepMinutes: recipe.prepMinutes || 10,
                    cookMinutes: recipe.cookMinutes || 20,
                    tags: recipe.tags || ["Spicy", "Vegetarian"],
                    rating: recipe.rating,
                    isTrending: recipe.isTrending || false,
                    isPremium: recipe.isPremium || false,
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  </HomeLayout>
);
}

export default SearchResults;