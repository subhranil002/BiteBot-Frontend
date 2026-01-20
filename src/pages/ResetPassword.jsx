import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import {
  GiChickenLeg,
  GiFruitBowl,
  GiHotMeal,
  GiSushis,
  GiCupcake,
  GiCheeseWedge,
  GiDonerKebab,
  GiMeat,
  GiCorn,
  GiPotato,
  GiCarrot,
  GiOlive,
  GiCoffeeBeans,
  GiCroissant,
  GiGrapes,
} from "react-icons/gi";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log(data);
    reset();
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
      const icon = foodIcons[Math.floor(Math.random() * foodIcons.length)];
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

      {/* Ambient Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-300/30 to-amber-200/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-red-300/30 to-pink-200/30 rounded-full blur-3xl animate-pulse-slow delay-2000" />
      </div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="text-center py-8 border-b border-white/40 bg-gradient-to-r from-orange-500/10 via-amber-300/10 to-red-500/10">
          <div className="mx-auto w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <FiLock className="text-3xl text-orange-500" />
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent animate-gradient-x">
            Reset Password
          </h1>
          <p className="text-gray-600 mt-2 text-sm font-medium px-6">
            Create a strong new password to secure your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* New Password */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                New Password
              </span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
              })}
              className="input input-bordered w-full placeholder-gray-400 text-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="Enter new password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="input input-bordered w-full placeholder-gray-400 text-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="Re-enter password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Back */}
          <div className="text-center mt-4">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors duration-300"
            >
              <FiArrowLeft className="mr-2" />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
