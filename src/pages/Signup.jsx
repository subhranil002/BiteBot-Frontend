import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
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
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { registerUser } from "../redux/slices/authSlice";

const cuisines = [
  "indian",
  "italian",
  "chinese",
  "mexican",
  "thai",
  "japanese",
  "french",
  "mediterranean",
  "american",
  "korean",
  "vietnamese",
  "middle-eastern",
  "british",
  "spanish",
  "german",
  "greek",
];

const dietaryPreferences = [
  "vegetarian",
  "vegan",
  "keto",
  "paleo",
  "gluten-free",
  "dairy-free",
  "low-carb",
  "high-protein",
  "sugar-free",
  "organic",
  "raw",
  "mediterranean",
  "low-fat",
];

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm();
  const password = watch("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { isLoggedIn } = useSelector((state) => state.auth);
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
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
          }}
        >
          {icon}
        </div>
      );
    })
  );

  const onSubmit = async (data) => {
    const res = await dispatch(registerUser(data));
    if (res?.payload?.success) navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn]);

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
          <p className="text-gray-600 mt-2 text-sm font-medium">
            Sign up and make every meal a masterpiece!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
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
                rules={{ required: "Profile picture is required" }}
                render={({ field, fieldState: { error } }) => {
                  const file = field.value?.[0];
                  const previewUrl = file ? URL.createObjectURL(file) : null;

                  return (
                    <div className="flex flex-col items-center">
                      {previewUrl ? (
                        <div className="relative group">
                          <img
                            src={previewUrl}
                            alt="Avatar preview"
                            className="w-24 h-24 rounded-full object-cover border-4 border-orange-300 shadow-lg"
                          />
                          <button
                            type="button"
                            onClick={() => field.onChange(null)}
                            className="absolute -top-2 -right-2 btn btn-xs btn-error opacity-0 group-hover:opacity-100"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-200 to-red-200 border-4 border-orange-100 shadow-lg">
                          <FiUpload className="text-orange-400 text-2xl" />
                        </div>
                      )}

                      <label className="mt-3 cursor-pointer">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp"
                          className="hidden"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files[0]) field.onChange(files);
                          }}
                        />
                        <span className="btn btn-outline btn-sm mt-2">
                          {previewUrl ? "Change Avatar" : "Upload Avatar"}
                        </span>
                      </label>

                      {error && (
                        <p className="text-red-500 text-xs mt-1">
                          {error.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </div>

            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("profile_name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="input input-bordered w-full focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
              {errors.profile_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.profile_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                className="input input-bordered w-full focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                    message:
                      "Must include uppercase, number, and special character",
                  },
                })}
                className="input input-bordered w-full focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
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
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm password",
                  validate: (v) => v === password || "Passwords do not match",
                })}
                className="input input-bordered w-full focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Cuisine */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Favorite Cuisine
                </span>
              </label>
              <select
                {...register("profile_cuisine", {
                  required: "Cuisine is required",
                })}
                className="select select-bordered w-full capitalize focus:outline-none focus:shadow-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 border-gray-200"
              >
                <option value="">Select cuisine</option>
                {cuisines.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.profile_cuisine && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.profile_cuisine.message}
                </p>
              )}
            </div>

            {/* Dietary Preferences */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Dietary Preferences
                </span>
              </label>
              <div className="flex flex-wrap gap-3">
                {dietaryPreferences.map((pref) => (
                  <label
                    key={pref}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      value={pref}
                      {...register("profile_dietaryLabels")}
                      className="checkbox accent-orange-500"
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
              className="btn w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              disabled={isSubmitting}
            >
              <span className="relative z-10">
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already a user?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-semibold hover:text-red-500 transition-colors duration-300"
              >
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
