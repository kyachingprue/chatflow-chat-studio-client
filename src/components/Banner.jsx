import { motion } from "motion/react"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-linear-to-r from-blue-600 via-blue-500 to-sky-400
    mt-16 text-white">
      <div className="absolute inset-0 bg-linear-to-b from-black/70 to-black/90" />
      <motion.div
        className="absolute top-20 left-16 text-blue-500 text-4xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <FaFacebookF />
      </motion.div>

      <motion.div
        className="absolute bottom-24 left-24 text-sky-400 text-4xl"
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <FaTwitter />
      </motion.div>

      <motion.div
        className="absolute top-24 right-24 text-pink-500 text-4xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 4.5 }}
      >
        <FaInstagram />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20 text-blue-400 text-4xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <FaLinkedinIn />
      </motion.div>

      {/* 🔥 Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        {/* Heading */}
        <h1 className="text-xl md:text-2xl lg:text-5xl font-extrabold leading-tight">
          The Future of Real-Time <span className="text-blue-500">Social</span>  Interaction
        </h1>

        {/* Description */}
        <p className="mt-6 text-sm md:text-base text-gray-300 leading-relaxed">
          A new generation social platform built for real connections. <br />
          Chat instantly, build communities, and grow together. <br />
          Realtime conversations with people who matter.
        </p>

        {/* Button */}
        <div className="mt-12">
          <Link to="/dashboard/chat">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
