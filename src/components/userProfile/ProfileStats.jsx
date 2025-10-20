import {
  FaHeart,
  FaStar,
  FaUsers,
  FaLock,
  FaAllergies,
  FaGlobe,
  FaSeedling,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";
import {createPortal} from "react-dom";

function ProfileStats({ stats, isOwnProfile = false }) {
  const [activeItem, setActiveItem] = useState(null);

  const mockStats = {
    favoritesCount: 24,
    subscriptionsCount: 156,
    reviewsCount: 42,
    dietaryLabels: ["vegetarian", "gluten-free", "organic"],
    allergens: ["peanuts", "shellfish"],
    cuisines: ["indian", "italian", "mediterranean", "mexican"],
    recipesCreated: 8,
  };

  const source = stats || mockStats;

  const statItems = [
    {
      id: "favorites",
      icon: FaHeart,
      label: "Favorites",
      value: isOwnProfile ? source.favoritesCount ?? 24 : "Private",
      colorClass: "text-rose-500",
      bgClass: "from-rose-100 to-pink-50",
      isPrivate: true,
      details: isOwnProfile
        ? [`${source.favoritesCount} saved recipes`]
        : ["Favorites are private"],
    },
    {
      id: "following",
      icon: FaUsers,
      label: "Subscribed",
      value: source.subscriptionsCount ?? 156,
      colorClass: "text-blue-500",
      bgClass: "from-blue-100 to-cyan-50",
      details: [`${source.subscriptionsCount} creators`],
    },
    {
      id: "reviews",
      icon: FaStar,
      label: "Reviews",
      value: source.reviewsCount ?? 42,
      colorClass: "text-amber-500",
      bgClass: "from-amber-100 to-yellow-50",
      details: [`${source.reviewsCount} recipes reviewed`],
    },
    {
      id: "dietary",
      icon: FaSeedling,
      label: "Dietary",
      value: source.dietaryLabels?.length ?? 3,
      colorClass: "text-emerald-500",
      bgClass: "from-emerald-100 to-green-50",
      details: source.dietaryLabels || ["No dietary preferences"],
      hasList: true,
    },
    {
      id: "allergens",
      icon: FaAllergies,
      label: "Allergens",
      value: source.allergens?.length ?? 2,
      colorClass: "text-red-500",
      bgClass: "from-red-100 to-rose-50",
      details:
        source.allergens?.length > 0
          ? source.allergens
          : ["No allergens listed"],
      hasList: true,
    },
    {
      id: "cuisines",
      icon: FaGlobe,
      label: "Cuisines",
      value: source.cuisines?.length ?? 4,
      colorClass: "text-purple-500",
      bgClass: "from-purple-100 to-violet-50",
      details: source.cuisines || ["No cuisines selected"],
      hasList: true,
    },
  ];

  return (
    <div className="space-y-6 relative z-0">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {statItems.map((item) => {
          const Icon = item.icon;
          const isPrivateValue = item.isPrivate && !isOwnProfile;

          return (
            <div
              key={item.id}
              className="relative group"
              onClick={() => item.hasList && setActiveItem(item)}
            >
              <div
                className={`card bg-base-100 border-2 border-orange-100 shadow-sm hover:shadow-xl transition-all duration-300 min-h-[120px] sm:min-h-[140px] cursor-pointer group-hover:scale-105 group-active:scale-95 ${
                  item.hasList ? 'hover:border-orange-300' : 'cursor-default'
                }`}
              >
                <div className="card-body p-4 sm:p-5 flex flex-col items-center justify-center text-center gap-2">
                  {/* Icon with background */}
                  <div className={`w-10 h-10 rounded-full ${item.bgClass} bg-opacity-20 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${item.colorClass}`} />
                  </div>

                  {/* Value */}
                  <div className="flex flex-col items-center gap-1">
                    {isPrivateValue ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <FaLock className="w-4 h-4" />
                        <span className="text-sm font-medium">Private</span>
                      </div>
                    ) : (
                      <>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">
                          {item.value}
                        </div>
                        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          {item.label}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Clickable indicator */}
                  {item.hasList && !isPrivateValue && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daisy UI Modal */}
      {activeItem && (
        <div className="modal modal-open">
          <div className="modal-box relative max-w-md mx-auto shadow-2xl border border-orange-100">
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-full ${activeItem.bgClass} bg-opacity-20 flex items-center justify-center`}>
                <activeItem.icon className={`w-5 h-5 ${activeItem.colorClass}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{activeItem.label}</h3>
                <p className="text-sm text-gray-500">{activeItem.value} items</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {activeItem.details && activeItem.details.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {activeItem.details.map((detail, index) => (
                    <div
                      key={index}
                      className="badge badge-lg bg-orange-50 border border-orange-200 text-orange-700 font-medium py-3 px-4 hover:bg-orange-100 transition-colors cursor-default"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No items to display</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="modal-action">
              <button
                onClick={() => setActiveItem(null)}
                className="btn btn-ghost text-gray-600 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alternative Modal with Portal (if needed) */}
      {activeItem &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="card bg-base-100 shadow-2xl border border-orange-100 max-w-md w-full max-h-[90vh] overflow-hidden">
              <div className="card-body p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${activeItem.bgClass} bg-opacity-20 flex items-center justify-center`}>
                      <activeItem.icon className={`w-5 h-5 ${activeItem.colorClass}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{activeItem.label}</h3>
                      <p className="text-sm text-gray-500">{activeItem.value} total</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {activeItem.details && activeItem.details.length > 0 ? (
                    <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto p-1">
                      {activeItem.details.map((detail, index) => (
                        <div
                          key={index}
                          className="badge badge-lg bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 text-orange-700 font-medium py-3 hover:from-orange-100 hover:to-amber-100 transition-all cursor-default shadow-sm"
                        >
                          {detail}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">No items available</p>
                      <p className="text-gray-400 text-sm mt-1">This list is currently empty</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="card-actions justify-end mt-6">
                  <button
                    onClick={() => setActiveItem(null)}
                    className="btn btn-outline border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      }
    </div>
  );
}

export default ProfileStats;
