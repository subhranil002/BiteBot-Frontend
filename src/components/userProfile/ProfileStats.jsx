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
    <div className="space-y-4 relative z-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {statItems.map((item) => {
          const Icon = item.icon;
          const isPrivateValue = item.isPrivate && !isOwnProfile;

          return (
            <div
              key={item.id}
              className="relative cursor-pointer"
              onClick={() => item.hasList && setActiveItem(item)}
            >
              <div
                className={`relative bg-base-100/80 backdrop-blur-md border border-base-200 rounded-xl shadow-sm p-4 flex flex-col items-center justify-between text-center transition-all duration-200 min-h-[110px] sm:min-h-[120px] hover:shadow-md active:scale-95`}
              >
                {/* Background glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.bgClass} rounded-xl opacity-20 blur-lg`}
                ></div>

                {/* Content */}
                <div className="relative flex flex-col items-center gap-1">
                  <Icon className={`w-5 h-5 ${item.colorClass}`} />

                  {/* Value */}
                  <div
                    className={`text-base sm:text-lg font-bold flex items-center justify-center gap-1 ${isPrivateValue ? "text-gray-400" : "text-gray-900"
                      }`}
                  >
                    {isPrivateValue ? (
                      <>
                        <FaLock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Private</span>
                      </>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </div>

                  {/* Label */}
                  <div
                    className={`text-xs font-medium ${isPrivateValue ? "text-gray-500" : "text-gray-600"
                      }`}
                  >
                    {item.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      

      {activeItem &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <h2 className="text-lg font-bold mb-4">{activeItem.label}</h2>
              <div className="flex flex-wrap gap-2">
                {activeItem.details.map((detail, index) => (
                  <span
                    key={index}
                    className="badge badge-md bg-base-200 text-base-content border-0 font-medium"
                  >
                    {detail}
                  </span>
                ))}
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
