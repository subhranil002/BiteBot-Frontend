import { useEffect, useState, useRef } from "react";
import {
    FaBars,
    FaHome,
    FaSearch,
    FaSignOutAlt,
    FaUser,
    FaUtensils,
    FaHeart,
    FaFire,
    FaSeedling,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ children }) {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const isLoggedIn = false;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e?.preventDefault();
    };

    return (
        <div className="drawer">
            <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                {/* Enhanced Gradient Navbar */}
                <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled 
                    ? 'shadow-2xl shadow-orange-300/20 border-b border-orange-200/50' 
                    : 'shadow-lg shadow-orange-200/10'}`}>
                    <div className={`bg-gradient-to-r from-orange-400/10 via-red-400/10 to-amber-400/10 backdrop-blur-xl transition-all duration-500 ${isScrolled ? 'py-0' : 'py-1'}`}>
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
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse-slow">
                                                    <FaUtensils className="w-5 h-5 text-white" />
                                                </div>
                                                {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full border-2 border-white shadow-sm animate-bounce-gentle"></div> */}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent font-bold text-2xl leading-6">
                                                    BiteBot
                                                </span>
                                                <span className="text-xs text-gray-600 font-normal">Taste the Difference</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {/* Center: Search (desktop only) */}
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
                                                placeholder="Search recipes, ingredients, chefs..."
                                                className="input w-full pl-12 pr-4 py-3 text-sm rounded-2xl transition-all backdrop-blur-sm bg-gray-100 border-2 border-orange-200 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-200/50 hover:border-orange-300 shadow-inner"
                                                aria-label="Search"
                                            />
                                            {/* <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                <kbd className="kbd kbd-sm bg-orange-500 text-white border-0">⌘K</kbd>
                                            </div> */}
                                        </div>
                                    </form>
                                </div>

                                {/* Right: Navigation Icons + User/Login */}
                                <div className="flex items-center gap-3">
                                    {/* Quick Action Icons */}
                                    {/* <div className="hidden md:flex items-center gap-1 mr-4">
                                        <Link to="/trending" className="btn btn-ghost btn-circle text-orange-600 hover:text-red-600 hover:bg-orange-50 transition-all duration-300 tooltip" data-tip="Trending">
                                            <FaFire className="w-5 h-5" />
                                        </Link>
                                        <Link to="/healthy" className="btn btn-ghost btn-circle text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-300 tooltip" data-tip="Healthy">
                                            <FaSeedling className="w-5 h-5" />
                                        </Link>
                                        <Link to="/favorites" className="btn btn-ghost btn-circle text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300 tooltip" data-tip="Favorites">
                                            <FaHeart className="w-5 h-5" />
                                        </Link>
                                    </div> */}

                                    {isLoggedIn ? (
                                        <div className="dropdown dropdown-end">
                                            <label
                                                tabIndex={0}
                                                className="btn btn-ghost btn-circle avatar backdrop-blur-sm bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105"
                                            >
                                                <div className="w-10 rounded-full ring-2 ring-white/30">
                                                    <img
                                                        alt="user avatar"
                                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=user&backgroundColor=ffd5b5,ffb5a7,ff9aa2"
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
                                                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user&backgroundColor=ffd5b5,ffb5a7,ff9aa2" alt="User" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900">John Chef</p>
                                                            <p className="text-xs text-gray-600">Food Enthusiast</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li><Link to="/profile" className="rounded-lg hover:bg-orange-50 transition-colors py-3"><FaUser className="text-orange-500" /> My Profile</Link></li>
                                                <li><Link to="/chat" className="rounded-lg hover:bg-orange-50 transition-colors py-3"><FaUtensils className="text-orange-500" /> Recipe Chat</Link></li>
                                                <li><Link to="/favorites" className="rounded-lg hover:bg-orange-50 transition-colors py-3"><FaHeart className="text-rose-500" /> My Favorites</Link></li>
                                                <li className="border-t border-orange-100 mt-1">
                                                    <button className="text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors py-3">
                                                        <FaSignOutAlt className="inline mr-2" />
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => navigate("/login")}
                                            className="btn m-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-xl shadow-orange-500/40 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-orange-500/50 px-6 animate-bounce-gentle group relative overflow-hidden"
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

            {/* Enhanced Drawer Menu */}
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
                            />
                        </div>
                    </form>

                    {/* Main Navigation */}
                    <nav className="flex flex-col gap-2 mb-8">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Main Menu</h3>
                        <Link
                            to="/"
                            className="btn btn-ghost justify-start rounded-xl backdrop-blur-sm bg-white hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 border border-orange-200 text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-md group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FaHome className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold">Home</span>
                        </Link>

                        <Link
                            to="/chat"
                            className="btn btn-ghost justify-start rounded-xl backdrop-blur-sm bg-white hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 border border-orange-200 text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-md group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FaUtensils className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold">Recipe Chat</span>
                        </Link>

                        <Link
                            to="/trending"
                            className="btn btn-ghost justify-start rounded-xl backdrop-blur-sm bg-white hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 border border-orange-200 text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-md group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FaFire className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold">Trending</span>
                        </Link>

                        <Link
                            to="/healthy"
                            className="btn btn-ghost justify-start rounded-xl backdrop-blur-sm bg-white hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 border border-emerald-200 text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-md group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FaSeedling className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold">Healthy</span>
                        </Link>
                    </nav>

                    {/* Promotional Card */}
                    <div className="mt-auto p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl border-0 shadow-lg text-white">
                        <h3 className="font-bold text-white mb-2">🎉 New Features!</h3>
                        <p className="text-sm text-white/90 mb-3">
                            Try our AI recipe generator and meal planner.
                        </p>
                        <button className="btn btn-sm bg-white text-orange-600 border-0 hover:bg-orange-50 font-bold w-full">
                            Explore Now
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Navbar;