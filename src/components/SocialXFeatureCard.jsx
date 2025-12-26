import { motion } from "motion/react";
import { CheckCircle, Sparkles } from "lucide-react";

export default function SocialXFeatureCard() {
  return (
    <section className="relative py-24 bg-linear-to-b from-black via-slate-950 to-black overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT – Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">
                Next-Gen Social Platform
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Real-Time Chat <br />
              <span className="text-indigo-400">Built for Speed</span>
            </h2>

            <p className="text-gray-400 text-lg max-w-xl">
              SocialX brings instant messaging, live presence, and smooth
              interactions together in one powerful platform.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                "Live typing indicators & read receipts",
                "Online presence with real-time status",
                "Ultra-fast message delivery",
                "Secure and private conversations",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-flex items-center justify-center px-7 py-3 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg"
            >
              Get Started with SocialX
            </motion.button>
          </motion.div>

          {/* RIGHT – Image / Animation */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-4"
            >
              <img
                src="https://i.ibb.co.com/V0vRQyGr/social-media-1405601-12802.jpg"
                alt="SocialX App UI"
                className="rounded-2xl w-full"
              />
            </motion.div>

            {/* Glow */}
            <div className="absolute -inset-6 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-3xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
