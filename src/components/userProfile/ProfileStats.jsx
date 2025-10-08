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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                    <div
                        key={idx}
                        className="card bg-base-100 shadow hover:shadow-md transition-shadow"
                    >
                        <div className="card-body p-4 text-center items-center">
                            <div className={`mb-2`}>
                                <Icon
                                    className={`w-6 h-6 mx-auto ${item.colorClass}`}
                                />
                            </div>
                            <div className="text-2xl font-bold">
                                {item.value}
                            </div>
                            <div className="text-sm text-gray-500">
                                {item.label}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProfileStats;
