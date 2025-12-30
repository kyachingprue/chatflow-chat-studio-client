import { motion } from "motion/react";
import {
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Facebook,
  Twitch,
} from "lucide-react";
import { FaPinterest, FaReddit, FaSnapchat, FaTiktok } from "react-icons/fa";


const socialPlatforms = [
  { id: 1, name: "Instagram", icon: <Instagram size={32} className="text-pink-500" /> },
  { id: 2, name: "YouTube", icon: <Youtube size={32} className="text-red-600" /> },
  { id: 3, name: "Twitter", icon: <Twitter size={32} className="text-blue-400" /> },
  { id: 4, name: "LinkedIn", icon: <Linkedin size={32} className="text-blue-700" /> },
  { id: 5, name: "Facebook", icon: <Facebook size={32} className="text-blue-600" /> },
  { id: 6, name: "TikTok", icon: <FaTiktok size={32} className="text-black" /> },
  { id: 7, name: "Snapchat", icon: <FaSnapchat size={32} className="text-yellow-400" /> },
  { id: 8, name: "Pinterest", icon: <FaPinterest size={32} className="text-red-500" /> },
  { id: 9, name: "Reddit", icon: <FaReddit size={32} className="text-orange-500" /> },
  { id: 10, name: "Twitch", icon: <Twitch size={32} className="text-purple-600" /> },
];

const NewServiceFeature = () => {
  return (
    <div className="bg-linear-to-r from-gray-900 via-gray-800 to-black py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white text-center"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Our Social Media Services
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-300 text-center text-lg md:text-xl max-w-3xl space-y-2"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We help you grow your social presence across multiple platforms.
          Our services are tailored for creators, businesses, and communities.
          Connect with your audience effectively and engage like never before.
          Stay ahead of trends and maximize your reach.
        </motion.p>

        {/* Social Media Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-10 w-full">
          {socialPlatforms.map((platform) => (
            <motion.div
              key={platform.id}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center gap-2 bg-black bg-opacity-40 p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl"
            >
              <div className="text-4xl">{platform.icon}</div>
              <span className="text-white font-semibold">{platform.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewServiceFeature;
