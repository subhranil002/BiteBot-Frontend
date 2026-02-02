// Under construction
import { useEffect, useMemo, useState } from "react";
import {
  FaChevronDown,
  FaDollarSign,
  FaFilter,
  FaSearch,
  FaSlidersH,
  FaStar,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

import RecipeCard from "../components/recipe/RecipeCard";
import HomeLayout from "../layouts/HomeLayout";

const recipesData = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/paneer-butter-masala-1.jpg",
    rating: 4.8,
    description:
      "Creamy tomato-based curry with soft paneer cubes, a North Indian restaurant favorite.",
  },
  {
    id: 2,
    name: "Masala Dosa",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/masala-dosa.jpg",
    rating: 4.6,
    description:
      "Crispy South Indian crepe filled with spiced potato filling, served with chutney and sambar.",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani.jpg",
    rating: 4.9,
    description:
      "Aromatic basmati rice cooked with spiced chicken and saffron — a royal Hyderabadi delicacy.",
  },
  {
    id: 4,
    name: "Palak Paneer",
    image:
      "https://www.marionskitchen.com/wp-content/uploads/2021/08/Paneer-Curry8279.jpg",
    rating: 4.7,
    description:
      "Fresh spinach gravy blended with paneer cubes, flavored with mild spices and garlic.",
  },
  {
    id: 5,
    name: "Aloo Paratha",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2018/05/aloo-paratha-recipe-1.jpg",
    rating: 4.5,
    description:
      "North Indian stuffed flatbread filled with spiced mashed potatoes and cooked with ghee.",
  },
  {
    id: 6,
    name: "Butter Chicken",
    image:
      "https://www.cookwithmanali.com/wp-content/uploads/2018/07/Butter-Chicken-Recipe.jpg",
    rating: 4.9,
    description:
      "Tender chicken cooked in a buttery, creamy tomato sauce with rich Indian spices.",
  },
  {
    id: 7,
    name: "Idli Sambar",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/idli-sambar.jpg",
    rating: 4.6,
    description:
      "Soft steamed rice cakes served with flavorful lentil sambar and coconut chutney.",
  },
  {
    id: 8,
    name: "Pav Bhaji",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/pav-bhaji-recipe-2.jpg",
    rating: 4.8,
    description:
      "Mumbai street food — buttery mashed vegetable curry served with toasted pav bread.",
  },
  {
    id: 9,
    name: "Gulab Jamun",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/gulab-jamun.jpg",
    rating: 4.9,
    description:
      "Soft fried dough balls soaked in rose-flavored sugar syrup — a classic Indian dessert.",
  },
  {
    id: 10,
    name: "Tandoori Chicken",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/05/tandoori-chicken.jpg",
    rating: 4.7,
    description:
      "Smoky grilled chicken marinated in yogurt and tandoori spices — fiery and flavorful.",
  },
  {
    id: 11,
    name: "Chole Bhature",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/chole-bhature.jpg",
    rating: 4.8,
    description:
      "Spicy chickpea curry served with fluffy fried bhature — a Delhi favorite.",
  },
  {
    id: 12,
    name: "Veg Pulao",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/veg-pulao.jpg",
    rating: 4.5,
    description:
      "Fragrant rice cooked with vegetables and light Indian spices — quick and comforting.",
  },
  {
    id: 13,
    name: "Hakka Noodles",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/hakka-noodles.jpg",
    rating: 4.4,
    description:
      "Indo-Chinese stir-fried noodles with vegetables and soy sauce — street food classic.",
  },
  {
    id: 14,
    name: "Samosa",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/samosa-recipe.jpg",
    rating: 4.8,
    description:
      "Crispy golden pastry filled with spiced potatoes and peas — the ultimate Indian snack.",
  },
  {
    id: 15,
    name: "Dal Tadka",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/dal-tadka.jpg",
    rating: 4.7,
    description:
      "Yellow lentils cooked with ghee, onions, tomatoes, and tempered with cumin and garlic.",
  },
];

