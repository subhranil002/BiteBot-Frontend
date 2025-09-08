import {
    FaEnvelope,
    FaGithub,
    FaHeart,
    FaInstagram,
    FaPlus,
    FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-base-200 text-base-content mt-auto border-t border-base-300">
            <div className="container mx-auto px-4 py-8">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    {/* Links Section */}
                    <nav className="space-y-4">
                        <h3 className="footer-title">Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="link link-hover">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/chat" className="link link-hover">
                                    Recipe Chat
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="link link-hover">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Resources Section */}
                    <nav className="space-y-4">
                        <h3 className="footer-title">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/docs" className="link link-hover">
                                    Docs
                                </Link>
                            </li>
                            <li>
                                <Link to="/support" className="link link-hover">
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="link link-hover">
                                    Privacy
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Social & Newsletter */}
                    <aside className="space-y-4">
                        <h3 className="footer-title">Social & Newsletter</h3>

                        {/* Newsletter signup */}
                        <form
                            className="space-y-2"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <fieldset className="w-full">
                                <label className="label p-0">
                                    <span className="label-text text-sm">
                                        Newsletter
                                    </span>
                                </label>

                                <div className="join">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        onChange={() => {}}
                                        className="input input-bordered join-item w-full text-sm"
                                        required
                                        aria-label="Email address"
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary join-item"
                                        aria-label="Subscribe"
                                    >
                                        <FaEnvelope className="w-4 h-4" />
                                    </button>
                                </div>
                            </fieldset>

                            <p className="text-xs text-secondary">
                                Get recipe updates and cooking tips
                            </p>
                        </form>

                        {/* Social links */}
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="link link-hover p-1"
                                aria-label="Follow us on Twitter"
                            >
                                <FaTwitter className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="link link-hover p-1"
                                aria-label="Follow us on Instagram"
                            >
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="link link-hover p-1"
                                aria-label="View our GitHub"
                            >
                                <FaGithub className="w-4 h-4" />
                            </a>
                        </div>
                    </aside>
                </div>

                {/* Bottom section */}
                <div className="w-full border-t border-base-300 pt-4 flex flex-col md:flex-row items-center justify-center gap-2 text-sm">
                    <p className="flex items-center gap-2">
                        © {new Date().getFullYear()} BiteBot. Made with
                        <FaHeart className="inline w-4 h-4 text-error" />
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
