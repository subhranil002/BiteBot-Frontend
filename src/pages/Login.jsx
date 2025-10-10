import { useRef } from "react";
import { useForm } from "react-hook-form";
import {
    GiCarrot,
    GiCheeseWedge,
    GiChickenLeg,
    GiCoffeeBeans,
    GiCorn,
    GiCroissant,
    GiCupcake,
    GiDonerKebab,
    GiFruitBowl,
    GiGrapes,
    GiHotMeal,
    GiMeat,
    GiOlive,
    GiPotato,
    GiSushis,
} from "react-icons/gi";
import { Link } from "react-router-dom";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: "Success!" });
            }, 3000);
        });
        console.log("Login data:", data);
    };

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
        <GiGrapes className="text-purple-400" />,
    ];

    const floatingIconsRef = useRef(
        Array.from({ length: 40 }, (_, i) => {
            const icon =
                foodIcons[Math.floor(Math.random() * foodIcons.length)];
            const left = Math.random() * 100;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 5;
            const size = Math.random() * 24 + 16;
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
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    }}
                >
                    {icon}
                </div>
            );
        })
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
            {/* Floating Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingIconsRef.current}
            </div>

            {/* Glowing Blobs (background) */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-300/30 to-amber-200/40 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-red-300/30 to-pink-200/30 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
            </div>

            {/* Glassmorphic Card */}
            <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden animate-fadeIn">
                <div className="text-center py-10 border-b border-white/40 bg-gradient-to-r from-orange-500/10 via-amber-300/10 to-red-500/10">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent animate-gradient-x">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 mt-2 text-sm font-medium">
                        Sign in to your BiteBot account
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-8 space-y-6"
                >
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            className="w-full rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 py-3 px-4 outline-none transition-all duration-300 placeholder-gray-400 text-gray-800"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                    message:
                                        "Must include uppercase, number, and special character",
                                },
                            })}
                            className="w-full rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 py-3 px-4 outline-none transition-all duration-300 placeholder-gray-400 text-gray-800"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                    >
                        <span className="relative z-10">
                            {isSubmitting ? "Logging in..." : "Continue"}
                        </span>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    {/* Links */}
                    <div className="text-center text-sm text-gray-600 mt-6 space-y-2">
                        <p>
                            Don’t have an account?{" "}
                            <Link
                                to="/Signup"
                                className="text-orange-500 font-semibold hover:text-red-500 transition-colors duration-300 hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                        <p>
                            <Link
                                to="/ForgetPassword"
                                className="text-orange-500 font-semibold hover:text-red-500 transition-colors duration-300 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
