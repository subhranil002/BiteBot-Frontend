import { useEffect, useState } from "react";
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

    return (
        <div className="drawer">
            <input
                id="navbar-drawer"
                type="checkbox"
                className="drawer-toggle"
            />

            <div className="drawer-content">
                <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-sm border-b border-base-200 shadow-sm">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="navbar h-14 md:h-16">
                            <div className="flex-1 flex items-center gap-3">
                                <label
                                    htmlFor="navbar-drawer"
                                    className="btn btn-ghost btn-square"
                                    aria-label="Open menu"
                                >
                                    <FaBars className="w-5 h-5" />
                                </label>

                                <Link
                                    to="/"
                                    className="btn btn-ghost normal-case text-xl font-bold"
                                    aria-label="BiteBot home"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                            <FaUser className="w-4 h-4" />
                                        </div>
                                        BiteBot
                                    </div>
                                </Link>
                            </div>

                            <div className="flex-1 hidden md:flex justify-center">
                                <form
                                    onSubmit={handleSearch}
                                    className="w-full max-w-xl"
                                    role="search"
                                >
                                    <div className="relative">
                                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search recipes"
                                            className="input input-bordered w-full pl-10 pr-4 py-2 text-sm transition-shadow"
                                            aria-label="Search"
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        setTheme((t) =>
                                            t === "light" ? "dark" : "light"
                                        )
                                    }
                                    className="btn btn-ghost btn-circle"
                                >
                                    {theme === "light" ? (
                                        <FaMoon className="w-4 h-4" />
                                    ) : (
                                        <FaSun className="w-4 h-4" />
                                    )}
                                </button>

                                {isLoggedIn ? (
                                    <div className="dropdown dropdown-end">
                                        <label
                                            tabIndex={0}
                                            className="btn btn-ghost btn-circle avatar"
                                        >
                                            <div className="w-10 rounded-full">
                                                <img
                                                    alt="user avatar"
                                                    src="https://api.dicebear.com/7.x/thumbs/svg?seed=user"
                                                />
                                            </div>
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-2 shadow"
                                        >
                                            <li>
                                                <Link to="/profile">
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/chat">
                                                    Recipe Chat
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/favorites">
                                                    Favorites
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => {}}
                                                    className="text-error"
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
                                        className="btn btn-primary"
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
                {children}
            </div>

            <div className="drawer-side mt-15">
                <label
                    htmlFor="navbar-drawer"
                    className="drawer-overlay"
                ></label>
                <aside className="menu p-4 w-80 bg-base-200">
                    <form
                        onSubmit={handleSearch}
                        className="mb-4 md:hidden"
                        role="search"
                    >
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search recipes"
                                className="input input-bordered w-full pl-10"
                            />
                        </div>
                    </form>

                    <nav className="flex flex-col gap-1">
                        <label
                            htmlFor="navbar-drawer"
                            className="btn btn-ghost justify-start"
                        >
                            <Link to="/" className="flex items-center w-full">
                                <FaHome className="mr-3" />
                                Home
                            </Link>
                        </label>

                        <label
                            htmlFor="navbar-drawer"
                            className="btn btn-ghost justify-start"
                        >
                            <Link
                                to="/chat"
                                className="flex items-center w-full"
                            >
                                <FaUtensils className="mr-3" />
                                Recipe Chat
                            </Link>
                        </label>
                        <label
                            htmlFor="navbar-drawer"
                            className="btn btn-ghost justify-start"
                        >
                            <Link
                                to="/about"
                                className="flex items-center w-full"
                            >
                                About
                            </Link>
                        </label>
                    </nav>
                </aside>
            </div>
        </div>
    );
}

export default Navbar;
