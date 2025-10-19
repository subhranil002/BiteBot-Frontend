import { useEffect, useState } from "react";
import {
    FaClock,
    FaHeart,
    FaPrint,
    FaShareAlt,
    FaStar,
    FaUsers,
    FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import RecipeCard from "../../components/recipe/RecipeCard";
import HomeLayout from "../../layouts/HomeLayout";

const HARDCODED_CHEF = {
    _id: "chef-77",
    profile: {
        name: "Asha Roy",
        avatar: {
            secure_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60"
        }
    }
};

const HARDCODED_RECIPE = {
    _id: "recipe-123",
    title: "Spicy Fish Curry",
    description: "A fragrant, tangy Bengali fish curry with mustard and spices. Great with steamed rice.",
    thumbnail: {
        secure_url: "https://tse4.mm.bing.net/th/id/OIP.yegn3aAPGUyQs6Ko3z2TNQAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    chefId: HARDCODED_CHEF._id,
    cuisine: "bengali",
    totalCookingTime: 50,
    servings: 4,
    isPremium: false,
    ingredients: [
        { name: "Rohu fish", quantity: 1, unit: "kg", marketPrice: 6.5 },
        { name: "Mustard paste", quantity: 0.05, unit: "kg", marketPrice: 40 },
        { name: "Turmeric", quantity: 0.02, unit: "kg", marketPrice: 10 },
        { name: "Salt", quantity: 0.01, unit: "kg", marketPrice: 2 },
    ],
    steps: [
        {
            stepNo: 1,
            instruction: "Clean and cut the fish. Marinate with salt and turmeric.",
            imageUrl: {
                secure_url: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80"
            }
        },
        { 
            stepNo: 2, 
            instruction: "Fry the fish lightly until golden.",
            imageUrl: {
                secure_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&q=80"
            }
        },
        {
            stepNo: 3,
            instruction: "Prepare mustard paste and temper with spices.",
            imageUrl: {
                secure_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"
            }
        },
        { 
            stepNo: 4, 
            instruction: "Cook fish with gravy until done.",
            imageUrl: {
                secure_url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80"
            }
        },
    ],
    dietaryLabels: ["gluten-free", "dairy-free"],
    externalMediaLinks: [
        { name: "Cooking Video", url: "https://youtube.com/watch?v=example" }
    ],
    reviews: [
        {
            userId: "user1",
            rating: 5,
            message: "Absolutely delicious!",
            createdAt: "2024-01-15T00:00:00.000Z"
        },
        {
            userId: "user2", 
            rating: 4,
            message: "Great recipe, would make again!",
            createdAt: "2024-01-16T00:00:00.000Z"
        }
    ],
    likes: ["user1", "user2", "user3"],
    averageRating: 4.5,
    reviewCount: 2,
    tags: ["seafood", "curry", "spicy"]
};

const SAMPLE_RELATED = [
    {
        _id: "r1",
        title: "Rosogolla (Soft Bengali Sweet)",
        thumbnail: {
            secure_url: "https://happietrio.com/wp-content/uploads/2016/10/DSC_1656.jpg"
        },
        description: "Soft, syrupy cheese balls simmered in light sugar syrup — an iconic Bengali sweet that's melt-in-your-mouth delightful.",
        isPremium: false,
        servings: 8,
        cuisine: "bengali",
        tags: ["Dessert", "Sweets", "Vegetarian"],
        averageRating: 4.8,
        reviewCount: 45
    },
    {
        _id: "r2",
        title: "Spicy Fish Curry",
        thumbnail: {
            secure_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=60"
        },
        description: "A bold, tangy fish curry with mustard and poppy seed flavors, perfect with steamed rice or rustic rotis.",
        isPremium: true,
        servings: 4,
        cuisine: "indian",
        tags: ["Seafood", "Dinner", "Spicy"],
        averageRating: 4.6,
        reviewCount: 128
    },
];

function RecipeDetail() {
    const [recipe] = useState(HARDCODED_RECIPE);
    const [chef] = useState(HARDCODED_CHEF);
    const [relatedRecipes] = useState(SAMPLE_RELATED);
    const [isLiked, setIsLiked] = useState(false);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const cost = recipe.ingredients.reduce((sum, ing) => {
            return sum + Number(ing.quantity) * Number(ing.marketPrice || 0);
        }, 0);
        setTotalCost(cost);
    }, [recipe]);

    const handleLike = () => {
        setIsLiked((s) => !s);
        // Here you would typically make an API call to update likes
    };

    const handleShare = () => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const costPerServing = recipe.servings ? totalCost / recipe.servings : totalCost;

    return (
        <HomeLayout>
            <div className="min-h-screen relative bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 overflow-hidden">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                    <div className="max-w-6xl mx-auto space-y-10">
                        {/* Hero Section */}
                        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-orange-100">
                            <img
                                src={recipe.thumbnail?.secure_url}
                                alt={recipe.title}
                                className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                            
                            {/* Like Button in Hero */}
                            <button
                                onClick={handleLike}
                                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                                    isLiked 
                                        ? 'bg-rose-500 text-white shadow-lg' 
                                        : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                                }`}
                            >
                                <FaHeart className={`w-5 h-5 ${isLiked ? 'text-white' : ''}`} />
                            </button>
                            
                            <div className="absolute bottom-8 left-6 sm:left-10">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
                                    {recipe.title}
                                </h1>
                                <p className="text-sm sm:text-base text-white/90 max-w-lg mt-1">
                                    {recipe.description}
                                </p>
                            </div>
                        </div>

                        {/* Main Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left (Main content) */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Chef Info */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/60 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-md shadow-orange-100 hover:shadow-orange-200/60 transition-transform hover:-translate-y-1">
                                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                        <img
                                            src={chef.profile?.avatar?.secure_url}
                                            alt={chef.profile?.name}
                                            className="w-14 h-14 rounded-full border-2 border-orange-200 object-cover"
                                        />
                                        <div>
                                            <Link
                                                to={`/profile/${chef._id}`}
                                                className="font-semibold text-gray-800 hover:text-orange-500 transition-colors"
                                            >
                                                {chef.profile?.name}
                                            </Link>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <FaStar className="text-yellow-400" /> {recipe.averageRating} •{" "}
                                                {recipe.reviewCount} reviews
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-ghost border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 ">
                                        <FaHeart className="mr-2 text-orange-500" /> Subscribe
                                    </button>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[
                                        { icon: <FaUsers />, label: "Servings", value: recipe.servings },
                                        { icon: <FaClock />, label: "Total Time", value: `${recipe.totalCookingTime} min` },
                                        { icon: <FaHeart />, label: "Likes", value: recipe.likes?.length || 0 },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="p-4 text-center bg-white/70 backdrop-blur-md border border-orange-100 rounded-2xl shadow-sm shadow-orange-100 hover:shadow-orange-200/60 transition-all hover:-translate-y-1"
                                        >
                                            <div className="text-orange-500 mx-auto h-6 w-6 mb-1">{item.icon}</div>
                                            <div className="font-semibold text-gray-700">{item.value}</div>
                                            <div className="text-sm text-gray-500">{item.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Dietary Labels */}
                                {recipe.dietaryLabels?.length > 0 && (
                                    <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-4 rounded-2xl shadow-sm">
                                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Dietary Information</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {recipe.dietaryLabels.map((label, index) => (
                                                <span
                                                    key={index}
                                                    className="badge badge-outline border-green-400 text-green-600"
                                                >
                                                    {label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Ingredients */}
                                <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-lg shadow-orange-200/40">
                                    <h3 className="text-xl font-bold mb-3 text-gray-800">Ingredients</h3>

                                    <p className="text-sm text-gray-500 mb-4">
                                        Estimated cost: ${totalCost?.toFixed(2) ?? "0.00"}
                                        {costPerServing > 0 && ` ($${costPerServing?.toFixed(2)} per serving)`}
                                    </p>

                                    <div className="divide-y divide-orange-100">
                                        {recipe.ingredients.map((ing, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-3 gap-4 py-2 text-gray-700"
                                            >
                                                <span className="font-medium">{ing.name}</span>
                                                <span className="text-gray-600 text-sm">
                                                    {ing.quantity} {ing.unit}
                                                </span>
                                                <span className="text-sm text-gray-500 text-right">
                                                    ${((ing.quantity || 0) * (ing.marketPrice || 0)).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Instructions with alternating text and images */}
                                <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-lg shadow-orange-200/40">
                                    <h3 className="text-xl font-bold mb-6 text-gray-800">Instructions</h3>
                                    <div className="space-y-8">
                                        {recipe.steps.map((step, i) => (
                                            <div key={i} className="space-y-4">
                                                {/* Instruction Text */}
                                                <div className="flex items-start gap-4">
                                                    <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full font-semibold shadow-md flex-shrink-0">
                                                        {step.stepNo}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-gray-700 leading-relaxed text-lg">{step.instruction}</p>
                                                    </div>
                                                </div>
                                                
                                                {/* Step Image */}
                                                {step.imageUrl?.secure_url && (
                                                    <div className="w-full">
                                                        <img 
                                                            src={step.imageUrl.secure_url} 
                                                            alt={`Step ${step.stepNo}`}
                                                            className="rounded-lg shadow-md w-full max-h-96 object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* External Media Links */}
                                {recipe.externalMediaLinks?.length > 0 && (
                                    <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-lg shadow-orange-200/40">
                                        <h3 className="text-xl font-bold mb-4 text-gray-800">Related Media</h3>
                                        <div className="space-y-2">
                                            {recipe.externalMediaLinks.map((link, index) => (
                                                <a
                                                    key={index}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block p-3 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
                                                >
                                                    <span className="font-medium text-orange-600">{link.name}</span>
                                                    <span className="text-sm text-gray-500 ml-2">→</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Rating & Reviews */}
                                <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-md shadow-orange-200/50 text-center">
                                    <div className="flex justify-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`text-xl ${i < Math.floor(recipe.averageRating)
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-700">{recipe.averageRating}</div>
                                    <p className="text-sm text-gray-500">
                                        Based on {recipe.reviewCount} reviews
                                    </p>
                                    <div className="mt-3 text-sm text-gray-600">
                                        {recipe.likes?.length || 0} likes
                                    </div>
                                </div>

                                {/* Tags */}
                                {/* {recipe.tags?.length > 0 && (
                                    <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-md shadow-orange-200/50">
                                        <h4 className="text-lg font-bold text-gray-800 mb-4">Tags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {recipe.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="badge badge-outline border-blue-300 text-blue-600"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )} */}

                                {/* Reviews Preview */}
                                {recipe.reviews?.length > 0 && (
                                    <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-md shadow-orange-200/50">
                                        <h4 className="text-lg font-bold text-gray-800 mb-4">Recent Reviews</h4>
                                        <div className="space-y-4 max-h-80 overflow-y-auto">
                                            {recipe.reviews.slice(0, 3).map((review, index) => (
                                                <div key={index} className="border-b border-orange-100 pb-3 last:border-0">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className={`w-3 h-3 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-gray-700">{review.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Related Recipes */}
                                {relatedRecipes.length > 0 && (
                                    <div className="bg-white/70 backdrop-blur-md border border-orange-100 p-6 rounded-2xl shadow-md shadow-orange-200/50">
                                        <h4 className="text-lg font-bold text-gray-800 mb-4">
                                            More {recipe.cuisine} Recipes
                                        </h4>
                                        <div className="space-y-4">
                                            {relatedRecipes.map((r) => (
                                                <RecipeCard key={r._id} recipe={r} compact />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default RecipeDetail;