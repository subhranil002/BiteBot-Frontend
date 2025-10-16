import { useState } from "react";
import {
    FaChevronDown,
    FaChevronUp,
    FaFilter,
    FaPlus,
    FaTimes,
} from "react-icons/fa";

const SearchFilters = ({
    filters,
    onFiltersChange,
    onClearFilters,
    className,
    isOpen,
    onToggle,
}) => {
    const [localFilters, setLocalFilters] = useState(filters);
    const [excludedIngredients, setExcludedIngredients] = useState("");

    const cuisineOptions = [
        "Italian",
        "Indian",
        "Thai",
        "Korean",
        "French",
        "Mediterranean",
        "Chinese",
        "Mexican",
        "Japanese",
        "American",
        "Greek",
        "Fusion",
    ];
    const dietaryOptions = [
        "vegetarian",
        "vegan",
        "gluten-free",
        "dairy-free",
        "keto",
        "paleo",
        "pescatarian",
        "low-fat",
        "high-protein",
    ];
    const tagOptions = [
        "quick",
        "healthy",
        "spicy",
        "comfort-food",
        "premium",
        "one-pot",
        "no-cook",
        "budget-friendly",
        "kid-friendly",
    ];
    const sortOptions = [
        { value: "relevance", label: "Relevance" },
        { value: "newest", label: "Newest" },
        { value: "popularity", label: "Most Popular" },
        { value: "time", label: "Prep Time" },
        { value: "calories", label: "Calories" },
        { value: "price", label: "Price" },
    ];

    const updateFilters = (newFilters) => {
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
    };
    const toggleArrayFilter = (category, value) => {
        const currentArray = localFilters[category] || [];
        const newArray = currentArray.includes(value)
            ? currentArray.filter((item) => item !== value)
            : [...currentArray, value];
        updateFilters({ ...localFilters, [category]: newArray });
    };
    const updateRangeFilter = (category, field, value) => {
        updateFilters({
            ...localFilters,
            [category]: {
                ...localFilters[category],
                [field]: value === "" ? undefined : Number(value),
            },
        });
    };
    const addExcludedIngredient = () => {
        if (!excludedIngredients.trim()) return;
        const current = localFilters.excludeIngredients || [];
        const newList = [...current, excludedIngredients.trim()];
        updateFilters({ ...localFilters, excludeIngredients: newList });
        setExcludedIngredients("");
    };
    const removeExcludedIngredient = (ingredient) => {
        const current = localFilters.excludeIngredients || [];
        const newList = current.filter((item) => item !== ingredient);
        updateFilters({ ...localFilters, excludeIngredients: newList });
    };
    const hasActiveFilters = Object.values(localFilters).some((value) => {
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === "object" && value !== null) {
            return Object.values(value).some(
                (v) => v !== undefined && v !== ""
            );
        }
        return value !== undefined && value !== "" && value !== null;
    });
    const handleClearAll = () => {
        const clearedFilters = {
            cuisines: [],
            dietary: [],
            tags: [],
            prepTime: { min: undefined, max: undefined },
            calories: { min: undefined, max: undefined },
            price: { min: undefined, max: undefined },
            isPremium: null,
            sortBy: "relevance",
            excludeIngredients: [],
        };
        setLocalFilters(clearedFilters);
        setExcludedIngredients("");
        onClearFilters();
    };
    return (
        <div className={`bg-base-100 border rounded-lg ${className}`}>
            <div className="lg:hidden border-b p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaFilter className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">Filters</span>
                        {hasActiveFilters && (
                            <span className="badge badge-outline text-xs">
                                Active
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <button
                                type="button"
                                className="btn btn-xs btn-ghost text-xs"
                                onClick={handleClearAll}
                            >
                                Clear all
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-xs btn-ghost"
                            onClick={onToggle}
                            aria-label={
                                isOpen ? "Close filters" : "Open filters"
                            }
                        >
                            {isOpen ? (
                                <FaChevronUp className="w-4 h-4" />
                            ) : (
                                <FaChevronDown className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block border-b p-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium">Search Filters</h3>
                    {hasActiveFilters && (
                        <button
                            type="button"
                            className="btn btn-xs btn-ghost text-xs"
                            onClick={handleClearAll}
                        >
                            Clear all
                        </button>
                    )}
                </div>
            </div>
            <div
                className={`p-4 space-y-6 ${
                    !isOpen ? "lg:block hidden" : "block"
                }`}
            >
                <div className="space-y-3">
                    <label className="text-sm font-medium">Sort by</label>
                    <div className="grid grid-cols-2 gap-2">
                        {sortOptions.map((option) => (
                            <span
                                key={option.value}
                                className={`badge cursor-pointer justify-center text-xs ${
                                    localFilters.sortBy === option.value
                                        ? "badge-primary"
                                        : "badge-outline"
                                }`}
                                onClick={() =>
                                    updateFilters({
                                        ...localFilters,
                                        sortBy: option.value,
                                    })
                                }
                            >
                                {option.label}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium">Cuisine</label>
                    <div className="flex flex-wrap gap-1">
                        {cuisineOptions.map((cuisine) => (
                            <span
                                key={cuisine}
                                className={`badge cursor-pointer text-xs ${
                                    (localFilters.cuisines || []).includes(
                                        cuisine
                                    )
                                        ? "badge-primary"
                                        : "badge-outline"
                                }`}
                                onClick={() =>
                                    toggleArrayFilter("cuisines", cuisine)
                                }
                            >
                                {cuisine}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Dietary preferences
                    </label>
                    <div className="flex flex-wrap gap-1">
                        {dietaryOptions.map((option) => (
                            <span
                                key={option}
                                className={`badge cursor-pointer text-xs ${
                                    (localFilters.dietary || []).includes(
                                        option
                                    )
                                        ? "badge-primary"
                                        : "badge-outline"
                                }`}
                                onClick={() =>
                                    toggleArrayFilter("dietary", option)
                                }
                            >
                                {option}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium">Recipe tags</label>
                    <div className="flex flex-wrap gap-1">
                        {tagOptions.map((tag) => (
                            <span
                                key={tag}
                                className={`badge cursor-pointer text-xs ${
                                    (localFilters.tags || []).includes(tag)
                                        ? "badge-primary"
                                        : "badge-outline"
                                }`}
                                onClick={() => toggleArrayFilter("tags", tag)}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Prep time (minutes)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label
                                htmlFor="prep-min"
                                className="text-xs text-gray-400"
                            >
                                Min
                            </label>
                            <input
                                id="prep-min"
                                type="number"
                                placeholder="0"
                                value={localFilters.prepTime?.min || ""}
                                onChange={(e) =>
                                    updateRangeFilter(
                                        "prepTime",
                                        "min",
                                        e.target.value
                                    )
                                }
                                className="input input-xs"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="prep-max"
                                className="text-xs text-gray-400"
                            >
                                Max
                            </label>
                            <input
                                id="prep-max"
                                type="number"
                                placeholder="120"
                                value={localFilters.prepTime?.max || ""}
                                onChange={(e) =>
                                    updateRangeFilter(
                                        "prepTime",
                                        "max",
                                        e.target.value
                                    )
                                }
                                className="input input-xs"
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Calories per serving
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label
                                htmlFor="cal-min"
                                className="text-xs text-gray-400"
                            >
                                Min
                            </label>
                            <input
                                id="cal-min"
                                type="number"
                                placeholder="0"
                                value={localFilters.calories?.min || ""}
                                onChange={(e) =>
                                    updateRangeFilter(
                                        "calories",
                                        "min",
                                        e.target.value
                                    )
                                }
                                className="input input-xs"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="cal-max"
                                className="text-xs text-gray-400"
                            >
                                Max
                            </label>
                            <input
                                id="cal-max"
                                type="number"
                                placeholder="1000"
                                value={localFilters.calories?.max || ""}
                                onChange={(e) =>
                                    updateRangeFilter(
                                        "calories",
                                        "max",
                                        e.target.value
                                    )
                                }
                                className="input input-xs"
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Price per serving ($)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label
                                htmlFor="price-min"
                                className="text-xs text-gray-400"
                            >
                                Min
                            </label>
                            <input
                                id="price-min"
                                type="number"
                                step="0.50"
                                placeholder="0"
                                value={localFilters.price?.min || ""}
                                onChange={(e) =>
                                    updateRangeFilter(
                                        "price",
                                        "min",
                                        e.target.value
                                    )
                                }
                                className="input input-xs"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="price-max"
                                className="text-xs text-gray-400"
                            >
                                Max
                            </label>
                            <input
                                id="price-max"
                                type="number"
                                step="0.50"
                                placeholder="50"
                                value={localFilters.price?.max || ""}
                                onChange={(e) =>
                                    updateRangeFilter(
                                        "price",
                                        "max",
                                        e.target.value
                                    )
                                }
                                className="input input-xs"
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium">Content type</label>
                    <div className="flex gap-2">
                        <span
                            className={`badge cursor-pointer text-xs ${
                                localFilters.isPremium === false
                                    ? "badge-primary"
                                    : "badge-outline"
                            }`}
                            onClick={() =>
                                updateFilters({
                                    ...localFilters,
                                    isPremium:
                                        localFilters.isPremium === false
                                            ? null
                                            : false,
                                })
                            }
                        >
                            Free only
                        </span>
                        <span
                            className={`badge cursor-pointer text-xs ${
                                localFilters.isPremium === true
                                    ? "badge-primary"
                                    : "badge-outline"
                            }`}
                            onClick={() =>
                                updateFilters({
                                    ...localFilters,
                                    isPremium:
                                        localFilters.isPremium === true
                                            ? null
                                            : true,
                                })
                            }
                        >
                            Premium only
                        </span>
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Exclude ingredients
                    </label>
                    <div className="flex gap-2">
                        <input
                            placeholder="e.g., nuts, dairy"
                            value={excludedIngredients}
                            onChange={(e) =>
                                setExcludedIngredients(e.target.value)
                            }
                            onKeyPress={(e) =>
                                e.key === "Enter" && addExcludedIngredient()
                            }
                            className="input input-xs"
                        />
                        <button
                            type="button"
                            className="btn btn-xs btn-ghost"
                            onClick={addExcludedIngredient}
                            disabled={!excludedIngredients.trim()}
                        >
                            <FaPlus className="w-4 h-4" />
                        </button>
                    </div>
                    {(localFilters.excludeIngredients || []).length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {(localFilters.excludeIngredients || []).map(
                                (ingredient, index) => (
                                    <span
                                        key={index}
                                        className="badge badge-error text-xs cursor-pointer flex items-center"
                                        onClick={() =>
                                            removeExcludedIngredient(ingredient)
                                        }
                                    >
                                        {ingredient}
                                        <FaTimes className="w-3 h-3 ml-1" />
                                    </span>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;
