// import { useState } from "react";
import {
  FaBars,
  FaFire,
  FaHeart,
  FaHome,
//   FaSearch,
  FaSeedling,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../redux/slices/authSlice";

function Navbar({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
  const { userData, isLoggedIn, role } = useSelector((state) => state.auth);

//   const handleSearch = (e) => {
//     e?.preventDefault();
//     if (!searchTerm.trim()) return;
//     navigate(`/search?q=${searchTerm.trim()}`);
//   };

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
                          Taste the Difference
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Center: Search */}
                {/* <div className="flex-1 hidden lg:flex justify-center">
                  <form
                    onSubmit={handleSearch}
                    className="w-full max-w-xl"
                    role="search"
                  >
                    <div className="relative group">
                      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 transition-all duration-300 group-focus-within:scale-110" />
                      <input
                        type="text"
                        placeholder="Search recipes, ingredients, chefs..."
                        className="input w-full pl-12 pr-4 py-3 text-sm rounded-2xl transition-all backdrop-blur-sm bg-gray-100 border-2 border-orange-200 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-200/50 hover:border-orange-300 shadow-inner"
                        aria-label="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </form>
                </div> */}

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
                            to={`/profile/${userData?._id}`}
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
                            to={`/profile/${userData?._id}/favorites`}
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

      {/* Drawer Menu */}
      <div className="drawer-side z-50">
        <label htmlFor="navbar-drawer" className="drawer-overlay"></label>
        <aside className="menu p-6 w-80 min-h-full shadow-2xl backdrop-blur-xl border-r border-orange-200 bg-gradient-to-b from-white to-orange-50/30 text-gray-900">
          {/* Drawer Header */}
          <div className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
              <FaUtensils className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                BiteBot
              </h2>
              <p className="text-xs text-gray-600">Culinary Companion</p>
            </div>
          </div>

          {/* Mobile Search */}
          {/* <form
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
          </form> */}

          {/* Main Navigation */}
          <nav className="flex flex-col gap-3 mb-8">
            {/* Header */}
            <div className="px-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Main Menu
              </h3>
            </div>

            {/* Navigation Links */}
            <Link
              to="/"
              className="btn btn-ghost btn-lg justify-start rounded-box bg-base-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 border border-orange-200 text-base-content transition-all duration-300 group shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <FaHome className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-base">Home</span>
            </Link>

            <Link
              to="/trending"
              className="btn btn-ghost btn-lg justify-start rounded-box bg-base-100 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 border border-red-200 text-base-content transition-all duration-300 group shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <FaFire className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-base">Trending</span>
            </Link>

            <Link
              to="/healthy"
              className="btn btn-ghost btn-lg justify-start rounded-box bg-base-100 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 border border-emerald-200 text-base-content transition-all duration-300 group shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <FaSeedling className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-base">Healthy</span>
            </Link>
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default Navbar;
