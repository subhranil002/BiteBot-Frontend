import { FaHeart, FaStar, FaUsers } from "react-icons/fa";

const DEFAULT_STATS = {
    favoritesCount: 12,
    recipesCount: 34,
    subscriptionsCount: 8,
    reviewsCount: 21,
};

function ProfileStats() {
    const source = DEFAULT_STATS;

    const statItems = [
        {
            icon: FaHeart,
            label: "Favorites",
            value: source.favoritesCount ?? 0,
            colorClass: "text-error",
        },
        {
            icon: FaUsers,
            label: "Subscriptions",
            value: source.subscriptionsCount ?? 0,
            colorClass: "text-accent",
        },
        {
            icon: FaStar,
            label: "Reviews",
            value: source.reviewsCount ?? 0,
            colorClass: "text-warning",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {statItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                    <div
                        key={idx}
                        className="bg-white/70 backdrop-blur-md border border-orange-100 rounded-2xl shadow-md shadow-orange-100/40
                   hover:shadow-orange-300/50 hover:-translate-y-1 hover:scale-[1.02]
                   transition-all duration-300 ease-out p-5 text-center flex flex-col items-center justify-center"
                    >
                        <div className="flex items-center justify-center mb-3">
                            <Icon
                                className={`w-7 h-7 sm:w-8 sm:h-8 ${item.colorClass} drop-shadow-md`}
                            />
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                            {item.value}
                        </div>
                        <div className="text-sm sm:text-base text-gray-600 mt-1">
                            {item.label}
                        </div>
                    </div>
                );
            })}
        </div>


    );
}

export default ProfileStats;
