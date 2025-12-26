import { motion } from "motion/react";
import {
  Sparkles,
  MessageCircle,
  Users,
  ShieldCheck,
  Zap,
  Crown,
} from "lucide-react";

export default function Services() {
  return (
    <section className="relative min-h-screen mt-16 bg-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-tr from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Our <span className="text-blue-500">Services</span>
          </h1>
          <p className="mt-6 text-gray-300 text-base md:text-lg">
            Choose the plan that fits your communication needs. Whether you're
            just starting or building large communities, we’ve got you covered.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 🔹 Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-blue-400" size={32} />
              <h2 className="text-2xl font-bold">Free</h2>
            </div>

            <p className="text-gray-400 mb-6">
              Perfect for individuals exploring realtime social connections.
            </p>

            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <MessageCircle size={20} className="text-blue-400" />
                1-to-1 Realtime Chat
              </li>
              <li className="flex items-center gap-3">
                <Users size={20} className="text-blue-400" />
                Add Friends
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-blue-400" />
                Secure Messaging
              </li>
            </ul>

            <button className="mt-8 w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 font-semibold transition">
              Get Started
            </button>
          </motion.div>

          {/* 🔸 Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative bg-blue-600/10 border border-blue-500/40 backdrop-blur-xl rounded-3xl p-8 scale-105"
          >
            {/* Badge */}
            <span className="absolute -top-4 right-6 bg-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
              Popular
            </span>

            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-blue-400" size={32} />
              <h2 className="text-2xl font-bold">Pro</h2>
            </div>

            <p className="text-gray-300 mb-6">
              Ideal for active users who want more power and flexibility.
            </p>

            <ul className="space-y-4 text-gray-200">
              <li className="flex items-center gap-3">
                <MessageCircle size={20} className="text-blue-400" />
                Group Chats
              </li>
              <li className="flex items-center gap-3">
                <Users size={20} className="text-blue-400" />
                Unlimited Friends
              </li>
              <li className="flex items-center gap-3">
                <Zap size={20} className="text-blue-400" />
                Priority Realtime Speed
              </li>
            </ul>

            <button className="mt-8 w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg shadow-blue-600/30 transition">
              Upgrade Now
            </button>
          </motion.div>

          {/* 🔥 Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition"
          >
            <div className="flex items-center gap-3 mb-6">
              <Crown className="text-yellow-400" size={32} />
              <h2 className="text-2xl font-bold">Enterprise</h2>
            </div>

            <p className="text-gray-400 mb-6">
              Built for communities, startups, and large-scale communication.
            </p>

            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <Users size={20} className="text-yellow-400" />
                Large Group Communities
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-yellow-400" />
                Advanced Security
              </li>
              <li className="flex items-center gap-3">
                <Zap size={20} className="text-yellow-400" />
                Dedicated Performance
              </li>
            </ul>

            <button className="mt-8 w-full py-3 rounded-full bg-yellow-500 hover:bg-yellow-600 font-semibold text-black transition">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
