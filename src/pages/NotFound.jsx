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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Floating holographic food icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => {
          const randomFood = foodIcons[Math.floor(Math.random() * foodIcons.length)];
          const left = Math.random() * 100;
          const animationDuration = Math.random() * 20 + 15;
          const animationDelay = Math.random() * 5;
          const opacity = Math.random() * 0.5 + 0.3;

          return (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${left}%`,
                top: "100vh",
                animationDuration: `${animationDuration}s`,
                animationDelay: `${animationDelay}s`,
                opacity,
                filter: "drop-shadow(0 0 10px rgba(255, 140, 0, 0.3))",
                zIndex: 0,
              }}
            >
              <div className={`${randomFood.size} blur-[0.2px]`}>{randomFood.icon}</div>
            </div>
          );
        })}
      </div>

      {/* Animated glowing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-300/30 to-amber-300/20 rounded-full blur-3xl mix-blend-overlay animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-red-300/30 to-pink-300/20 rounded-full blur-3xl mix-blend-overlay animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-yellow-300/30 to-orange-300/20 rounded-full blur-3xl mix-blend-overlay animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Main glassmorphic card */}
      <div className="text-center relative z-10 max-w-2xl mx-auto bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl p-10 shadow-[0_0_60px_rgba(255,160,90,0.2)] transition-all duration-700 hover:shadow-[0_0_80px_rgba(255,100,50,0.35)]">
        {/* 404 glowing number */}
        <div className="relative mb-8">
          <div className="text-9xl md:text-[12rem] font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,100,50,0.4)] animate-gradient-x">
            404
          </div>
          <div className="absolute -top-4 -right-4 animate-bounce">
            <FaSadTear className="text-6xl text-amber-400 opacity-80 drop-shadow-[0_0_8px_rgba(255,200,100,0.5)]" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 drop-shadow-sm">
            Recipe Not Found!
          </h1>
          <p className="text-lg text-gray-700 max-w-md mx-auto leading-relaxed">
            Oops! This recipe might have simmered away into the digital kitchen.
            Let’s get you cooking again with something delicious!
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            to="/"
            className="btn btn-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-0 text-white shadow-lg shadow-orange-400/40 hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
          >
            <FaHome className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <Link
            to="/recipes"
            className="btn btn-lg border-2 border-orange-400/60 text-orange-600 hover:bg-orange-100/30 hover:border-orange-500 transition-all duration-300 rounded-xl backdrop-blur-sm"
          >
            <FaSearch className="w-5 h-5 mr-2" />
            Explore Recipes
          </Link>
        </div>

        {/* Animated cooking icons row */}
        <div className="flex justify-center items-center gap-8 text-gray-500 mb-8">
          <div className="flex items-center gap-2 animate-bounce animation-delay-100">
            <GiKnifeFork className="w-6 h-6 text-orange-500" />
            <span className="text-sm font-medium">Chop</span>
          </div>
          <div className="flex items-center gap-2 animate-bounce animation-delay-300">
            <GiCookingPot className="w-7 h-7 text-amber-500" />
            <span className="text-sm font-medium">Cook</span>
          </div>
          <div className="flex items-center gap-2 animate-bounce animation-delay-500">
            <FaUtensils className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium">Serve</span>
          </div>
        </div>

        {/* AI Chef Card */}
        <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-6 border border-orange-200/50 shadow-[0_0_25px_rgba(255,160,90,0.25)] hover:shadow-[0_0_35px_rgba(255,120,60,0.35)] transition-all duration-500">
          <div className="flex items-center justify-center gap-3 mb-3">
            <GiCookingPot className="w-8 h-8 text-amber-500 animate-pulse" />
            <h3 className="text-lg font-semibold text-gray-800">AI Kitchen Tip</h3>
          </div>
          <p className="text-gray-600 text-sm">
            While we find this missing recipe, why not ask our AI Chef to cook up something unique with your ingredients?
          </p>
          <Link
            to="/chat"
            className="btn btn-sm mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-md shadow-orange-300/30 hover:shadow-orange-400/40 transition-all duration-300"
          >
            Try AI Chef →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-gray-500 text-sm">
        <p className="tracking-wide uppercase">Error 404 • Page Not Found • BiteBot</p>
      </div>
    </div>
  );
};

export default NotFound;
