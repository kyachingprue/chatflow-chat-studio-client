import { motion } from "motion/react";
import { Home, RefreshCcw, AlertTriangle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-black via-slate-950 to-black overflow-hidden">

      {/* Animated Background Glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"
      />

      {/* Floating Icons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 left-20 text-indigo-400/30"
      >
        <MessageCircle size={60} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-20 right-20 text-pink-400/30"
      >
        <AlertTriangle size={70} />
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg w-full mx-6 p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-center"
      >
        {/* Error Code */}
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400"
        >
          404
        </motion.h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-white">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-400">
          Oops! This page doesn’t exist on SocialX.
          The conversation may have moved or expired.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
          >
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} SocialX — Real-Time Social Platform
        </p>
      </motion.div>
    </div>
  );
}
