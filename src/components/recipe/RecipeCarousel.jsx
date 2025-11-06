import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import RecipeCard from "./RecipeCard";

const RecipeCarousel = ({ title, recipes }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 350; // width of one card + gap
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between px-2 md:px-4">
        {title}

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
        className="flex overflow-x-auto scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {recipes.map((recipe) => (
          <div key={recipe.id} className="w-[350px]">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCarousel;
