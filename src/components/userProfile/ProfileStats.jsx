import { useState } from "react";
import { createPortal } from "react-dom";
import {
  FaAllergies,
  FaGlobe,
  FaHeart,
  FaSeedling,
  FaStar,
  FaUsers,
} from "react-icons/fa";

function ProfileStats({ profileData }) {
  const [activeItem, setActiveItem] = useState(null);

  const statItems = [
    {
      id: "favourites",
      icon: FaHeart,
      label: "Favorites",
      value: profileData?.favourites?.length ?? 0,
      colorClass: "text-rose-500",
      bgClass: "from-rose-100 to-pink-50",
    },
    {
      id: "subscribed",
      icon: FaUsers,
      label: "Subscribed",
      value: profileData?.profile?.subscribed?.length ?? 0,
      colorClass: "text-blue-500",
      bgClass: "from-blue-100 to-cyan-50",
    },
    {
      id: "reviews",
      icon: FaStar,
      label: "Reviews Given",
      value: profileData?.reviewsGiven?.length ?? 0,
      colorClass: "text-amber-500",
      bgClass: "from-amber-100 to-yellow-50",
    },
    {
      id: "dietary",
      icon: FaSeedling,
      label: "Dietary Preferences",
      value: profileData?.profile?.dietaryLabels?.length ?? 0,
      colorClass: "text-emerald-500",
      bgClass: "from-emerald-100 to-green-50",
      hasList: true,
      details:
        profileData?.profile?.dietaryLabels?.length > 0
          ? profileData.profile.dietaryLabels
          : ["No dietary preferences"],
    },
    {
      id: "allergens",
      icon: FaAllergies,
      label: "Allergens",
      value: profileData?.profile?.allergens?.length ?? 0,
      colorClass: "text-red-500",
      bgClass: "from-red-100 to-rose-50",
      hasList: true,
      details:
        profileData?.profile?.allergens?.length > 0
          ? profileData.profile.allergens
          : ["No allergens listed"],
    },
    {
      id: "cuisine",
      icon: FaGlobe,
      label: "Favourite Cuisine",
      value: profileData?.profile?.cuisine,
      colorClass: "text-purple-500",
      bgClass: "from-purple-100 to-violet-50",
    },
  ];

  return (
    <div className="space-y-6 relative z-0">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {statItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="relative group"
              onClick={() => item.hasList && setActiveItem(item)}
            >
              <div
                className={`card bg-base-100 border-2 border-orange-100 shadow-sm hover:shadow-xl transition-all duration-300 min-h-[120px] sm:min-h-[140px] cursor-pointer group-hover:scale-105 group-active:scale-95 ${
                  item.hasList ? "hover:border-orange-300" : "cursor-default"
                }`}
              >
                <div className="card-body p-4 sm:p-5 flex flex-col items-center justify-center text-center gap-2">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full ${item.bgClass} bg-opacity-20 flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${item.colorClass}`} />
                  </div>

                  {/* Value */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">
                      {item.value}
                    </div>
                    <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      {item.label}
                    </div>
                  </div>

                  {/* Clickable indicator */}
                  {item.hasList && (
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

      {/* Modal */}
      {activeItem &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="card bg-base-100 shadow-2xl border border-orange-100 max-w-md w-full max-h-[90vh] overflow-hidden">
              <div className="card-body p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${activeItem.bgClass} bg-opacity-20 flex items-center justify-center`}
                    >
                      <activeItem.icon
                        className={`w-5 h-5 ${activeItem.colorClass}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {activeItem.label}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {activeItem.value} total
                      </p>
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
                      <p className="text-gray-500 font-medium">
                        No items available
                      </p>
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
        )}
    </div>
  );
}

export default ProfileStats;
