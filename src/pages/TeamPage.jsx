import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaQuoteLeft } from "react-icons/fa";
import HomeLayout from "../layouts/HomeLayout";

const teamMembers = [
  {
    name: "Alex Rivera",
    role: "Lead Architect",
    image: "https://i.pravatar.cc/300?img=11",
    bio: "Master of system design and spices. Alex spent 10 years scaling distributed systems before bringing that logic to the kitchen. Passionate about scalable code and spicy ramen.",
    color: "from-orange-400 to-red-500",
  },
  {
    name: "Sarah Chen",
    role: "Frontend Artisan",
    image: "https://i.pravatar.cc/300?img=5",
    bio: "Turning complex recipes into buttery-smooth user interfaces. Sarah believes that UI/UX is the 'plating' of the software world—it has to look as good as it functions.",
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "Marcus Thorne",
    role: "Backend Chef",
    image: "https://i.pravatar.cc/300?img=12",
    bio: "Database whisperer. Marcus ensures every request is served hot and optimized. He manages our server clusters with the same precision he uses for a beef wellington.",
    color: "from-rose-400 to-orange-600",
  },
  {
    name: "Elena Rodriguez",
    role: "AI Specialist",
    image: "https://i.pravatar.cc/300?img=9",
    bio: "The brain behind BiteBot. Elena focuses on Natural Language Processing to make sure our AI knows the subtle difference between cumin and cocoa.",
    color: "from-orange-500 to-amber-600",
  },
  {
    name: "Jamie Vaan",
    role: "Product Visionary",
    image: "https://i.pravatar.cc/300?img=13",
    bio: "Bridging the gap between hunger and technology. Jamie has a knack for identifying the next big flavor profile in the tech ecosystem.",
    color: "from-red-500 to-amber-500",
  },
];

const VerticalTeamPage = () => {
  return (
    <HomeLayout>
      <div className="relative min-h-screen bg-orange-50/30 overflow-hidden py-20">
        {/* Central "Vine" or Line (Desktop Only) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-200 to-transparent hidden lg:block" />

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl font-extrabold text-gray-800"
            >
              The <span className="text-orange-500">MasterChefs</span>
            </motion.h1>
            <p className="text-gray-500 mt-4 italic">Crafting the future of food, one line of code at a time.</p>
          </div>

          <div className="space-y-32">
            {teamMembers.map((member, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
                >
                  {/* Image Side */}
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="relative">
                      {/* Decorative Background Square */}
                      <div className={`absolute -inset-4 bg-gradient-to-tr ${member.color} opacity-20 blur-2xl rounded-full animate-pulse`} />
                      
                      <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className={`w-full lg:w-1/2 text-center ${isEven ? "lg:text-left" : "lg:text-right"}`}>
                    <div className={`inline-block p-2 rounded-lg bg-gradient-to-br ${member.color} text-white text-xs font-bold uppercase tracking-widest mb-4`}>
                      {member.role}
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">{member.name}</h2>
                    
                    <div className={`relative p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-orange-100 shadow-xl inline-block max-w-xl`}>
                      <FaQuoteLeft className="absolute -top-4 left-6 text-orange-200 text-3xl" />
                      <p className="text-gray-600 leading-relaxed italic">
                        {member.bio}
                      </p>
                    </div>

                    <div className={`flex gap-6 mt-8 justify-center ${isEven ? "lg:justify-start" : "lg:justify-end"}`}>
                      <FaLinkedin className="text-gray-400 hover:text-orange-500 cursor-pointer transition-colors text-xl" />
                      <FaGithub className="text-gray-400 hover:text-orange-500 cursor-pointer transition-colors text-xl" />
                      <FaTwitter className="text-gray-400 hover:text-orange-500 cursor-pointer transition-colors text-xl" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default VerticalTeamPage;