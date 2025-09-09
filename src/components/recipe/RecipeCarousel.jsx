import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import RecipeCard from "./RecipeCard";

const RecipeCarousel = ({ title, recipes, onRecipeClick, className = "" }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = 320; // Approximate width of one card plus gap
        const newScrollLeft =
            direction === "left"
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: newScrollLeft,
            behavior: "smooth",
        });
    };

    if (!recipes || recipes.length === 0) {
        return null;
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">{title}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="btn btn-circle btn-sm btn-outline"
                        aria-label="Scroll left"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="btn btn-circle btn-sm btn-outline"
                        aria-label="Scroll right"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="flex-none w-80">
                        <RecipeCard
                            recipe={recipe}
                            onClick={() => onRecipeClick?.(recipe)}
                            className="h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeCarousel;
