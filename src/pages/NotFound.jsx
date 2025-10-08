import { FaHome, FaSadTear,FaSearch, FaUtensils } from "react-icons/fa";
import { GiCookingPot, GiForkKnifeSpoon,GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";

const NotFound = () => {
    const foodIcons = [
        { icon: <GiKnifeFork className="text-orange-400" />, size: "text-2xl" },
        { icon: <GiCookingPot className="text-amber-500" />, size: "text-3xl" },
        {
            icon: <GiForkKnifeSpoon className="text-red-400" />,
            size: "text-2xl",
        },
        { icon: <FaUtensils className="text-orange-500" />, size: "text-xl" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
            {/* Floating food icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }, (_, i) => {
                    const randomFood =
                        foodIcons[Math.floor(Math.random() * foodIcons.length)];
                    const left = Math.random() * 100;
                    const animationDuration = Math.random() * 20 + 15;
                    const animationDelay = Math.random() * 5;
                    const opacity = Math.random() * 0.4 + 0.2;

                    return (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${left}%`,
                                top: "100vh",
                                animationDuration: `${animationDuration}s`,
                                animationDelay: `${animationDelay}s`,
                                opacity: opacity,
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                                zIndex: 0,
                            }}
                        >
                            <div className={randomFood.size}>
                                {randomFood.icon}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Main content */}
            <div className="text-center relative z-10 max-w-2xl mx-auto">
                {/* 404 Number with creative design */}
                <div className="relative mb-8">
                    <div className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-orange-400 via-red-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm animate-pulse">
                        404
                    </div>
                    <div className="absolute -top-4 -right-4 animate-bounce">
                        <FaSadTear className="text-6xl text-amber-400 opacity-80" />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-6 mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Recipe Not Found!
                    </h1>
                    <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
                        Oops! It looks like this page has been whisked away or
                        never existed. Let's get you back to cooking amazing
                        recipes!
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <Link
                        to="/"
                        className="btn btn-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-0 text-white shadow-lg shadow-orange-300/40 hover:shadow-orange-400/50 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <FaHome className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                    <Link
                        to="/recipes"
                        className="btn btn-lg btn-outline border-2 border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 transition-all duration-300"
                    >
                        <FaSearch className="w-5 h-5 mr-2" />
                        Explore Recipes
                    </Link>
                </div>

                {/* Decorative cooking elements */}
                <div className="flex justify-center items-center gap-8 text-gray-400 mb-8">
                    <div className="flex items-center gap-2 animate-bounce animation-delay-100">
                        <GiKnifeFork className="w-6 h-6" />
                        <span className="text-sm">Chop</span>
                    </div>
                    <div className="flex items-center gap-2 animate-bounce animation-delay-300">
                        <GiCookingPot className="w-7 h-7" />
                        <span className="text-sm">Cook</span>
                    </div>
                    <div className="flex items-center gap-2 animate-bounce animation-delay-500">
                        <FaUtensils className="w-5 h-5" />
                        <span className="text-sm">Serve</span>
                    </div>
                </div>

                {/* Fun message */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <GiCookingPot className="w-8 h-8 text-amber-500" />
                        <h3 className="text-lg font-semibold text-gray-800">
                            Kitchen Tip
                        </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                        While we fix this missing page, why not try our AI chef?
                        It can help you create amazing recipes with whatever
                        ingredients you have!
                    </p>
                    <Link
                        to="/chat"
                        className="btn btn-sm btn-ghost text-orange-500 mt-3 hover:bg-orange-50"
                    >
                        Try AI Chef →
                    </Link>
                </div>
            </div>

            {/* Bottom decorative elements */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-sm">
                <p>Error 404 • Page Not Found • BiteBot</p>
            </div>
        </div>
    );
};

export default NotFound;
