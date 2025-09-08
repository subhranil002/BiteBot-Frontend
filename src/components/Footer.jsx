import {
    FaEnvelope,
    FaGithub,
    FaHeart,
    FaInstagram,
    FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="mt-auto bg-gradient-to-br from-purple-500/10 via-blue-400/10 to-indigo-600/10 backdrop-blur-md border-t border-base-content/20">
            <div className="container mx-auto px-4 py-8">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    {/* Links Section */}
                    <nav className="space-y-4">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-base-content/80 hover:text-purple-500 transition-colors duration-300 flex items-center group">
                                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 group-hover:bg-purple-500 transition-colors duration-300"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/chat" className="text-base-content/80 hover:text-blue-500 transition-colors duration-300 flex items-center group">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 group-hover:bg-blue-500 transition-colors duration-300"></span>
                                    Recipe Chat
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-base-content/80 hover:text-indigo-500 transition-colors duration-300 flex items-center group">
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 group-hover:bg-indigo-500 transition-colors duration-300"></span>
                                    About
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Resources Section */}
                    <nav className="space-y-4">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/docs" className="text-base-content/80 hover:text-cyan-500 transition-colors duration-300 flex items-center group">
                                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 group-hover:bg-cyan-500 transition-colors duration-300"></span>
                                    Docs
                                </Link>
                            </li>
                            <li>
                                <Link to="/support" className="text-base-content/80 hover:text-teal-500 transition-colors duration-300 flex items-center group">
                                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 group-hover:bg-teal-500 transition-colors duration-300"></span>
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-base-content/80 hover:text-violet-500 transition-colors duration-300 flex items-center group">
                                    <span className="w-2 h-2 bg-violet-400 rounded-full mr-2 group-hover:bg-violet-500 transition-colors duration-300"></span>
                                    Privacy
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Social & Newsletter */}
                    <aside className="space-y-4">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">Stay Connected</h3>

                        {/* Newsletter signup */}
                        <form
                            className="space-y-2"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <fieldset className="w-full">
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-sm text-base-content/80">
                                        Get recipe updates and cooking tips
                                    </span>
                                </label>

                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        onChange={() => {}}
                                        className="flex-grow bg-base-content/10 border border-base-content/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all duration-300 text-base-content placeholder-base-content/70 backdrop-blur-sm py-2 px-4 rounded-xl text-sm"
                                        required
                                        aria-label="Email address"
                                    />
                                    <button
                                        type="submit"
                                        className="btn bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0 text-white p-2 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                        aria-label="Subscribe"
                                    >
                                        <FaEnvelope className="w-4 h-4" />
                                    </button>
                                </div>
                            </fieldset>
                        </form>

                        {/* Social links */}
                        <div className="flex gap-3 mt-4">
                            <a
                                href="#"
                                className="p-2 bg-base-content/10 backdrop-blur-sm rounded-full border border-base-content/20 hover:bg-purple-500/30 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
                                aria-label="Follow us on Twitter"
                            >
                                <FaTwitter className="w-4 h-4 text-base-content" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-base-content/10 backdrop-blur-sm rounded-full border border-base-content/20 hover:bg-pink-500/30 hover:border-pink-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
                                aria-label="Follow us on Instagram"
                            >
                                <FaInstagram className="w-4 h-4 text-base-content" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-base-content/10 backdrop-blur-sm rounded-full border border-base-content/20 hover:bg-base-content/30 hover:border-base-content/50 transition-all duration-300 transform hover:-translate-y-0.5"
                                aria-label="View our GitHub"
                            >
                                <FaGithub className="w-4 h-4 text-base-content" />
                            </a>
                        </div>
                    </aside>
                </div>

                {/* Bottom section */}
                <div className="w-full border-t border-base-content/20 pt-4 flex flex-col md:flex-row items-center justify-center gap-2 text-sm">
                    <p className="flex items-center gap-2 text-base-content/70">
                        © {new Date().getFullYear()} BiteBot. Made with
                        <FaHeart className="inline w-4 h-4 text-purple-500 animate-pulse" />
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;