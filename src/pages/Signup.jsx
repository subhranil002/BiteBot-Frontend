import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GiChickenLeg, GiFruitBowl, GiHotMeal, GiSushis,
  GiCupcake, GiCheeseWedge, GiDonerKebab, GiMeat,
  GiCorn, GiPotato, GiCarrot, GiOlive,
  GiCoffeeBeans, GiCroissant, GiGrapes
} from 'react-icons/gi';

const SignUp = () => {
    const [Email, setEmail] = useState('');
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [btnText, setBtnText] = useState('Sign Up');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Food icons for our floating animation
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

    // Use useMemo to generate static positions that won't change on re-render
    const floatingIcons = useMemo(() => {
        const icons = [];
        // Create 40 icons for a dense background
        for (let i = 0; i < 40; i++) {
            const randomFood = foodIcons[Math.floor(Math.random() * foodIcons.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 20 + 15;
            const animationDelay = Math.random() * 5;
            const size = Math.random() * 24 + 16;
            const opacity = Math.random() * 0.4 + 0.1;
            
            icons.push(
                <div
                    key={i}
                    className="absolute animate-float"
                    style={{
                        left: `${left}%`,
                        top: '100vh', // Start from bottom
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
        }
        return icons;
    }, []); // Empty dependency array means this only runs once

    const handleSignUp = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!Email.trim()) {
            setError('Email is required');
            return;
        }

        if (!userName.trim()) {
            setError('Username  is required');
            return;
        }

        if (!emailRegex.test(Email.trim())) {
            setError('Invalid email format');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setBtnText('Try Again');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        try {
            setIsLoading(true);
            setBtnText('Creating Account...');

            // await register(Email, password,userName);
            navigate('/');

        } catch (err) {
            setError('Signup failed. Please try again.');
            setBtnText('Sign Up');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-500 via-orange-400 to-yellow-300 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>

            {/* Dense floating food icons background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingIcons}
            </div>

            <div className="w-full max-w-md z-10 animate-fadeIn">
                <div className="card bg-amber-50/90 backdrop-blur-md shadow-2xl shadow-amber-700/30 border border-amber-200/50 transform transition-all duration-700 hover:scale-[1.02] rounded-2xl">
                    <div className="card-body p-8">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-amber-900 mb-2">Welcome</h1>
                            <p className="text-amber-800/80">Register your account</p>
                        </div>

                        {error && (
                            <div className="alert alert-error mb-6 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-amber-900 font-semibold">Username</span>
                                </label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => {
                                        setuserName(e.target.value);
                                        setError('');
                                    }}
                                    className=" input input-bordered w-full bg-white/90 border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none transition-all duration-300 text-amber-900 placeholder-amber-400/70"
                                    placeholder="Enter your username"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-amber-900 font-semibold">Email</span>
                                </label>
                                <input
                                    type="text"
                                    value={Email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                    className="input input-bordered w-full bg-white/90 border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none transition-all duration-300 text-amber-900 placeholder-amber-400/70"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-amber-900 font-semibold">Password</span>
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    className="input input-bordered w-full bg-white/90 border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none transition-all duration-300 text-amber-900 placeholder-amber-400/70"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-amber-900 font-semibold">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setError('');
                                    }}
                                    className="input input-bordered w-full bg-white/90 border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none transition-all duration-300 text-amber-900 placeholder-amber-400/70"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>

                            <button
                                onClick={handleSignUp}
                                disabled={isLoading}
                                className={`btn btn-lg border-0 btn-block py-3.5 px-6 rounded-lg text-white font-medium text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center ${isLoading
                                    ? 'bg-amber-700 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 hover:shadow-amber-500/30 border-0'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        {btnText}
                                    </>
                                ) : (
                                    btnText
                                )}
                            </button>
                            
                            <div className="mt-8 text-center">
                                <p className="text-amber-800/70 text-sm">
                                    Already a user?
                                    <Link to={'/login'} className="text-amber-700 hover:text-amber-900 font-semibold ml-1 transition-colors duration-300">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;