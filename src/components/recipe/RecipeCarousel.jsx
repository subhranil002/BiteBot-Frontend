import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RecipeCard from "./RecipeCard";

const RecipeCarousel = ({ title, recipes, onRecipeClick, className = "" }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = 320; // width of one card + gap
        const newScrollLeft =
            direction === "left"
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: newScrollLeft,
            behavior: "smooth",
        });
    };

    if (!recipes || recipes.length === 0) return null;

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between px-2 md:px-4">
                <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-600 via-red-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                    {title}
                </h2>

                {/* Arrow buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="btn btn-circle bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 border border-orange-200 shadow-md hover:from-orange-200 hover:to-amber-200 hover:scale-105 transition-all duration-300"
                        aria-label="Scroll left"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="btn btn-circle bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 border border-orange-200 shadow-md hover:from-orange-200 hover:to-amber-200 hover:scale-105 transition-all duration-300"
                        aria-label="Scroll right"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
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