const DEFAULT_FILTERS = {
  minPrice: 0,
  maxPrice: 500,
  cuisine: "",
  rating: 0,
  // vegetarianOnly: false,
  dietaryPreferences: [], // Added dietary preferences array
};

function SearchResults() {
  const location = useLocation();

  // State for search parameters and temporary filters
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    filters: DEFAULT_FILTERS,
    sortBy: "relevance",
  });

  // Temporary filters that are applied only when user clicks "Apply"
  const [tempFilters, setTempFilters] = useState(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchParams((prev) => ({
      ...prev,
      searchTerm: params.get("q")?.toLowerCase() || "",
    }));
  }, [location.search]);

  // Initialize temp filters when component mounts or search changes
  useEffect(() => {
    setTempFilters(searchParams.filters);
  }, [searchParams.filters]);

  // Computed values - no need for separate state
  const activeFiltersCount = useMemo(() => {
    const { filters } = searchParams;
    let count = 0;
    if (
      filters.minPrice > DEFAULT_FILTERS.minPrice ||
      filters.maxPrice < DEFAULT_FILTERS.maxPrice
    )
      count++;
    if (filters.cuisine) count++;
    if (filters.rating > 0) count++;
    // if (filters.vegetarianOnly) count++;
    if (filters.dietaryPreferences.length > 0) count++;
    return count;
  }, [searchParams.filters]);

  // Available cuisines from recipes data
  const availableCuisines = [
    "indian",
    "italian",
    "chinese",
    "mexican",
    "thai",
    "japanese",
    "french",
    "mediterranean",
    "american",
    "korean",
    "vietnamese",
    "middle-eastern",
    "british",
    "spanish",
    "german",
    "greek",
  ];

  const dietaryPreferences = [
    "vegetarian",
    "vegan",
    "keto",
    "paleo",
    "gluten-free",
    "dairy-free",
    "low-carb",
    "high-protein",
    "sugar-free",
    "organic",
    "raw",
    "mediterranean",
    "low-fat",
  ];

  // Toggle dietary preference in temp filters
  const toggleDietaryPreference = (preference) => {
    setTempFilters((prev) => {
      const currentPreferences = prev.dietaryPreferences;
      if (currentPreferences.includes(preference)) {
        return {
          ...prev,
          dietaryPreferences: currentPreferences.filter(
            (p) => p !== preference
          ),
        };
      } else {
        return {
          ...prev,
          dietaryPreferences: [...currentPreferences, preference],
        };
      }
    });
  };

  // Apply filters when user clicks apply button
  const applyFilters = () => {
    setSearchParams((prev) => ({
      ...prev,
      filters: { ...tempFilters },
    }));
    setMobileFiltersOpen(false);
  };

  // Reset temp filters to current applied filters
  const cancelFilters = () => {
    setTempFilters(searchParams.filters);
    setMobileFiltersOpen(false);
  };

  // Derived filtered + sorted recipes
  const filteredRecipes = useMemo(() => {
    const { searchTerm, filters, sortBy } = searchParams;

    let results = recipesData.filter((recipe) => {
      const price = recipe.price || 100;
      const meetsSearch =
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.description?.toLowerCase().includes(searchTerm) ||
        recipe.tags?.some((tag) => tag.toLowerCase().includes(searchTerm));
      const meetsCuisine =
        !filters.cuisine ||
        recipe.cuisine?.toLowerCase() === filters.cuisine.toLowerCase();
      const meetsPrice = price >= filters.minPrice && price <= filters.maxPrice;
      const meetsRating = recipe.rating >= filters.rating;
      const meetsVeg =
        !filters.vegetarianOnly ||
        recipe.tags?.includes("Vegetarian") ||
        recipe.tags?.includes("Vegan");

      // Dietary preferences filter
      const meetsDietaryPreferences =
        filters.dietaryPreferences.length === 0 ||
        filters.dietaryPreferences.some((pref) =>
          recipe.tags?.some((tag) =>
            tag.toLowerCase().includes(pref.toLowerCase())
          )
        );

      return (
        meetsSearch &&
        meetsCuisine &&
        meetsPrice &&
        meetsRating &&
        meetsVeg &&
        meetsDietaryPreferences
      );
    });

    // Sorting
    if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "time") {
      results.sort(
        (a, b) =>
          a.prepMinutes + a.cookMinutes - (b.prepMinutes + b.cookMinutes)
      );
    }

    return results;
  }, [searchParams]);

  // Unified update functions
  const updateSearchParam = (key, value) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  const updateTempFilter = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setTempFilters(DEFAULT_FILTERS);
    setSearchParams((prev) => ({
      ...prev,
      filters: DEFAULT_FILTERS,
    }));
    setMobileFiltersOpen(false);
  };

  const removeFilter = (filterKey, resetValue = "") => {
    setSearchParams((prev) => ({
      ...prev,
      filters: { ...prev.filters, [filterKey]: resetValue },
    }));
  };

  const removeDietaryPreference = (preference) => {
    setSearchParams((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        dietaryPreferences: prev.filters.dietaryPreferences.filter(
          (p) => p !== preference
        ),
      },
    }));
  };

  // Filter Sidebar Component
  const FilterSidebar = ({ mobile = false }) => (
    <div
      className={`bg-base-100 ${
        mobile
          ? ""
          : "card shadow-xl border border-orange-100 h-fit sticky top-24"
      }`}
    >
      <div className={`${mobile ? "p-4 space-y-4" : "card-body p-4 sm:p-6"}`}>
        {!mobile && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title text-gray-800 text-lg">
              <FaFilter className="text-orange-500" />
              Filters
            </h3>
            {activeFiltersCount > 0 && (
              <span className="badge badge-primary badge-sm">
                {activeFiltersCount}
              </span>
            )}
          </div>
        )}

        {/* Price Filter */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 flex items-center gap-2 text-sm">
            <FaDollarSign className="w-3 h-3 text-orange-500" />
            Price Range
          </h4>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="input input-bordered input-sm w-20 border-orange-200"
              placeholder="Min"
              value={tempFilters.minPrice}
              onChange={(e) =>
                updateTempFilter("minPrice", Number(e.target.value))
              }
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              className="input input-bordered input-sm w-20 border-orange-200"
              placeholder="Max"
              value={tempFilters.maxPrice}
              onChange={(e) =>
                updateTempFilter("maxPrice", Number(e.target.value))
              }
            />
          </div>
          <input
            type="range"
            min="0"
            max="500"
            value={tempFilters.maxPrice}
            onChange={(e) =>
              updateTempFilter("maxPrice", Number(e.target.value))
            }
            className="range range-warning range-xs"
          />
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 text-sm">
            Minimum Rating
          </h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((stars) => (
              <label
                key={stars}
                className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 p-2 rounded transition-colors"
              >
                <input
                  type="radio"
                  name="rating"
                  className="radio radio-warning radio-sm"
                  checked={tempFilters.rating === stars}
                  onChange={() => updateTempFilter("rating", stars)}
                />
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`w-3 h-3 ${
                          i < stars ? "text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">& up</span>
                </div>
              </label>
            ))}
            <label className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 p-2 rounded transition-colors">
              <input
                type="radio"
                name="rating"
                className="radio radio-warning radio-sm"
                checked={tempFilters.rating === 0}
                onChange={() => updateTempFilter("rating", 0)}
              />
              <span className="text-xs text-gray-600">Any Rating</span>
            </label>
          </div>
        </div>

        {/* Cuisine Filter */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 text-sm">Cuisine Type</h4>
          <div className="dropdown dropdown-bottom w-full">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline btn-sm w-full justify-between border-orange-200 text-gray-700 hover:bg-orange-50 hover:border-orange-300"
            >
              <span className="truncate">
                {tempFilters.cuisine
                  ? tempFilters.cuisine
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")
                  : "All Cuisines"}
              </span>
              <FaChevronDown className="w-3 h-3 text-orange-500" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-full max-h-60 overflow-y-auto z-50 border border-orange-200"
            >
              <li>
                <button
                  onClick={() => updateTempFilter("cuisine", "")}
                  className={`${
                    !tempFilters.cuisine ? "bg-orange-50 text-orange-600" : ""
                  }`}
                >
                  All Cuisines
                </button>
              </li>
              {availableCuisines.map((cuisine) => (
                <li key={cuisine}>
                  <button
                    onClick={() => updateTempFilter("cuisine", cuisine)}
                    className={`${
                      tempFilters.cuisine === cuisine
                        ? "bg-orange-50 text-orange-600"
                        : ""
                    }`}
                  >
                    {cuisine
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dietary Preferences - Now Selectable */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 text-sm">
            Dietary Preferences
          </h4>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
            {dietaryPreferences.map((pref) => (
              <label
                key={pref}
                className={`flex items-center gap-2 text-sm cursor-pointer transition-all ${
                  tempFilters.dietaryPreferences.includes(pref)
                    ? "bg-orange-100 text-orange-700 border-orange-300"
                    : "text-gray-700 border-gray-300"
                } border rounded-lg px-3 py-2 hover:bg-orange-50 hover:border-orange-300`}
              >
                <input
                  type="checkbox"
                  value={pref}
                  checked={tempFilters.dietaryPreferences.includes(pref)}
                  onChange={() => toggleDietaryPreference(pref)}
                  className="checkbox checkbox-warning checkbox-xs"
                />
                <span className="capitalize whitespace-nowrap">{pref}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex gap-2 pt-4 ${
            mobile ? "" : "border-t border-orange-100"
          }`}
        >
          <button
            onClick={clearAllFilters}
            className="btn btn-outline btn-sm border-orange-300 text-orange-600 flex-1"
          >
            Clear All
          </button>
          {mobile ? (
            <>
              <button
                onClick={cancelFilters}
                className="btn btn-outline btn-sm border-gray-300 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={applyFilters}
                className="btn btn-primary btn-sm bg-linear-to-r from-orange-500 to-red-500 border-0 text-white"
              >
                Apply
              </button>
            </>
          ) : (
            <button
              onClick={applyFilters}
              className="btn btn-primary btn-sm bg-linear-to-r from-orange-500 to-red-500 border-0 text-white flex-1"
            >
              Apply Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Active Filters Component
  const ActiveFilters = () => {
    if (activeFiltersCount === 0) return null;

    const { filters } = searchParams;

    return (
      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <div className="card-body py-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm font-medium text-orange-800 whitespace-nowrap">
              Active filters:
            </span>
            <div className="flex flex-wrap gap-2 flex-1">
              {filters.minPrice > DEFAULT_FILTERS.minPrice && (
                <div className="badge badge-outline badge-sm border-orange-300 text-orange-600 gap-1">
                  Min ${filters.minPrice}
                  <button
                    onClick={() =>
                      removeFilter("minPrice", DEFAULT_FILTERS.minPrice)
                    }
                  >
                    ×
                  </button>
                </div>
              )}
              {filters.maxPrice < DEFAULT_FILTERS.maxPrice && (
                <div className="badge badge-outline badge-sm border-orange-300 text-orange-600 gap-1">
                  Max ${filters.maxPrice}
                  <button
                    onClick={() =>
                      removeFilter("maxPrice", DEFAULT_FILTERS.maxPrice)
                    }
                  >
                    ×
                  </button>
                </div>
              )}
              {filters.cuisine && (
                <div className="badge badge-outline badge-sm border-orange-300 text-orange-600 gap-1">
                  {filters.cuisine}
                  <button onClick={() => removeFilter("cuisine", "")}>×</button>
                </div>
              )}
              {filters.rating > 0 && (
                <div className="badge badge-outline badge-sm border-orange-300 text-orange-600 gap-1">
                  {filters.rating}+ Stars
                  <button onClick={() => removeFilter("rating", 0)}>×</button>
                </div>
              )}
              {filters.dietaryPreferences.map((pref) => (
                <div
                  key={pref}
                  className="badge badge-outline badge-sm border-orange-300 text-orange-600 gap-1"
                >
                  {pref}
                  <button onClick={() => removeDietaryPreference(pref)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={clearAllFilters}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium whitespace-nowrap"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Empty State Component
  const EmptyState = () => (
    <div className="card bg-base-100 shadow-xl border border-orange-100">
      <div className="card-body text-center py-12 sm:py-16">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 text-orange-300">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No recipes found
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          No recipes match your search for{" "}
          <span className="font-semibold">"{searchParams.searchTerm}"</span>.
          Try adjusting your filters or search term.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={clearAllFilters}
            className="btn btn-outline border-orange-300 text-orange-600 btn-sm sm:btn-md"
          >
            Clear All Filters
          </button>
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary bg-linear-to-r from-orange-500 to-red-500 border-0 text-white btn-sm sm:btn-md"
          >
            Back to Search
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <HomeLayout>
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-red-50 py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Mobile Filter Collapse */}
          <div className="md:hidden mb-4">
            <div className="collapse collapse-arrow bg-base-100 border border-orange-200 rounded-2xl shadow-lg">
              <input
                type="checkbox"
                checked={mobileFiltersOpen}
                onChange={(e) => setMobileFiltersOpen(e.target.checked)}
              />
              <div className="collapse-title text-lg font-bold text-gray-800 flex items-center justify-between pr-8">
                <div className="flex items-center gap-3">
                  <FaSlidersH className="text-orange-500" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="badge badge-primary badge-sm">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
              </div>
              <div className="collapse-content">
                <FilterSidebar mobile={true} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 sm:gap-6 md:gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <FilterSidebar />
            </div>

            {/* Main Results Area */}
            <main className="min-h-screen">
              {/* Header + Sort */}
              <div className="card bg-base-100 shadow-sm border border-orange-100 mb-4 sm:mb-6">
                <div className="card-body p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 truncate">
                        <FaSearch className="inline w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2" />
                        Results for{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-red-500">
                          "{searchParams.searchTerm}"
                        </span>
                      </h1>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Found{" "}
                        <span className="font-semibold text-orange-600">
                          {filteredRecipes.length}
                        </span>{" "}
                        recipes
                        {activeFiltersCount > 0 && (
                          <span className="text-xs sm:text-sm text-gray-500 ml-2">
                            ({activeFiltersCount} filter
                            {activeFiltersCount !== 1 ? "s" : ""} applied)
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
                      <span className="text-gray-600 font-medium text-sm sm:text-base hidden sm:block whitespace-nowrap">
                        Sort by:
                      </span>
                      <select
                        className="select select-bordered select-sm sm:select-md border-orange-200 text-gray-700 w-full lg:w-auto flex-1"
                        value={searchParams.sortBy}
                        onChange={(e) =>
                          updateSearchParam("sortBy", e.target.value)
                        }
                      >
                        <option value="relevance">Relevance</option>
                        <option value="rating">Highest Rated</option>
                        <option value="time">Quickest to Cook</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              <ActiveFilters />

              {/* Results Grid */}
              {filteredRecipes.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRecipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={{
                          id: recipe.id,
                          title: recipe.name,
                          description: recipe.description,
                          thumbnail: {
                            secure_url: recipe.image,
                          },
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

                  {/* Results Count Footer */}
                  <div className="mt-6 sm:mt-8 text-center">
                    <p className="text-gray-600 text-sm sm:text-base">
                      Showing {filteredRecipes.length} recipe
                      {filteredRecipes.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default SearchResults;
