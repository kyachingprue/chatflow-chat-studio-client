import { motion } from "motion/react"; 
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Banner() {
  const { user } = useAuth();

  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-linear-to-r from-blue-600 via-blue-500 to-sky-400 mt-16 text-white">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 to-black/90" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 max-w-6xl w-full gap-8">
        {/* Left side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-6"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            The Future of Real-Time <span className="text-blue-300">Social</span> Interaction
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            A new generation social platform built for real connections. <br />
            Chat instantly, build communities, and grow together.
          </p>
          <Link to={user ? "/dashboard/chat" : "/login"}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg transition"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>

        {/* Right side - Social icons */}
        <div className="md:w-1/2 relative flex justify-center items-center space-x-4">
          <motion.div
            className="text-blue-500 text-4xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", ease: "easeInOut" }}
          >
            <FaFacebookF />
          </motion.div>

          <motion.div
            className="text-sky-400 text-4xl"
            animate={{ y: [0, 25, 0] }}
            transition={{ repeat: Infinity, duration: 5, repeatType: "reverse", ease: "easeInOut" }}
          >
            <FaTwitter />
          </motion.div>

          <motion.div
            className="text-pink-500 text-4xl"
            animate={{ y: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, repeatType: "reverse", ease: "easeInOut" }}
          >
            <FaInstagram />
          </motion.div>

          <motion.div
            className="text-blue-400 text-4xl"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5, repeatType: "reverse", ease: "easeInOut" }}
          >
            <FaLinkedinIn />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
