import { useEffect, useState, useRef } from "react";
import {
    FaBars,
    FaHome,
    FaMoon,
    FaSearch,
    FaSignOutAlt,
    FaSun,
    FaUser,
    FaUtensils,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ children }) {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(
        typeof window !== "undefined"
            ? localStorage.getItem("site-theme") || "dark"
            : "light"
    );
    const isLoggedIn = false;

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("site-theme", theme);
    }, [theme]);

    const handleSearch = (e) => {
        e?.preventDefault();
    };

    // Dynamic text colors
    const textClass = theme === "light" ? "text-gray-900" : "text-white";
    const subTextClass = theme === "light" ? "text-gray-700" : "text-white/70";
    const linkHover = theme === "light" ? "hover:bg-black/5" : "hover:bg-white/10";

    return (
        <div className="drawer">
            <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                {/* Glassy Gradient Navbar */}
                <header className="sticky top-0 z-50 border-b border-white/20 shadow-lg shadow-purple-500/20">
                    <div className="bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-indigo-500/20 backdrop-blur-xl">
                        <div className="container mx-auto px-4 md:px-8">
                            <div className="navbar h-14 md:h-16">
                                {/* Left: Logo + Menu */}
                                <div className="flex-1 flex items-center gap-3">
                                    <label
                                        htmlFor="navbar-drawer"
                                        className="btn btn-ghost btn-square backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20"
                                        aria-label="Open menu"
                                    >
                                        <FaBars
                                            className={`w-5 h-5 ${theme === "light" ? "text-gray-700" : "text-white/80"
                                                }`}
                                        />
                                    </label>

                                    <Link
                                        to="/"
                                        className="btn btn-ghost normal-case text-xl font-bold  hover:bg-white/20 rounded-xl"
                                        aria-label="BiteBot home"
                                    >
                                        <div className={`flex items-center gap-2 ${textClass}`}>
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-md">
                                                <FaUser className="w-4 h-4 text-white" />
                                            </div>
                                            BiteBot
                                        </div>
                                    </Link>
                                </div>

                                {/* Center: Search (desktop only) */}
                                <div className="flex-1 hidden md:flex justify-center">
                                    <form
                                        onSubmit={handleSearch}
                                        className="w-full max-w-xl"
                                        role="search"
                                    >
                                        <div className="relative">
                                            <FaSearch
                                                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === "light" ? "text-gray-900" : "text-white/60"
                                                    }`}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Search recipes"
                                                className={`input w-full pl-10 pr-4 py-2 text-sm rounded-xl transition-all backdrop-blur-sm
                                                    ${theme === "light"
                                                        ? "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-400 focus:ring-purple-300"
                                                        : "bg-white/15 border border-white/30 text-white placeholder-white/70 focus:border-purple-400 focus:ring-purple-400/30"
                                                    }`}
                                                aria-label="Search"
                                            />
                                        </div>
                                    </form>
                                </div>

                                {/* Right: Theme toggle + User/Login */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            setTheme((t) =>
                                                t === "light" ? "dark" : "light"
                                            )
                                        }
                                        className="btn btn-ghost btn-circle backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20"
                                    >
                                        {theme === "light" ? (
                                            <FaMoon className="w-5 h-5 text-gray-700" />
                                        ) : (
                                            <FaSun className="w-5 h-5 text-yellow-300" />
                                        )}
                                    </button>

                                    {isLoggedIn ? (
                                        <div className="dropdown dropdown-end">
                                            <label
                                                tabIndex={0}
                                                className="btn btn-ghost btn-circle avatar backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20"
                                            >
                                                <div className="w-10 rounded-full ring ring-purple-400/50">
                                                    <img
                                                        alt="user avatar"
                                                        src="https://api.dicebear.com/7.x/thumbs/svg?seed=user"
                                                    />
                                                </div>
                                            </label>
                                            <ul
                                                tabIndex={0}
                                                className={`menu menu-sm dropdown-content rounded-xl mt-3 w-56 p-2 shadow-lg shadow-purple-500/20 border border-white/20 backdrop-blur-xl
                                                    ${theme === "light"
                                                        ? "bg-white/90 text-gray-900"
                                                        : "bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-indigo-500/20 text-white"
                                                    }`}
                                            >
                                                <li>
                                                    <Link to="/profile" className="rounded-lg hover:bg-white/10">Profile</Link>
                                                </li>
                                                <li>
                                                    <Link to="/chat" className="rounded-lg hover:bg-white/10">Recipe Chat</Link>
                                                </li>
                                                <li>
                                                    <Link to="/favorites" className="rounded-lg hover:bg-white/10">Favorites</Link>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() => { }}
                                                        className="text-red-400 hover:text-red-500 rounded-lg hover:bg-white/10"
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
                                            className="btn bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold shadow-md shadow-purple-500/30 rounded-xl backdrop-blur-sm"
                                        >
                                            Login
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
            <div className="drawer-side mt-15">
                <label htmlFor="navbar-drawer" className="drawer-overlay"></label>
                <aside
                    className={`menu p-4 w-80 shadow-xl backdrop-blur-xl border-r border-white/20
                        ${theme === "light"
                            ? "bg-white/90 text-gray-900"
                            : "bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-indigo-500/20 text-white"
                        }`}
                >
                    {/* Mobile Search */}
                    <form
                        onSubmit={handleSearch}
                        className="mb-4 md:hidden"
                        role="search"
                    >
                        <div className="relative">
                            <FaSearch
                                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === "light" ? "text-gray-900" : "text-white/60"
                                    }`}
                            />


                            <input
                                type="text"
                                placeholder="Search recipes"
                                className={`input w-full pl-10 rounded-xl backdrop-blur-sm ${theme === "light"
                                    ? "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-400 focus:ring-purple-300"
                                    : "bg-white/15 border border-white/30 text-white placeholder-white/70 focus:border-purple-400 focus:ring-purple-400/30"
                                    }`}
                            />
                        </div>
                    </form>

                    {/* Nav links */}
                    <nav className="flex flex-col gap-2">
                        <Link
                            to="/"
                            className={`btn btn-ghost justify-start rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 ${textClass}`}
                        >
                            <FaHome className="mr-3" />
                            Home
                        </Link>

                        <Link
                            to="/chat"
                            className={`btn btn-ghost justify-start rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 ${textClass}`}
                        >
                            <FaUtensils className="mr-3" />
                            Recipe Chat
                        </Link>

                        <Link
                            to="/about"
                            className={`btn btn-ghost justify-start rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 ${textClass}`}
                        >
                            About
                        </Link>
                    </nav>
                </aside>
            </div>
        </div>
    );
}

export default Navbar;