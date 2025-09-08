import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    GiChickenLeg, GiFruitBowl, GiHotMeal, GiSushis,
    GiCupcake, GiCheeseWedge, GiDonerKebab, GiMeat,
    GiCorn, GiPotato, GiCarrot, GiOlive,
    GiCoffeeBeans, GiCroissant, GiGrapes
} from 'react-icons/gi';

const Login = () => {
    const [Email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Login logic here
    }

    const foodIcons = [
        { icon: <GiChickenLeg className="text-purple-300" /> },
        { icon: <GiFruitBowl className="text-blue-300" /> },
        { icon: <GiHotMeal className="text-indigo-300" /> },
        { icon: <GiSushis className="text-pink-300" /> },
        { icon: <GiCupcake className="text-rose-300" /> },
        { icon: <GiCheeseWedge className="text-cyan-200" /> },
        { icon: <GiDonerKebab className="text-violet-300" /> },
        { icon: <GiMeat className="text-fuchsia-300" /> },
        { icon: <GiCorn className="text-teal-300" /> },
        { icon: <GiPotato className="text-lavender-300" /> },
        { icon: <GiCarrot className="text-amber-300" /> },
        { icon: <GiOlive className="text-emerald-300" /> },
        { icon: <GiCoffeeBeans className="text-blue-400" /> },
        { icon: <GiCroissant className="text-purple-200" /> },
        { icon: <GiGrapes className="text-indigo-200" /> },
    ];

    // Generate floating icons once and store in a ref
    const floatingIconsRef = useRef(
        Array.from({ length: 40 }, (_, i) => {
            const randomFood = foodIcons[Math.floor(Math.random() * foodIcons.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 20 + 15;
            const animationDelay = Math.random() * 5;
            const size = Math.random() * 24 + 16;
            const opacity = Math.random() * 0.4 + 0.1;

            return (
                <div
                    key={i}
                    className="absolute animate-float"
                    style={{
                        left: `${left}%`,
                        top: '100vh',
                        animationDuration: `${animationDuration}s`,
                        animationDelay: `${animationDelay}s`,
                        fontSize: `${size}px`,
                        opacity: opacity,
                        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
                        zIndex: 0,
                    }}
                >
                    {randomFood.icon}
                </div>
            );
        })
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-transparent">
            {/* Floating icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingIconsRef.current}
            </div>

            {/* Subtle gradient background for the form only */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-400/5 to-indigo-600/5 backdrop-blur-[2px] rounded-3xl -z-10"></div>

            {/* Glassmorphic Card */}
            <div className="w-full max-w-md z-10 animate-fadeIn">
                <div className="bg-gradient-to-br from-purple-400/15 via-blue-300/15 to-indigo-500/15 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border border-white/30 border-b-white/20 border-r-white/20 transform transition-all duration-700 hover:scale-[1.02] hover:shadow-purple-500/30 relative overflow-hidden">
                    {/* Subtle shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer pointer-events-none"></div>
                    
                    <div className="p-8 relative">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent mb-2 drop-shadow-md">Welcome Back</h1>
                            <p className="text-white/90 drop-shadow-sm text-lg">Sign in to your BiteBot account</p>
                        </div>

                        <div className="space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold drop-shadow-sm flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        Email
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input w-full bg-white/15 border border-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all duration-300 text-white placeholder-white/70 backdrop-blur-sm py-4 px-5 rounded-xl"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold drop-shadow-sm flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input w-full bg-white/15 border border-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all duration-300 text-white placeholder-white/70 backdrop-blur-sm py-4 px-5 rounded-xl"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="btn btn-lg border-0 btn-block bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/30 hover:shadow-purple-600/40 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-white font-bold py-4 rounded-xl relative overflow-hidden group"
                            >
                                <span className="relative z-10">
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            Logging in...
                                        </>
                                    ) : (
                                        "Continue"
                                    )}
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-white/80 text-sm">
                                Don't have an account?
                                <Link to={'/Signup'} className="text-blue-300 hover:text-purple-300 font-semibold ml-1 transition-colors duration-300 hover:underline">
                                    Sign up
                                </Link>
                            </p>

                            <p className="text-white/80 text-sm mt-2">
                                <Link to={'/ForgetPassword'} className="text-blue-300 hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline">
                                    Forgot password?
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;