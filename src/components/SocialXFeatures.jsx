import { motion } from "motion/react";
import {
  MessageCircle,
  Users,
  Zap,
  Lock,
  Globe,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Real-Time Messaging",
    desc: "Instant chats powered by live updates, typing indicators, and read receipts.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Social Feeds",
    desc: "Share moments, react instantly, and engage with your community in real time.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized architecture ensures ultra-fast delivery with minimal latency.",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Lock,
    title: "Secure Conversations",
    desc: "End-to-end encrypted messages with privacy-first architecture.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Globe,
    title: "Global Connectivity",
    desc: "Connect with people worldwide without borders or delays.",
    gradient: "from-cyan-500 to-sky-600",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Get notified only when it matters with intelligent alert control.",
    gradient: "from-violet-500 to-fuchsia-600",
  },
];

export default function SocialXFeatures() {
  return (
    <section className="relative py-24 bg-linear-to-b from-black via-slate-950 to-black overflow-hidden">

      {/* Animated Glow Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Experience <span className="text-indigo-400">SocialX</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            A next-generation social platform built for real-time conversations,
            privacy, and community.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
              >
                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition duration-500`}
                />

                <div className="relative flex flex-col gap-5">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-xl bg-linear-to-br ${feature.gradient}`}
                  >
                    <Icon className="text-white w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 text-center"
        >
          
        </motion.div>
      </div>
    </section>
  );
}
