import { FaHome, FaSadTear, FaSearch, FaUtensils } from "react-icons/fa";
import { GiCookingPot, GiForkKnifeSpoon, GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";

const NotFound = () => {
  const foodIcons = [
    { icon: <GiKnifeFork className="text-orange-400" />, size: "text-2xl" },
    { icon: <GiCookingPot className="text-amber-500" />, size: "text-3xl" },
    { icon: <GiForkKnifeSpoon className="text-red-400" />, size: "text-2xl" },
    { icon: <FaUtensils className="text-orange-500" />, size: "text-xl" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const randomFood = foodIcons[Math.floor(Math.random() * foodIcons.length)];
          const left = Math.random() * 100;
          const duration = Math.random() * 20 + 15;
          const delay = Math.random() * 5;
          const opacity = Math.random() * 0.5 + 0.3;

          return (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${left}%`,
                top: "100vh",
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                opacity,
                filter: "drop-shadow(0 0 10px rgba(255,140,0,0.3))",
                zIndex: 0,
              }}
            >
              <div className={`${randomFood.size}`}>{randomFood.icon}</div>
            </div>
          );
        })}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-red-200/30 rounded-full blur-3xl animate-pulse-slow delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl animate-pulse-slow delay-4000" />
      </div>

      {/* Main Glass Card */}
      <div className="card glass shadow-2xl p-10 max-w-2xl text-center z-10">
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-lg">
            404
          </h1>
          <FaSadTear className="absolute -top-4 -right-4 text-6xl text-amber-400 animate-bounce opacity-80 drop-shadow" />
        </div>

        <div className="space-y-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Recipe Not Found!
          </h2>
          <p className="text-lg opacity-80">
            Oops! This recipe might have simmered away into the digital kitchen.
            Let’s get you cooking again with something delicious!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/" className="btn btn-primary bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg hover:scale-105 transition-transform">
            <FaHome className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <Link to="/recipes" className="btn btn-outline btn-warning hover:bg-orange-100/40 transition">
            <FaSearch className="w-5 h-5 mr-2" />
            Explore Recipes
          </Link>
        </div>

        {/* Icons Row */}
        <div className="flex justify-center gap-8 text-gray-500 mb-8">
          <div className="flex items-center gap-2 animate-bounce delay-100">
            <GiKnifeFork className="w-6 h-6 text-orange-500" />
            <span className="text-sm font-medium">Chop</span>
          </div>
          <div className="flex items-center gap-2 animate-bounce delay-300">
            <GiCookingPot className="w-7 h-7 text-amber-500" />
            <span className="text-sm font-medium">Cook</span>
          </div>
          <div className="flex items-center gap-2 animate-bounce delay-500">
            <FaUtensils className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium">Serve</span>
          </div>
        </div>

        {/* AI Tip Card */}
        <div className="card bg-base-100/60 backdrop-blur-xl border border-orange-200/50 shadow-lg hover:shadow-xl transition-all p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <GiCookingPot className="w-8 h-8 text-amber-500 animate-pulse" />
            <h3 className="text-lg font-semibold text-gray-800">AI Kitchen Tip</h3>
          </div>
          <p className="text-gray-600 text-sm">
            While we find this missing recipe, why not ask our AI Chef to cook up something unique with your ingredients?
          </p>
          <Link
            to="/chat"
            className="btn btn-sm mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:scale-105 transition-transform"
          >
            Try AI Chef →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-500">
        Error 404 • Page Not Found • BiteBot
      </footer>
    </div>
  );
};

export default NotFound;
