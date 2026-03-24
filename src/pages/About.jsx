import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { FaArrowDown, FaCrown, FaHeart, FaLockOpen, FaPlay, FaSearch, FaStar, FaUserFriends } from "react-icons/fa";
import HomeLayout from "../layouts/HomeLayout";

/* =========================================
   1. MAGNETIC BUTTON (Optimized)
   Physics only calculate on hover. Lightweight.
========================================= */
function FeatureCard({ title, desc, icon: Icon, span = "col-span-1", className = "", iconColor = "text-orange-500" }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`p-8 md:p-10 rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group ${span} ${className}`}
        >
            <div>
                <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 border border-gray-100 group-hover:scale-110 transition-transform duration-300 ${iconColor}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    );
}

function MagneticButton({ children }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        // Reduced the pull strength slightly for a tighter feel
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="relative px-10 py-5 rounded-full bg-gray-900 text-white font-bold text-lg uppercase tracking-widest overflow-hidden group shadow-xl"
        >
            <span className="relative z-10">{children}</span>
            {/* High-performance CSS transform hover overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 translate-y-full group-hover:translate-y-[0%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
        </motion.button>
    );
}

/* =========================================
   2. VELOCITY KINETIC TYPOGRAPHY (Optimized)
   Removed mix-blend-mode. Transform-only animations.
========================================= */
function VelocityText({ children }) {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

    // Map scroll speed to a skew degree
    const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [12, -12]);

    return (
        <motion.div style={{ skewY: skewVelocity }} className="origin-center">
            <h1 className="text-[14vw] leading-[0.85] font-black tracking-tighter uppercase text-gray-900">
                {children}
            </h1>
        </motion.div>
    );
}

/* =========================================
   3. MAIN EXPERIMENTAL PAGE (Light Theme)
========================================= */
export default function AboutPage() {
    return (
        <HomeLayout>
            <div className="bg-[#FAFAFA] min-h-screen text-gray-900 overflow-hidden selection:bg-orange-500 selection:text-white">

                <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">

                    {/* HERO KINETIC TEXT */}
                    <div className="min-h-[85vh] flex flex-col justify-center items-center relative">
                        <VelocityText>Zero</VelocityText>
                        <VelocityText>Waste</VelocityText>
                        <VelocityText>Cooking</VelocityText>
                    </div>

                    {/* BRUTALIST GRID + BITEBOT INFO */}
                    <div className="py-32 border-t border-gray-200">

                        {/* Section Header */}
                        <div className="max-w-3xl mb-16">
                            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">
                                The Ecosystem
                            </h2>
                            <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-gray-900">
                                More than a recipe generator. <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-pink-500">
                                    It's a culinary network.
                                </span>
                            </h3>
                        </div>

                        {/* Bento Feature Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">

                            {/* Feature 1: AI Search (Spans 2 columns on large screens) */}
                            <FeatureCard
                                span="md:col-span-2"
                                icon={FaSearch}
                                title="AI Contextual Search"
                                desc="Don't know what to make? Tell BiteBot what ingredients are expiring in your fridge, your macro goals, or your current mood. Our AI synthesizes exact, step-by-step recipes in seconds."
                                className="bg-linear-to-br from-gray-100 to-gray-300 text-white border-none"
                                iconColor="text-black bg-orange/50 border-white/20"
                            />

                            {/* Feature 2: Community Reviews */}
                            <FeatureCard
                                icon={FaStar}
                                title="Review & Refine"
                                desc="Cooked something amazing? Post it. Read reviews from other home chefs, see their modifications, and rate community recipes."
                                iconColor="text-yellow-500"
                            />

                            {/* Feature 3: Digital Cookbook */}
                            <FeatureCard
                                icon={FaHeart}
                                title="Your Digital Vault"
                                desc="Save your favorite AI generations or community posts into custom collections. Never lose that perfect Tuesday night pasta recipe again."
                                iconColor="text-pink-500"
                            />

                            {/* Feature 4: Premium Creator Economy (Spans 2 columns) */}
                            <div className="md:col-span-2 lg:col-span-2 relative overflow-hidden p-8 md:p-10 rounded-3xl border border-orange-100 bg-linear-to-br from-orange-50 to-pink-50 shadow-sm flex flex-col justify-center">
                                {/* Decorative background elements */}
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                                <div className="absolute right-10 bottom-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

                                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <div className="flex gap-2 mb-4">
                                            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                                                <FaCrown /> Creator Tier
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-3">
                                            Support chefs. <br /> Unlock premium taste.
                                        </h3>
                                        <p className="text-gray-700 font-medium leading-relaxed mb-6">
                                            Subscribe to your favorite culinary creators to unlock their exclusive, premium recipes. Are you a chef? Monetize your craft by selling your best recipes directly to your audience.
                                        </p>
                                        <MagneticButton>Explore Premium</MagneticButton>
                                    </div>

                                    {/* Abstract UI Mockup representation */}
                                    <div className="hidden md:flex flex-col gap-3">
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100 flex items-center justify-between opacity-80 translate-x-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"><FaUserFriends className="text-gray-400" /></div>
                                                <div>
                                                    <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                                                    <div className="h-2 w-12 bg-gray-100 rounded"></div>
                                                </div>
                                            </div>
                                            <FaLockOpen className="text-gray-300" />
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl shadow-md border border-orange-200 flex items-center justify-between z-10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"><FaCrown className="text-orange-500" /></div>
                                                <div>
                                                    <div className="h-2 w-24 bg-gray-800 rounded mb-2"></div>
                                                    <div className="h-2 w-16 bg-gray-400 rounded"></div>
                                                </div>
                                            </div>
                                            <span className="text-orange-500 font-bold">$4.99/mo</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* FULL WIDTH MARQUEE (Hardware Accelerated) */}
                    <div className="py-24 overflow-hidden w-full whitespace-nowrap flex border-y border-gray-200 bg-white">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                            style={{ willChange: "transform" }}
                            className="flex text-7xl md:text-9xl font-black uppercase"
                        >
                            <span className="px-8 text-gray-900">AI RECIPES.</span>
                            <span className="px-8 text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-pink-500">BITEBOT.</span>
                            <span className="px-8 text-gray-200">SAVE FAVORITES.</span>
                            <span className="px-8 text-gray-900">AI RECIPES.</span>
                            <span className="px-8 text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-pink-500">BITEBOT.</span>
                            <span className="px-8 text-gray-200">SAVE FAVORITES.</span>
                        </motion.div>
                    </div>

                </div>
            </div>
        </HomeLayout>
    );
}