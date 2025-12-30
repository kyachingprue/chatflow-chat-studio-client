import { motion } from "motion/react";
import { FaReact, FaNodeJs, FaDatabase, FaRocket } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const AboutCardSection = () => {
  const { user } = useAuth();
  return (
    <div className="bg-linear-to-r from-gray-900 via-gray-800 to-black py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Side Image */}
        <motion.div
          className="w-full md:w-1/2 relative overflow-hidden rounded-3xl shadow-2xl"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="https://i.ibb.co.com/FqLdHjC4/social-media-networks.jpg" 
            alt="Social Media Chat"
            className="w-full h-full object-cover rounded-3xl"
            whileHover={{ scale: 1.05, rotate: 2 }}
          />
          {/* Animated overlay circle */}
          <motion.div
            className="absolute -top-10 -left-10 w-32 h-32 bg-purple-600 opacity-40 rounded-full blur-3xl animate-spin-slow"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
          />
        </motion.div>

        {/* Right Side Text */}
        <motion.div
          className="w-full md:w-1/2 text-white flex flex-col gap-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">ChatFlow</h2>
          <p className="text-gray-300 text-lg md:text-xl">
            Real-time chat platform for creators and communities. Connect,
            collaborate, and grow your audience with ChatFlow's modern social
            media tools and analytics.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 bg-black bg-opacity-40 p-3 rounded-xl shadow hover:shadow-lg transition-all duration-300">
              <FaReact className="text-blue-400 text-2xl" />
              <span>React.js Frontend</span>
            </div>
            <div className="flex items-center gap-2 bg-black bg-opacity-40 p-3 rounded-xl shadow hover:shadow-lg transition-all duration-300">
              <FaNodeJs className="text-green-500 text-2xl" />
              <span>Node.js Backend</span>
            </div>
            <div className="flex items-center gap-2 bg-black bg-opacity-40 p-3 rounded-xl shadow hover:shadow-lg transition-all duration-300">
              <FaDatabase className="text-yellow-400 text-2xl" />
              <span>MongoDB Database</span>
            </div>
            <div className="flex items-center gap-2 bg-black bg-opacity-40 p-3 rounded-xl shadow hover:shadow-lg transition-all duration-300">
              <FaRocket className="text-pink-500 text-2xl" />
              <span>Realtime Messaging</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link to={user ? "/dashboard/chat" : "/login"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 w-max"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutCardSection;
