import { FaComments, FaHeart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => (
    <section className="relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-amber-50">
        {/* Decorative blurred shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-300/30 rounded-full blur-3xl animate-pulse"></div>

        <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                            Cook Smarter with{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 drop-shadow-sm">
                                BiteBot
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Discover perfect recipes using AI-powered search.
                            Find dishes based on ingredients you already have,
                            get nutrition insights, and connect with talented chefs worldwide.
                        </p>
                    </div>

                    {/* Feature Highlights */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-orange-100/60 border border-orange-200/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                            <div className="p-2 bg-orange-200/80 rounded-full">
                                <FaSearch className="w-4 h-4 text-orange-600" />
                            </div>
                            <span className="font-medium text-gray-700">AI-Powered Search</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-100/60 border border-amber-200/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                            <div className="p-2 bg-amber-200/80 rounded-full">
                                <FaHeart className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="font-medium text-gray-700">Save Favorites</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            to="/chat"
                            className="btn bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-600/30 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <FaComments className="w-5 h-5 mr-2" />
                            Start Cooking Chat
                        </Link>
                        <Link
                            to="/recipes"
                            className="btn border-2 border-orange-400 text-orange-600 hover:bg-orange-50 font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
                        >
                            Explore Recipes
                        </Link>
                    </div>
                </div>

                {/* Visual Preview Card */}
                <div className="flex-1 justify-center hidden sm:flex">
                    <div className="card w-full max-w-md bg-white border border-orange-100 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                        <figure className="relative overflow-hidden">
                            <img
                                src="https://thehappyfoodie.co.uk/wp-content/uploads/2023/06/106_SpicyButterTomatoWhiteFish1-1229x1536.jpg"
                                alt="Spicy Butter Tomato White Fish"
                                className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </figure>
                        <div className="p-6 space-y-3">
                            <h2 className="text-xl font-bold text-gray-800">
                                Spicy Butter Tomato White Fish
                            </h2>
                            <div className="flex justify-between items-center">
                                <div className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
                                    25 mins
                                </div>
                                <div className="flex gap-2">
                                    <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-600 font-medium text-sm">
                                        Seafood
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium text-sm">
                                        Spicy
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end items-center gap-2 text-sm mt-2">
                                <span className="font-bold text-orange-600">$14.75</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-amber-600">320 calories</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HeroSection;
