// Finalized

import RecipeCardSkeleton from "./RecipeCardSkeleton";

export default function RecipeCarouselSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between px-2 md:px-4">
        <div className="skeleton h-6 w-48"></div>

        {/* Arrow button skeletons */}
        <div className="hidden sm:flex gap-2">
          <div className="skeleton h-10 w-10 rounded-full"></div>
          <div className="skeleton h-10 w-10 rounded-full"></div>
        </div>
      </div>

      {/* Non-scrollable skeleton row */}
      <div className="flex gap-5 overflow-hidden px-2 md:px-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-[300px] shrink-0">
            <RecipeCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
