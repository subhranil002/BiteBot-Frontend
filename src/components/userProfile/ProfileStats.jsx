import { FaHeart, FaStar, FaUsers } from "react-icons/fa";

function ProfileStats({ stats }) {
  const source = stats || {
    favoritesCount: 0,
    subscriptionsCount: 0,
    reviewsCount: 0,
  };

  const statItems = [
    {
      icon: FaHeart,
      label: "Favorites",
      value: source.favoritesCount ?? 0,
      colorClass: "text-rose-500",
      bgClass: "from-rose-100 to-pink-50",
    },
    {
      icon: FaUsers,
      label: "Subscriptions",
      value: source.subscriptionsCount ?? 0,
      colorClass: "text-orange-500",
      bgClass: "from-orange-100 to-amber-50",
    },
    {
      icon: FaStar,
      label: "Reviews",
      value: source.reviewsCount ?? 0,
      colorClass: "text-yellow-500",
      bgClass: "from-yellow-100 to-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="relative card bg-base-100/70 backdrop-blur-md border border-orange-100 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 p-5 flex flex-col items-center justify-center text-center"
          >
            {/* soft background glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.bgClass} rounded-2xl opacity-40 blur-2xl`}
            >12</div>

            {/* icon */}
            <div className="relative mb-3">
              <Icon className={`w-8 h-8 ${item.colorClass}`} />
            </div>

            {/* value */}
            <div className="relative text-2xl sm:text-3xl font-extrabold text-gray-900">
              {item.value}
            </div>

            {/* label */}
            <div className="relative text-sm sm:text-base text-gray-600 mt-1 font-medium">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProfileStats;
