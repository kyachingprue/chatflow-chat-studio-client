import { motion } from "motion/react";
import { Instagram, Twitter, Youtube, Linkedin, Facebook } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const socialPlatforms = [
  { name: "Instagram", icon: <Instagram size={24} className="text-pink-500" /> },
  { name: "Twitter", icon: <Twitter size={24} className="text-blue-400" /> },
  { name: "YouTube", icon: <Youtube size={24} className="text-red-600" /> },
  { name: "LinkedIn", icon: <Linkedin size={24} className="text-blue-700" /> },
  { name: "Facebook", icon: <Facebook size={24} className="text-blue-600" /> },
  { name: "Discord", icon: <FaDiscord size={24} className="text-indigo-500" /> },
];

const FinalSection = () => {
  const { user } = useAuth();
  return (
    <div className="relative bg-linear-to-r from-gray-900 via-black to-gray-800 py-20 px-6 overflow-hidden">
      {/* Background animated shapes */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply opacity-20 blur-3xl animate-spin-slow"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply opacity-20 blur-3xl animate-spin-slow"
        animate={{ rotate: -360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Join Our Social Media Community
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl mb-12">
          Follow your favorite creators, engage with the community, and stay updated
          with the latest trends. Connect, share, and grow your influence across multiple platforms.
        </p>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-6 gap-6 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
              className="bg-black bg-opacity-40 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {platform.icon}
              <span className="text-white mt-2 text-sm md:text-base font-semibold">{platform.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <Link to={user ? "/dashboard/chat" : "/login"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-10 py-4 rounded-3xl text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            Join Now
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default FinalSection;
