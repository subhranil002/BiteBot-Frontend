import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaDollarSign,
  FaFilter,
  FaSearch,
  FaSlidersH,
  FaStar,
  FaTimes,
} from "react-icons/fa";

import searchRecipeApi from "../apis/recipe/searchRecipeApi";
import RecipeCard from "../components/recipe/RecipeCard";
import RecipeCardSkeleton from "../components/recipe/RecipeCardSkeleton";
import { CUISINE_OPTIONS, DIETARY_OPTIONS, SORT_OPTIONS } from "../constants";
import HomeLayout from "../layouts/HomeLayout";

const defaultFormValues = {
  query: "",
  cuisine: "",
  dietaryPreferences: [],
  rating: 0,
  priceMin: "",
  priceMax: "",
  premium: false,
  sortBy: "relevance",
  page: 1,
  limit: 12,
};

const RecipeGrid = ({ children }) => (
  <div className="flex justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:gap-10">
      {children}
    </div>
  </div>
);

const EmptyState = ({ onClear }) => (
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

      <h3 className="text-xl font-bold text-gray-800 mb-2">No recipes found</h3>

      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        No recipes match your search <br /> Try adjusting your filters or search
        term.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={onClear}
          className="btn btn-outline border-orange-300 text-orange-600 btn-sm sm:btn-md"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  </div>
);

