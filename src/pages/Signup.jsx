import React, { useState, useRef } from 'react';
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
        { icon: <GiChickenLeg className="text-amber-500" /> },
        { icon: <GiFruitBowl className="text-red-400" /> },
        { icon: <GiHotMeal className="text-orange-500" /> },
        { icon: <GiSushis className="text-rose-500" /> },
        { icon: <GiCupcake className="text-pink-400" /> },
        { icon: <GiCheeseWedge className="text-yellow-400" /> },
        { icon: <GiDonerKebab className="text-amber-600" /> },
        { icon: <GiMeat className="text-red-500" /> },
        { icon: <GiCorn className="text-yellow-500" /> },
        { icon: <GiPotato className="text-amber-700" /> },
        { icon: <GiCarrot className="text-orange-600" /> },
        { icon: <GiOlive className="text-emerald-500" /> },
        { icon: <GiCoffeeBeans className="text-brown-500" /> },
        { icon: <GiCroissant className="text-amber-400" /> },
        { icon: <GiGrapes className="text-purple-400" /> },
    ];

    // Use useRef to generate static positions that won't change on re-render
    const floatingIconsRef = useRef(
        Array.from({ length: 40 }, (_, i) => {
            const randomFood = foodIcons[Math.floor(Math.random() * foodIcons.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 20 + 15;
            const animationDelay = Math.random() * 5;
            const size = Math.random() * 24 + 16;
            const opacity = Math.random() * 0.6 + 0.3;
            
            return (
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
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                        zIndex: 0,
                    }}
                >
                    {randomFood.icon}
                </div>
            );
        })
    );

    const handleSignUp = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!Email.trim()) {
            setError('Email is required');
            return;
        }

        if (!userName.trim()) {
            setError('Username is required');
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
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
            {/* Dense floating food icons background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingIconsRef.current}
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-4000"></div>
            </div>

            <div className="w-full max-w-md z-10 animate-fadeIn">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-200/50 border border-white/60 transform transition-all duration-700 hover:scale-[1.02] hover:shadow-orange-300/60 relative overflow-hidden">
                    {/* Subtle shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50/30 to-transparent -skew-x-12 animate-shimmer pointer-events-none"></div>
                    
                    <div className="p-8 relative">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2 drop-shadow-sm animate-gradient-x">
                                Create Account
                            </h1>
                            <p className="text-gray-600 text-lg font-medium">Join the BiteBot community</p>
                        </div>

                        {error && (
                            <div className="alert mb-6 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm p-4 backdrop-blur-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700 font-semibold flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                        Username
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => {
                                        setuserName(e.target.value);
                                        setError('');
                                    }}
                                    className="input w-full bg-white border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 py-4 px-5 rounded-xl hover:border-orange-300"
                                    placeholder="Enter your username"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700 font-semibold flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        Email
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={Email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                    className="input w-full bg-white border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 py-4 px-5 rounded-xl hover:border-orange-300"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700 font-semibold flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    className="input w-full bg-white border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 py-4 px-5 rounded-xl hover:border-orange-300"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700 font-semibold flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Confirm Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setError('');
                                    }}
                                    className="input w-full bg-white border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 py-4 px-5 rounded-xl hover:border-orange-300"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>

                            <button
                                onClick={handleSignUp}
                                disabled={isLoading}
                                className="btn btn-lg border-0 btn-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-300/40 hover:shadow-orange-400/50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-white font-bold py-4 rounded-xl relative overflow-hidden group animate-bounce-gentle"
                            >
                                <span className="relative z-10">
                                    {isLoading ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            {btnText}
                                        </>
                                    ) : (
                                        btnText
                                    )}
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </button>
                            
                            <div className="mt-8 text-center">
                                <p className="text-gray-600 text-sm">
                                    Already a user?
                                    <Link to={'/login'} className="text-orange-500 hover:text-red-500 font-semibold ml-1 transition-colors duration-300 hover:underline">
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