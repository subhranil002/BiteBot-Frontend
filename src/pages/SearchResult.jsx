import { useEffect, useMemo, useState } from "react";
import { FaStar, FaFilter, FaSearch, FaTimes, FaSlidersH, FaDollarSign } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import RecipeCard from "../components/recipe/RecipeCard";
import recipesData from "../data/recipes.json";
import HomeLayout from "../layouts/HomeLayout";

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Extract query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("q")?.toLowerCase() || "");
  }, [location.search]);

  // Calculate active filters count
  useEffect(() => {
    let count = 0;
    if (filters.minPrice > DEFAULT_FILTERS.minPrice || filters.maxPrice < DEFAULT_FILTERS.maxPrice) count++;
    if (filters.cuisine) count++;
    if (filters.rating > 0) count++;
    if (filters.vegetarianOnly) count++;
    setActiveFiltersCount(count);
  }, [filters]);

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

  const clearAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setMobileFiltersOpen(false);
  };

  // Available cuisines from recipes data
  const availableCuisines = useMemo(() => {
    const cuisines = [...new Set(recipesData.map(recipe => recipe.cuisine).filter(Boolean))];
    return cuisines.sort();
  }, []);

  const FilterSidebar = () => (
    <div className="card bg-base-100 shadow-xl border border-orange-100 h-fit sticky top-24">
      <div className="card-body p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="card-title text-gray-800">
            <FaFilter className="text-orange-500" />
            Filters
          </h3>
          {activeFiltersCount > 0 && (
            <span className="badge badge-primary">{activeFiltersCount}</span>
          )}
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FaDollarSign className="w-3 h-3 text-orange-500" />
            Price Range
          </h4>
          <div className="flex items-center gap-3 mb-3">
            <input
              type="number"
              className="input input-bordered input-sm w-20 border-orange-200"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", Number(e.target.value))}
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              className="input input-bordered input-sm w-20 border-orange-200"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
            />
          </div>
          <input
            type="range"
            min="0"
            max="500"
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
            className="range range-warning range-xs"
          />
        </div>

        {/* Cuisine Filter */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Cuisine Type</h4>
          <select
            className="select select-bordered w-full border-orange-200"
            value={filters.cuisine}
            onChange={(e) => updateFilter("cuisine", e.target.value)}
          >
            <option value="">All Cuisines</option>
            {availableCuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Minimum Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((stars) => (
              <label key={stars} className="flex items-center gap-3 cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors">
                <input
                  type="radio"
                  name="rating"
                  className="radio radio-warning"
                  checked={filters.rating === stars}
                  onChange={() => updateFilter("rating", stars)}
                />
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${i < stars ? "text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">& up</span>
                </div>
              </label>
            ))}
            <label className="flex items-center gap-3 cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors">
              <input
                type="radio"
                name="rating"
                className="radio radio-warning"
                checked={filters.rating === 0}
                onChange={() => updateFilter("rating", 0)}
              />
              <span className="text-sm text-gray-600">Any Rating</span>
            </label>
          </div>
        </div>

        {/* Vegetarian Filter */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors">
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              checked={filters.vegetarianOnly}
              onChange={(e) => updateFilter("vegetarianOnly", e.target.checked)}
            />
            <span className="text-gray-700 font-medium">Vegetarian Only</span>
          </label>
        </div>

        <div className="flex gap-2">
          <button
            onClick={clearAllFilters}
            className="btn btn-outline border-orange-300 text-orange-600 flex-1"
          >
            Clear All
          </button>
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="btn btn-primary bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white md:hidden"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 py-4 md:py-8 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Mobile Filter Trigger */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="btn btn-primary w-full bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white gap-2"
            >
              <FaSlidersH className="w-4 h-4" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <FilterSidebar />
            </div>

            {/* Mobile Drawer */}
            <div className={`drawer drawer-end md:hidden ${mobileFiltersOpen ? 'drawer-open' : ''}`}>
              <input 
                id="filter-drawer" 
                type="checkbox" 
                className="drawer-toggle" 
                checked={mobileFiltersOpen}
                onChange={() => {}} 
              />
              <div className="drawer-content">
                {/* This is the main content that stays visible */}
              </div>
              <div className="drawer-side z-50">
                <label 
                  htmlFor="filter-drawer" 
                  className="drawer-overlay"
                  onClick={() => setMobileFiltersOpen(false)}
                ></label>
                <div className="bg-base-100 w-80 min-h-full p-4 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                    <button 
                      onClick={() => setMobileFiltersOpen(false)}
                      className="btn btn-ghost btn-circle"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterSidebar />
                </div>
              </div>
            </div>

            {/* Main Results Area */}
            <main className="min-h-screen">
              {/* Header + Sort */}
              <div className="card bg-base-100 shadow-sm border border-orange-100 mb-6">
                <div className="card-body p-4 md:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        <FaSearch className="inline w-5 h-5 text-orange-500 mr-2" />
                        Results for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                          "{searchTerm}"
                        </span>
                      </h1>
                      <p className="text-gray-600">
                        Found <span className="font-semibold text-orange-600">{filteredRecipes.length}</span> recipes
                        {activeFiltersCount > 0 && (
                          <span className="text-sm text-gray-500 ml-2">
                            ({activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied)
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 font-medium hidden sm:block">Sort by:</span>
                      <select
                        className="select select-bordered border-orange-200 text-gray-700 w-full lg:w-auto"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="relevance">Relevance</option>
                        <option value="rating">Highest Rated</option>
                        <option value="time">Quickest to Cook</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filters Bar */}
              {activeFiltersCount > 0 && (
                <div className="card bg-orange-50 border border-orange-200 mb-6">
                  <div className="card-body py-3">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-sm font-medium text-orange-800">Active filters:</span>
                      {filters.minPrice > DEFAULT_FILTERS.minPrice && (
                        <div className="badge badge-outline border-orange-300 text-orange-600 gap-1">
                          Min ${filters.minPrice}
                          <button onClick={() => updateFilter("minPrice", DEFAULT_FILTERS.minPrice)}>×</button>
                        </div>
                      )}
                      {filters.maxPrice < DEFAULT_FILTERS.maxPrice && (
                        <div className="badge badge-outline border-orange-300 text-orange-600 gap-1">
                          Max ${filters.maxPrice}
                          <button onClick={() => updateFilter("maxPrice", DEFAULT_FILTERS.maxPrice)}>×</button>
                        </div>
                      )}
                      {filters.cuisine && (
                        <div className="badge badge-outline border-orange-300 text-orange-600 gap-1">
                          {filters.cuisine}
                          <button onClick={() => updateFilter("cuisine", "")}>×</button>
                        </div>
                      )}
                      {filters.rating > 0 && (
                        <div className="badge badge-outline border-orange-300 text-orange-600 gap-1">
                          {filters.rating}+ Stars
                          <button onClick={() => updateFilter("rating", 0)}>×</button>
                        </div>
                      )}
                      {filters.vegetarianOnly && (
                        <div className="badge badge-outline border-orange-300 text-orange-600 gap-1">
                          Vegetarian
                          <button onClick={() => updateFilter("vegetarianOnly", false)}>×</button>
                        </div>
                      )}
                      <button 
                        onClick={clearAllFilters}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium ml-auto"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Results Grid */}
              {filteredRecipes.length === 0 ? (
                <div className="card bg-base-100 shadow-xl border border-orange-100">
                  <div className="card-body text-center py-16">
                    <div className="w-32 h-32 mx-auto mb-6 text-orange-300">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No recipes found</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      No recipes match your search for <span className="font-semibold">"{searchTerm}"</span>. 
                      Try adjusting your filters or search term.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={clearAllFilters}
                        className="btn btn-outline border-orange-300 text-orange-600"
                      >
                        Clear All Filters
                      </button>
                      <button
                        onClick={() => window.history.back()}
                        className="btn btn-primary bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white"
                      >
                        Back to Search
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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

              {/* Results Count Footer */}
              {filteredRecipes.length > 0 && (
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default SearchResults;