import { FaComments, FaHeart,FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => (
    <section className="relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20">
        {/* Decorative elements */}
        <div className="absolute top-10 left-5 md:left-20 w-24 h-24 md:w-32 md:h-32 bg-accent/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-5 md:right-20 w-28 h-28 md:w-36 md:h-36 bg-primary/10 rounded-full blur-xl"></div>

        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-10">
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                Cook Smarter with{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    BiteBot
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-base-content/80 max-w-2xl mx-auto lg:mx-0">
                                Discover perfect recipes using AI-powered
                                search. Find dishes based on ingredients you
                                have, get nutrition insights, and connect with
                                talented chefs.
                            </p>
                        </div>

                        {/* Feature Highlights */}
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                            <div className="flex items-center gap-2 p-3 bg-base-200 rounded-box">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <FaSearch className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm">
                                    AI-Powered Search
                                </span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-base-200 rounded-box">
                                <div className="p-2 bg-secondary/10 rounded-full">
                                    <FaHeart className="w-4 h-4 text-secondary" />
                                </div>
                                <span className="text-sm">Save Favorites</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/chat" className="btn btn-primary gap-2">
                                <FaComments className="w-5 h-5" />
                                Start Cooking Chat
                            </Link>
                            <Link
                                to="/recipes"
                                className="btn btn-outline btn-secondary gap-2"
                            >
                                Explore Recipes
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Visual Element - Recipe Card Preview with Image */}
                <div className="flex-1 justify-center hidden sm:flex">
                    <div className="card w-full max-w-md bg-base-100 shadow-xl overflow-hidden">
                        <figure>
                            <img
                                src="https://thehappyfoodie.co.uk/wp-content/uploads/2023/06/106_SpicyButterTomatoWhiteFish1-1229x1536.jpg"
                                alt="Spicy Butter Tomato White Fish"
                                className="w-full h-64 object-cover"
                            />
                        </figure>
                        <div className="card-body bg-base-100/90 backdrop-blur-sm">
                            <h2 className="card-title">
                                Spicy Butter Tomato White Fish
                            </h2>
                            <div className="flex justify-between items-center">
                                <div className="badge badge-accent badge-lg">
                                    25 mins
                                </div>
                                <div className="flex gap-2">
                                    <div className="badge badge-outline badge-lg">
                                        Seafood
                                    </div>
                                    <div className="badge badge-outline badge-lg">
                                        Spicy
                                    </div>
                                </div>
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <div className="flex gap-2">
                                    <span className="font-bold text-primary">
                                        $14.75
                                    </span>
                                    <span>•</span>
                                    <span className="text-secondary">
                                        320 calories
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HeroSection;
