import { motion } from "motion/react";
import { FaUsers, FaComments, FaBolt, FaShieldAlt } from "react-icons/fa";
import AboutExtra from "../components/AboutExtra";
import AboutCardSection from "../components/AboutCardSection";

export default function About() {
  return (
    <section>
      <section className="relative min-h-screen bg-black mt-16 text-white overflow-hidden">

        {/* 🔥 Background Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

          {/* 🔥 Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold">
              About <span className="text-blue-500">ConnectX</span>
            </h1>

            <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed">
              ConnectX is a next-generation realtime social media platform designed
              to bring people closer through fast, meaningful, and secure
              conversations.
            </p>
          </motion.div>

          {/* 🔥 Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Our <span className="text-blue-500">Mission</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our mission is to build a social space where conversations feel
                natural, communities grow organically, and users can communicate
                without barriers. We believe real connections start with real-time
                interactions.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <p className="text-gray-300 leading-relaxed">
                Whether it’s a one-to-one chat, a group discussion, or discovering
                new friends, ConnectX ensures every interaction feels fast,
                private, and personal.
              </p>
            </div>
          </motion.div>

          {/* 🔥 Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Why <span className="text-blue-500">ConnectX</span>?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 transition">
                <FaComments className="text-blue-500 text-3xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Realtime Chat</h3>
                <p className="text-gray-400 text-sm">
                  Instant one-to-one and group conversations powered by realtime
                  technology.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 transition">
                <FaUsers className="text-purple-500 text-3xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Strong Communities</h3>
                <p className="text-gray-400 text-sm">
                  Build friendships, join groups, and connect with people who
                  matter.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 transition">
                <FaBolt className="text-yellow-400 text-3xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast & Scalable</h3>
                <p className="text-gray-400 text-sm">
                  Optimized architecture ensures lightning-fast performance at
                  scale.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 transition">
                <FaShieldAlt className="text-green-500 text-3xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-gray-400 text-sm">
                  Your conversations are protected with industry-standard
                  security.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <AboutExtra />
      <AboutCardSection/>
    </section>
  );
}