const FilterSidebar = ({
  mobile = false,
  register,
  errors,
  watchedValues,
  updateField,
  toggleDietaryPreference,
  clearAllFilters,
  isSearching,
  setMobileFiltersOpen,
  getValues,
  handleSubmit,
  onSubmit,
}) => (
  <div
    className={`bg-base-100 ${
      mobile
        ? "rounded-t-3xl"
        : "card shadow-xl border border-orange-100 h-fit sticky top-22"
    }`}
  >
    <div className={`${mobile ? "p-4 space-y-4" : "card-body p-4 sm:p-6"}`}>
      <div className="flex items-center justify-between">
        <h3 className="card-title text-gray-800 text-lg">
          <FaFilter className="text-orange-500" />
          Filters
        </h3>

        {mobile && (
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close filters"
          >
            <FaTimes />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700 flex items-center gap-2 text-sm">
          <FaDollarSign className="w-3 h-3 text-orange-500" />
          Price Range
        </h4>

        <div className="flex items-center gap-2">
          <input
            type="number"
            className="input input-bordered input-sm w-24 border-orange-200"
            placeholder="Min"
            {...register("priceMin", {
              valueAsNumber: true,
              min: { value: 0, message: "Min price cannot be negative" },
            })}
          />

          <span className="text-gray-400">-</span>

          <input
            type="number"
            className="input input-bordered input-sm w-24 border-orange-200"
            placeholder="Max"
            {...register("priceMax", {
              valueAsNumber: true,
              validate: (value) => {
                const min = getValues("priceMin");
                if (!value || !min) return true;
                return (
                  Number(value) >= Number(min) ||
                  "Max price cannot be less than min price"
                );
              },
            })}
          />
        </div>

        {errors.priceMax && (
          <p className="text-red-500 text-xs">{errors.priceMax.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700 text-sm">Minimum Rating</h4>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 p-2 rounded transition-colors">
            <input
              type="radio"
              name="rating"
              className="radio radio-warning radio-sm"
              checked={Number(watchedValues.rating) === 0}
              onChange={() => updateField("rating", 0)}
            />
            <span className="text-xs text-gray-600">Any Rating</span>
          </label>

          {[4, 3, 2, 1].map((stars) => (
            <label
              key={stars}
              className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 p-2 rounded transition-colors"
            >
              <input
                type="radio"
                name="rating"
                className="radio radio-warning radio-sm"
                checked={Number(watchedValues.rating) === stars}
                onChange={() => updateField("rating", stars)}
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
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700 text-sm">Premium</h4>

        <label className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 p-2 rounded transition-colors">
          <input
            type="checkbox"
            className="toggle toggle-warning"
            checked={!!watchedValues.premium}
            onChange={(e) => updateField("premium", e.target.checked)}
          />
          <span className="text-sm text-gray-600">Premium only</span>
        </label>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700 text-sm">Cuisine Type</h4>

        <select
          className="select select-bordered w-full border-orange-200 uppercase"
          value={watchedValues.cuisine}
          onChange={(e) => updateField("cuisine", e.target.value)}
        >
          <option value="">Select cuisine</option>
          {CUISINE_OPTIONS.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700 text-sm">
          Dietary Preferences
        </h4>

        <div className="flex flex-wrap gap-3">
          {DIETARY_OPTIONS.map((pref) => {
            const selected = watchedValues.dietaryPreferences?.includes(pref);

            return (
              <label
                key={pref}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleDietaryPreference(pref)}
                  className="checkbox accent-orange-500"
                />
                <span className="uppercase">{pref}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div
        className={`flex gap-2 pt-4 ${
          mobile
            ? "sticky bottom-0 bg-base-100 pb-1"
            : "border-t border-orange-100"
        }`}
      >
        <button
          type="button"
          onClick={clearAllFilters}
          className="btn btn-outline btn-sm border-orange-300 text-orange-600 flex-1"
        >
          Clear All Filters
        </button>

        {mobile ? (
          <button
            type="button"
            onClick={() => {
              setMobileFiltersOpen(false);
              window.scrollTo(0, 0);
            }}
            className="btn btn-outline btn-sm border-gray-300 text-gray-600"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={handleSubmit(onSubmit)}
            type="button"
            disabled={isSearching}
            className="btn btn-primary btn-sm bg-linear-to-r from-orange-500 to-red-500 border-0 text-white flex-1"
          >
            {isSearching ? "Applying..." : "Apply"}
          </button>
        )}
      </div>

      {mobile && (
        <button
          onClick={handleSubmit(onSubmit)}
          type="button"
          disabled={isSearching}
          className="btn btn-primary btn-sm bg-linear-to-r from-orange-500 to-red-500 border-0 text-white w-full mt-2"
        >
          {isSearching ? "Applying..." : "Apply"}
        </button>
      )}
    </div>
  </div>
);

function Search() {
  const [recipes, setRecipes] = useState([]);
  const [meta, setMeta] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultFormValues,
  });

  const watchedValues = watch();

  const updateField = (field, value) => {
    setValue(field, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    setFocus("query");
  }, [setFocus]);

  const buildSearchParams = (data = {}) => {
    const rating = +data.rating;
    const priceMin = +data.priceMin;
    const priceMax = +data.priceMax;

    return {
      query: data.query?.trim() || undefined,
      cuisine: data.cuisine || undefined,
      diet: data.dietaryPreferences?.length
        ? data.dietaryPreferences.join(",")
        : undefined,
      rating: rating > 0 ? rating : undefined,
      priceMin: priceMin > 0 ? priceMin : undefined,
      priceMax: priceMax > 0 ? priceMax : undefined,
      premium: data.premium || undefined,
      sortBy: data.sortBy,
      page: +data.page || 1,
      limit: +data.limit || 12,
    };
  };

  const searchRecipes = async (formData) => {
    try {
      setIsSearching(true);

      const params = buildSearchParams(formData);
      const res = await searchRecipeApi(params);

      setRecipes(res?.data?.recipes ?? []);
      setMeta(res?.data?.meta ?? {});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Recipe search failed:", err);
      setRecipes([]);
      setMeta({});
    } finally {
      setIsSearching(false);
      setMobileFiltersOpen(false);
    }
  };

  const applySearch = (updates = {}) => {
    const newValues = { ...getValues(), ...updates };
    reset(newValues);
    searchRecipes(newValues);
  };

  const onSubmit = (data) => {
    const updated = { ...data, page: 1 };
    searchRecipes(updated);
  };

  const handleSortChange = (value) => {
    applySearch({ sortBy: value, page: 1 });
  };

  const toggleDietaryPreference = (pref) => {
    const current = getValues("dietaryPreferences") || [];

    updateField(
      "dietaryPreferences",
      current.includes(pref)
        ? current.filter((p) => p !== pref)
        : [...current, pref],
    );
  };

  const clearAllFilters = () => {
    reset(defaultFormValues);
    searchRecipes(defaultFormValues);
  };

  const changePage = (newPage) => {
    updateField("page", newPage);
    searchRecipes({ ...getValues(), page: newPage });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const values = getValues();

      searchRecipes({
        ...values,
        page: 1,
      });
    }, 800);

    return () => clearTimeout(delay);
  }, [watchedValues.query]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;

    if (watchedValues.query?.trim()) count++;
    if (
      Number(watchedValues.priceMin) > 0 ||
      Number(watchedValues.priceMax) > 0
    )
      count++;
    if (Number(watchedValues.rating) > 0) count++;
    if (watchedValues.premium) count++;
    if (watchedValues.cuisine) count++;
    if (watchedValues.dietaryPreferences?.length) count++;

    return count;
  }, [watchedValues]);

  return (
    <HomeLayout>
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-red-50 py-4 sm:py-6 md:py-8">
        <div className="container mx-auto max-w-7xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:hidden mb-4 px-3 sm:px-4 md:px-8">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="btn btn-outline border-orange-300 text-orange-600 w-full justify-between rounded-2xl"
              >
                <span className="flex items-center gap-3">
                  <FaSlidersH className="text-orange-500" />
                  Filters
                </span>

                {activeFiltersCount > 0 && (
                  <span className="badge badge-warning badge-sm">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 sm:gap-6 lg:gap-8 lg:px-8">
              <div className="hidden lg:block">
                <FilterSidebar
                  register={register}
                  errors={errors}
                  watchedValues={watchedValues}
                  updateField={updateField}
                  toggleDietaryPreference={toggleDietaryPreference}
                  clearAllFilters={clearAllFilters}
                  isSearching={isSearching}
                  setMobileFiltersOpen={setMobileFiltersOpen}
                  getValues={getValues}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                />
              </div>

              <main className="min-h-screen">
                <div className="px-3 sm:px-4 md:px-8">
                  <div className="card-body p-4 sm:p-6 border-t border-orange-100">
                    <div className="form-control">
                      <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-50" />
                        <input
                          type="text"
                          placeholder="Search delicious recipes..."
                          className="input input-bordered w-full pl-10 pr-4 border-orange-200 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-200 rounded-2xl"
                          {...register("query")}
                        />
                      </div>
                    </div>

                    <div className="card-body p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-600 text-sm sm:text-base">
                            Found{" "}
                            <span className="font-semibold text-orange-600">
                              {meta.total || 0}
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

                        <div className="flex items-center gap-2 sm:gap-3 w-auto">
                          <span className="text-gray-600 font-medium text-sm sm:text-base hidden sm:block whitespace-nowrap">
                            Sort by:
                          </span>

                          <select
                            className="select select-bordered select-sm sm:select-md border-orange-200 text-gray-700 w-full lg:w-auto flex-1 uppercase"
                            value={watchedValues.sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                          >
                            {SORT_OPTIONS.map((sortBy) => (
                              <option key={sortBy} value={sortBy}>
                                {sortBy}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {isSearching ? (
                  <RecipeGrid>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <RecipeCardSkeleton key={i} />
                    ))}
                  </RecipeGrid>
                ) : recipes.length === 0 ? (
                  <EmptyState onClear={clearAllFilters} />
                ) : (
                  <RecipeGrid>
                    {recipes.map((recipe) => (
                      <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                  </RecipeGrid>
                )}
              </main>
            </div>
          </form>
        </div>

        {mobileFiltersOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <div
              className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <FilterSidebar
                mobile
                register={register}
                errors={errors}
                watchedValues={watchedValues}
                updateField={updateField}
                toggleDietaryPreference={toggleDietaryPreference}
                clearAllFilters={clearAllFilters}
                isSearching={isSearching}
                setMobileFiltersOpen={setMobileFiltersOpen}
                getValues={getValues}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        )}

        {Number(meta?.totalPages || 1) > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              className="btn btn-sm btn-outline border-orange-300 text-orange-600"
              disabled={Number(meta?.page || 1) <= 1 || isSearching}
              onClick={() => changePage(Number(meta?.page || 1) - 1)}
            >
              Previous
            </button>

            <span className="text-sm text-gray-600">
              Page {Number(meta?.page || 1)} of {Number(meta?.totalPages || 1)}
            </span>

            <button
              type="button"
              className="btn btn-sm btn-outline border-orange-300 text-orange-600"
              disabled={
                isSearching ||
                Number(meta?.page || 1) >= Number(meta?.totalPages || 1)
              }
              onClick={() => changePage(Number(meta?.page || 1) + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default Search;
