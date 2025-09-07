import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    GiChickenLeg, GiFruitBowl, GiHotMeal, GiSushis,
    GiCupcake, GiCheeseWedge, GiDonerKebab, GiMeat,
    GiCorn, GiPotato, GiCarrot, GiOlive,
    GiCoffeeBeans, GiCroissant, GiGrapes
} from 'react-icons/gi';
import '../index.css'

const Login = () => {
    const [Email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Login logic here
    }

    const foodIcons = [
        { icon: <GiChickenLeg className="text-amber-400" /> },
        { icon: <GiFruitBowl className="text-orange-400" /> },
        { icon: <GiHotMeal className="text-amber-500" /> },
        { icon: <GiSushis className="text-red-400" /> },
        { icon: <GiCupcake className="text-pink-300" /> },
        { icon: <GiCheeseWedge className="text-yellow-200" /> },
        { icon: <GiDonerKebab className="text-orange-300" /> },
        { icon: <GiMeat className="text-red-500" /> },
        { icon: <GiCorn className="text-yellow-300" /> },
        { icon: <GiPotato className="text-amber-300" /> },
        { icon: <GiCarrot className="text-orange-500" /> },
        { icon: <GiOlive className="text-green-600" /> },
        { icon: <GiCoffeeBeans className="text-amber-900" /> },
        { icon: <GiCroissant className="text-yellow-100" /> },
        { icon: <GiGrapes className="text-purple-400" /> },
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
        <div className="min-h-screen bg-gradient-to-br from-amber-500 via-orange-400 to-yellow-300 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>

            {/* Floating icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingIconsRef.current}
            </div>

            {/* Card */}
            <div className="w-full max-w-md z-10 animate-fadeIn">
                <div className="card bg-amber-50/90 backdrop-blur-md shadow-2xl shadow-amber-700/30 border border-amber-200/50 transform transition-all duration-700 hover:scale-[1.02] rounded-2xl">
                    <div className="card-body p-8">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-amber-900 mb-2">Welcome Back</h1>
                            <p className="text-amber-800/80">Sign in to your BiteBot account</p>
                        </div>

                        <div className="space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-amber-900 font-semibold">Email</span>
                                </label>
                                <input
                                    type="text"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input input-bordered w-full bg-white border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none transition-all duration-300 text-amber-900 placeholder-amber-400/70"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-amber-900 font-semibold">Password</span>
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input input-bordered w-full bg-white/90 border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none transition-all duration-300 text-amber-900 placeholder-amber-400/70"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="btn btn-lg border-0 btn-block  bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Logging in...
                                    </>
                                ) : (
                                    "Continue"
                                )}
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-amber-800/70 text-sm">
                                Don't have an account?
                                <Link to={'/Signup'} className="text-amber-700 hover:text-amber-900 font-semibold ml-1 transition-colors duration-300">
                                    Sign up
                                </Link>
                            </p>
                            
                            {/* <p className="text-amber-800/70 text-sm mt-2">
                <Link to={'/ForgetPassword'} className="text-amber-700 hover:text-amber-900 font-semibold transition-colors duration-300">
                  Forgot password?
                </Link>
              </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
