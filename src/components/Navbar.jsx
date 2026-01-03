import { useState } from "react";
import {
  FaBars,
  FaBolt,
  FaCrown,
  FaEnvelope,
  FaFire,
  FaHeart,
  FaHome,
  FaSearch,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import { GiHerbsBundle } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { logout } from "../redux/slices/authSlice";

function Navbar({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [searchTerm, setSearchTerm] = useState("");
  const { userData, isLoggedIn, role } = useSelector((state) => state.auth);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${searchTerm.trim()}`);
  };

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/login");
  };

  function modifyCloudinaryURL(url) {
    if (url === "" || url === null) return "";
    if (import.meta.env.VITE_IMAGE_TRANSFORMATION === "true") {
      return url.replace(
        "/upload/",
        "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
      );
    }
    return url;
  }

  return (
    <div className="drawer">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <header
          className="sticky top-0 z-50 transition-all duration-50
                            shadow-lg shadow-orange-200/10"
        >
          <div className="bg-gradient-to-r from-orange-400/10 via-red-400/10 to-amber-400/10 backdrop-blur-xl transition-all duration-500 py-1">
            <div className="container mx-auto px-4 md:px-8">
              <div className="navbar h-16 md:h-18">
                {/* Left: Logo + Menu */}
                <div className="flex-1 flex items-center gap-3">
                  <label
                    htmlFor="navbar-drawer"
                    className="btn btn-ghost btn-square backdrop-blur-sm bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/40"
                    aria-label="Open menu"
                  >
                    <FaBars className="w-5 h-5" />
                  </label>

                  <Link
                    to="/"
                    className="m-3 normal-case text-xl font-bold hover:bg-orange-50/50 rounded-xl transition-all duration-300 group"
                    aria-label="BiteBot home"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent font-bold text-2xl leading-6">
                          BiteBot
                        </span>
                        <span className="text-xs text-gray-600 font-normal">
                          Discover. Cook. Impress. Repeat
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Center: Search */}
                <div className="flex-1 hidden lg:flex justify-center">
                  <form
                    onSubmit={handleSearch}
                    className="w-full max-w-xl"
                    role="search"
                  >
                    <div className="relative group">
                      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 transition-all duration-300 group-focus-within:scale-110" />
                      <input
                        type="text"
                        placeholder="Search recipes, chefs..."
                        className="input w-full pl-12 pr-4 py-3 text-sm rounded-2xl transition-all backdrop-blur-sm bg-gray-100 border-2 border-orange-200 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-200/50 hover:border-orange-300 shadow-inner"
                        aria-label="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </form>
                </div>

                {/* Right: User / Login */}
                <div className="ml-4 flex items-center gap-3">
                  {isLoggedIn ? (
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar backdrop-blur-sm bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105"
                      >
                        <div className="w-10 rounded-full ring-2 ring-white/30">
                          <img
                            alt="Profile Avatar"
                            src={modifyCloudinaryURL(
                              userData?.profile?.avatar?.secure_url || ""
                            )}
                          />
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content rounded-2xl mt-3 w-64 p-3 shadow-2xl shadow-orange-300/30 border border-orange-200 backdrop-blur-xl bg-white/95 text-gray-900 space-y-1"
                      >
                        <li className="p-2 border-b border-orange-100">
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500">
                                <img
                                  alt="Profile Avatar"
                                  src={modifyCloudinaryURL(
                                    userData?.profile?.avatar?.secure_url || ""
                                  )}
                                />
                              </div>
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">
                                {userData?.profile?.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                {userData?.email}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <Link
                            to={`/profile/${userData?._id.toString()}`}
                            className="rounded-lg hover:bg-orange-50 transition-colors py-3"
                          >
                            <FaUser className="text-orange-500" /> My Profile
                          </Link>
                        </li>
                        {role === "CHEF" && (
                          <li>
                            <Link
                              to="/dashboard"
                              className="rounded-lg hover:bg-orange-50 transition-colors py-3"
                            >
                              <FaTachometerAlt className="text-orange-500" />{" "}
                              Dashboard
                            </Link>
                          </li>
                        )}
                        <li>
                          <Link
                            to="/chat"
                            className="rounded-lg hover:bg-orange-50 transition-colors py-3"
                          >
                            <FaUtensils className="text-orange-500" /> Recipe
                            Chat
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/profile/${userData?._id.toString()}/favourites`}
                            className="rounded-lg hover:bg-orange-50 transition-colors py-3"
                          >
                            <FaHeart className="text-rose-500" /> My Favorites
                          </Link>
                        </li>
                        <li className="border-t border-orange-100 mt-1">
                          <button
                            onClick={handleLogout}
                            className="text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors py-3 w-full text-left"
                          >
                            <FaSignOutAlt className="inline mr-2" />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="btn m-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-xl shadow-orange-500/40 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:shadow-orange-500/50 px-6 animate-bounce-gentle group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <FaUser className="w-4 h-4" />
                        Login
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {children}
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="navbar-drawer" className="drawer-overlay"></label>
        <aside className="menu p-6 w-80 min-h-full shadow-2xl backdrop-blur-xl border-r border-orange-200 bg-gradient-to-b from-white to-orange-50/30 text-gray-900 flex flex-col justify-between">
          {/* Drawer Header */}
          <div>
            <div className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-200">
              <div className="w-12 h-12 rounded-4xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 border-2 border-orange-500">
                <img
                  src="https://sojkuuzpt346czem.public.blob.vercel-storage.com/Gemini_Generated_Image_is5dc8is5dc8is5d.png"
                  alt="Bite Bot"
                />
              </div>
              <div>
                <h2 className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  BiteBot
                </h2>
                <p className="text-xs text-gray-600">
                  Discover. Cook. Impress. Repeat
                </p>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex flex-col gap-3 mb-8">
              <div className="px-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Main Menu
                </h3>
              </div>

              {/* Mobile Search */}
              <form
                onSubmit={handleSearch}
                className="mb-6 lg:hidden"
                role="search"
              >
                <div className="relative group">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                  <input
                    type="text"
                    placeholder="Search delicious recipes..."
                    className="input w-full pl-12 rounded-xl backdrop-blur-sm bg-white border-2 border-orange-200 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 shadow-inner"
                    aria-label="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>

              {/* Navigation Links */}
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="btn btn-ghost btn-lg justify-start rounded-box bg-base-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 border border-orange-200 text-base-content transition-all duration-300 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <FaHome className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-base">Home</span>
              </Link>
              {isHome && (
                <>
                  <button
                    onClick={() => handleScroll("trending")}
                    className="btn btn-ghost btn-lg justify-start rounded-box bg-base-100 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 border border-red-200 text-base-content transition-all duration-300 group shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <FaFire className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-base">Trending</span>
                  </button>

                  {/* 🌿 Fresh & New */}
                  <button
                    onClick={() => handleScroll("fresh")}
                    className="btn btn-ghost btn-lg justify-start items-center gap-3 rounded-box bg-base-100 hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50 border border-sky-200 text-base-content transition-all duration-300 group shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <GiHerbsBundle className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-base group-hover:text-sky-700 transition-colors duration-300">
                      Fresh & New
                    </span>
                  </button>

                  {/* 👤 Recommended */}
                  <button
                    onClick={() => handleScroll("for-you")}
                    className="btn btn-ghost btn-lg justify-start items-center gap-3 rounded-box bg-base-100 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 border border-pink-200 text-base-content transition-all duration-300 group shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaUser className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-base group-hover:text-pink-700 transition-colors duration-300">
                      Recommended for You
                    </span>
                  </button>

                  {/* ⚡ Quick & Easy */}
                  <button
                    onClick={() => handleScroll("quick")}
                    className="btn btn-ghost btn-lg justify-start items-center gap-3 rounded-box bg-base-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 border border-green-200 text-base-content transition-all duration-300 group shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaBolt className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-base group-hover:text-green-700 transition-colors duration-300">
                      Quick & Easy
                    </span>
                  </button>

                  {/* 👑 Premium Picks */}
                  <button
                    onClick={() => handleScroll("premium")}
                    className="btn btn-ghost btn-lg justify-start items-center gap-3 rounded-box bg-base-100 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 border border-yellow-200 text-base-content transition-all duration-300 group shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaCrown className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-base group-hover:text-yellow-700 transition-colors duration-300">
                      Premium Picks
                    </span>
                  </button>
                </>
              )}
            </nav>
          </div>

          {/* Contact Us */}
          <div className="border-t border-orange-200 pt-4 mt-auto">
            <Link
              to="/contact"
              className="btn btn-ghost btn-lg w-full justify-start items-center gap-3 rounded-box bg-base-100 hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50 border border-sky-200 text-base-content transition-all duration-300 group shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <FaEnvelope className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-base group-hover:text-sky-700 transition-colors duration-300">
                Contact Us
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Navbar;
