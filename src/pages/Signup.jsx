import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import cuisines from "../data/cuisines.json"
import dietaryPreferences from "../data/dietaryPreferences.json";

import {
    GiChickenLeg, GiFruitBowl, GiHotMeal, GiSushis, GiCupcake, GiCheeseWedge,
    GiDonerKebab, GiMeat, GiCorn, GiPotato, GiCarrot, GiOlive,
    GiCoffeeBeans, GiCroissant, GiGrapes
} from "react-icons/gi";
import { FiUpload } from "react-icons/fi";

const SignUp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch, control } = useForm();
    const password = watch("password");

    // Floating icons setup
    const foodIcons = [
        <GiChickenLeg className="text-amber-500" />,
        <GiFruitBowl className="text-red-400" />,
        <GiHotMeal className="text-orange-500" />,
        <GiSushis className="text-rose-500" />,
        <GiCupcake className="text-pink-400" />,
        <GiCheeseWedge className="text-yellow-400" />,
        <GiDonerKebab className="text-amber-600" />,
        <GiMeat className="text-red-500" />,
        <GiCorn className="text-yellow-500" />,
        <GiPotato className="text-amber-700" />,
        <GiCarrot className="text-orange-600" />,
        <GiOlive className="text-emerald-500" />,
        <GiCoffeeBeans className="text-brown-500" />,
        <GiCroissant className="text-amber-400" />,
        <GiGrapes className="text-purple-400" />
    ];

    const floatingIconsRef = useRef(
        Array.from({ length: 40 }, (_, i) => {
            const icon = foodIcons[Math.floor(Math.random() * foodIcons.length)];
            const left = Math.random() * 100;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 5;
            const size = Math.random() * 22 + 14;
            const opacity = Math.random() * 0.6 + 0.3;
            return (
                <div
                    key={i}
                    className="absolute animate-float"
                    style={{
                        left: `${left}%`,
                        top: "100vh",
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                        fontSize: `${size}px`,
                        opacity,
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
                    }}
                >
                    {icon}
                </div>
            );
        })
    );

    const onSubmit = async (data) => {
        const signupData = {
            ...data,
            profile: {
                name: data.username,
                avatar: data.avatar?.[0] || null
            }
        };
        console.log("Signup data:", signupData);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
            {/* Floating icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingIconsRef.current}
            </div>

            {/* Glowing blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-300/30 to-amber-200/40 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-red-300/30 to-pink-200/30 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden">
                <div className="text-center py-10 border-b border-white/40 bg-gradient-to-r from-orange-500/10 via-amber-300/10 to-red-500/10">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent animate-gradient-x">
                        Create Account
                    </h1>
                    <p className="text-gray-600 mt-2 text-sm font-medium">Join the Loda community</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="space-y-6">
                        {/* Avatar */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Profile Avatar
                            </label>
                            <Controller
                                control={control}
                                name="avatar"
                                defaultValue={null}
                                render={({ field }) => {
                                    const file = field.value?.[0];
                                    const previewUrl = file ? URL.createObjectURL(file) : null;

                                    return (
                                        <div className="flex flex-col items-center">
                                            {/* Preview */}
                                            {previewUrl ? (
                                                <div className="relative group">
                                                    <img
                                                        src={previewUrl}
                                                        alt="Avatar preview"
                                                        className="w-24 h-24 rounded-full object-cover border-4 border-orange-300 shadow-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => field.onChange(null)} // clear file
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-200 to-red-200 border-4 border-orange-100 shadow-lg">
                                                    <FiUpload className="text-orange-400 text-2xl" />
                                                </div>
                                            )}

                                            {/* Upload Button */}
                                            <label className="cursor-pointer mt-3">
                                                <div className="px-4 py-2 rounded-xl border border-orange-300 text-orange-500 font-semibold hover:bg-orange-50 hover:border-orange-400 transition-all duration-300">
                                                    {previewUrl ? "Change Avatar" : "Upload Avatar"}
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const files = e.target.files;
                                                        if (files && files[0]) {
                                                            field.onChange(files);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    );
                                }}
                            />
                        </div>


                        {/* Username */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                {...register("username", { required: "Username is required" })}
                                className="w-full rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 py-3 px-4 outline-none transition-all duration-300"
                                placeholder="Enter username"
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 py-3 px-4 outline-none transition-all duration-300"
                                placeholder="Enter email"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6">
                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                className="w-full rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 py-3 px-4 outline-none transition-all duration-300"
                                placeholder="Enter password"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Please confirm password",
                                    validate: (v) => v === password || "Passwords do not match"
                                })}
                                className="w-full rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 py-3 px-4 outline-none transition-all duration-300"
                                placeholder="Confirm password"
                            />
                        </div>

                        {/* Cuisine */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Favorite Cuisine</label>
                            <select
                                {...register("cuisine")}
                                className="w-full rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 py-3 px-4 outline-none transition-all duration-300"
                            >
                                <option value="">Select cuisine</option>
                                {cuisines.map((cuisine) => (
                                    <option key={cuisine.toLowerCase()} value={cuisine.toLowerCase()}>
                                        {cuisine}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Dietary Preferences */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Dietary Preferences</label>
                            <div className="flex flex-wrap gap-3">
                                {dietaryPreferences.map((pref) => (
                                    <label key={pref} className="flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            value={pref}
                                            {...register("dietaryLabels")}
                                            className="accent-orange-500"
                                        />
                                        <span className="capitalize">{pref}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2 mt-6">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                        >
                            <span className="relative z-10">Sign Up</span>
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Already a user?{" "}
                            <Link to="/login" className="text-orange-500 font-semibold hover:text-red-500 transition-colors duration-300">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
