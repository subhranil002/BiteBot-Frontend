import {
    FaCookie,
    FaEnvelope,
    FaFire,
    FaGithub,
    FaHeart,
    FaInstagram,
    FaSeedling,
    FaTwitter,
    FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="mt-auto bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 backdrop-blur-md border-t border-orange-200 shadow-lg">
            <div className="container mx-auto px-4 py-8 xl:py-12">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4 md:col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <FaUtensils className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                    BiteBot
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Taste the Difference
                                </p>
                            </div>
                        </Link>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Your culinary companion for discovering amazing
                            recipes, cooking tips, and creating unforgettable
                            meals.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <FaFire className="text-orange-500" />
                                <span>Trending Recipes</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <FaSeedling className="text-emerald-500" />
                                <span>Healthy Options</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <nav className="space-y-4">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
                            <FaUtensils className="w-4 h-4" />
                            Quick Links
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-600 hover:text-orange-600 transition-all duration-300 flex items-center group font-medium"
                                >
                                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:bg-orange-500 transition-colors duration-300 group-hover:scale-125"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/chat"
                                    className="text-gray-600 hover:text-red-500 transition-all duration-300 flex items-center group font-medium"
                                >
                                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3 group-hover:bg-red-500 transition-colors duration-300 group-hover:scale-125"></span>
                                    Recipe Chat
                                </Link>
                            </li>
                            <li>
                                <span
                                    className="text-gray-600 hover:text-amber-600 transition-all duration-300 flex items-center group font-medium cursor-pointer"
                                >
                                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 group-hover:bg-amber-500 transition-colors duration-300 group-hover:scale-125"></span>
                                    Trending Recipes
                                </span>
                            </li>
                            <li>
                                <span
                                    className="text-gray-600 hover:text-emerald-600 transition-all duration-300 flex items-center group font-medium cursor-pointer"
                                >
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors duration-300 group-hover:scale-125"></span>
                                    Healthy Options
                                </span>
                            </li>
                        </ul>
                    </nav>

                    {/* Resources Section */}
                    <nav className="space-y-4">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                            <FaCookie className="w-4 h-4" />
                            Resources
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    to="/docs"
                                    className="text-gray-600 hover:text-cyan-600 transition-all duration-300 flex items-center group font-medium"
                                >
                                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 group-hover:bg-cyan-500 transition-colors duration-300 group-hover:scale-125"></span>
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-600 hover:text-teal-600 transition-all duration-300 flex items-center group font-medium"
                                >
                                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 group-hover:bg-teal-500 transition-colors duration-300 group-hover:scale-125"></span>
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="text-gray-600 hover:text-violet-600 transition-all duration-300 flex items-center group font-medium"
                                >
                                    <span className="w-2 h-2 bg-violet-400 rounded-full mr-3 group-hover:bg-violet-500 transition-colors duration-300 group-hover:scale-125"></span>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center group font-medium"
                                >
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:bg-indigo-500 transition-colors duration-300 group-hover:scale-125"></span>
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Newsletter & Social */}
                    <aside className="space-y-4 md:col-span-2 lg:col-span-1">
                        {/* <h3 className="text-lg font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent flex items-center gap-2">
                            <FaEnvelope className="w-4 h-4" />
                            Stay Connected
                        </h3> */}

                        {/* Newsletter signup */}
                        {/* <form
                            className="space-y-3"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <fieldset className="w-full">
                                <label className="label p-0 mb-2">
                                    <span className="label-text text-sm text-gray-600 font-medium">
                                        Get weekly recipe inspiration
                                    </span>
                                </label>

                                <div className="flex flex-col lg:flex-row gap-3">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        onChange={() => { }}
                                        className="flex-grow bg-white border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 py-3 px-4 rounded-xl text-sm shadow-inner hover:border-orange-300"
                                        required
                                        aria-label="Email address"
                                    />
                                    <button
                                        type="submit"
                                        className="btn bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-0 text-white py-3 px-4 lg:px-3 mr-1 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-orange-300/40 whitespace-nowrap lg:w-auto w-full flex items-center justify-center gap-2"
                                        aria-label="Subscribe to newsletter"
                                    >
                                        <FaEnvelope className="w-4 h-4" />
                                        <span className="lg:inline">Subscribe</span>
                                    </button>
                                </div>
                            </fieldset>
                        </form> */}

                        {/* Social links */}
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600 font-medium">
                                Follow us
                            </p>
                            <div className="flex gap-3 justify-center lg:justify-start">
                                <a
                                    href="#"
                                    className="p-3 bg-white backdrop-blur-sm rounded-xl border-2 border-orange-200 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                                    aria-label="Follow us on Twitter"
                                >
                                    <FaTwitter className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                                </a>
                                <a
                                    href="#"
                                    className="p-3 bg-white backdrop-blur-sm rounded-xl border-2 border-pink-200 hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                                    aria-label="Follow us on Instagram"
                                >
                                    <FaInstagram className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                                </a>
                                <a
                                    href="#"
                                    className="p-3 bg-white backdrop-blur-sm rounded-xl border-2 border-gray-300 hover:bg-gray-800 hover:border-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                                    aria-label="View our GitHub"
                                >
                                    <FaGithub className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Bottom section */}
                <div className="w-full border-t border-orange-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm w-full md:w-auto">
                        <p className="flex items-center gap-2 text-gray-600 font-medium">
                            © {new Date().getFullYear()} BiteBot. Crafted with
                            <FaHeart className="inline w-4 h-4 text-red-500 animate-pulse" />
                            for food lovers
                        </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm flex-wrap justify-center w-full md:w-auto">
                        <Link
                            to="/privacy"
                            className="text-gray-500 hover:text-orange-600 transition-colors duration-300 font-medium"
                        >
                            Privacy
                        </Link>
                        <Link
                            to="/terms"
                            className="text-gray-500 hover:text-orange-600 transition-colors duration-300 font-medium"
                        >
                            Terms
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-500 hover:text-orange-600 transition-colors duration-300 font-medium"
                        >
                            Contact
                        </Link>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 opacity-20"></div>
            </div>
        </footer>
    );
}

export default Footer;