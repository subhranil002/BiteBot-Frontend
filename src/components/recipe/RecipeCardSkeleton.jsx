// Finalized

export default function RecipeCardSkeleton() {
  return (
    <article className="group w-[300px] h-[450px] m-3">
      <div className="relative bg-base-100 border border-orange-100/60 rounded-3xl shadow-lg overflow-hidden flex flex-col h-full">
        {/* Image Skeleton */}
        <figure className="relative aspect-16/10">
          <div className="skeleton w-full h-full"></div>

          {/* Premium badge skeleton */}
          <div className="absolute top-3 left-3">
            <div className="skeleton h-6 w-20 rounded-lg"></div>
          </div>

          {/* Favourite button skeleton */}
          <div className="absolute top-3 right-3">
            <div className="skeleton h-10 w-10 rounded-full"></div>
          </div>
        </figure>

        {/* Content Skeleton */}
        <div className="card-body flex flex-col grow p-4 md:p-6">
          <div className="space-y-3">
            {/* Title */}
            <div className="skeleton h-5 w-3/4"></div>

            {/* Description */}
            <div className="space-y-2">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-5/6"></div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center gap-2">
                <div className="skeleton h-8 w-8 rounded-xl"></div>
                <div className="skeleton h-4 w-16"></div>
              </div>

              <div className="flex items-center gap-2">
                <div className="skeleton h-8 w-8 rounded-xl"></div>
                <div className="skeleton h-4 w-20"></div>
              </div>
            </div>

            {/* Dietary labels */}
            <div className="flex gap-2 mt-2">
              <div className="skeleton h-6 w-16 rounded-lg"></div>
              <div className="skeleton h-6 w-14 rounded-lg"></div>
              <div className="skeleton h-6 w-10 rounded-lg"></div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="mt-auto pt-4">
            <div className="skeleton h-12 w-full rounded-2xl"></div>
          </div>
        </div>
      </div>
    </article>
  );
}
