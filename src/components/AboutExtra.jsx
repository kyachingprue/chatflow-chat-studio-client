import { motion } from "motion/react";
import { Instagram, Youtube, Twitter, Linkedin, Users } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const aboutData = [
  {
    id: 1,
    title: "Our Mission",
    description:
      "To empower creators and connect communities through innovative social media tools and technology, fostering engagement and collaboration across platforms.",
    icon: <Users size={28} className="text-indigo-500" />,
  },
  {
    id: 2,
    title: "Creators",
    description:
      "We provide tools, analytics, and exposure for over 10,000 creators globally, helping them grow and monetize their content across multiple platforms.",
    icon: <Instagram size={28} className="text-pink-500" />,
  },
  {
    id: 3,
    title: "Engagement",
    description:
      "Our platform ensures maximum engagement with advanced AI-driven recommendations, trending insights, and interactive content features for our users.",
    icon: <Twitter size={28} className="text-blue-400" />,
  },
];

const statsData = [
  { id: 1, label: "Active Users", value: 2000000 },
  { id: 2, label: "Posts Shared", value: 8000000 },
  { id: 3, label: "Creators Joined", value: 10000 },
];

const AboutExtra = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div className="bg-linear-to-r from-gray-900 via-black to-gray-800 py-20 px-6 relative overflow-hidden">
      {/* Animated background circles */}
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
          About Our Platform
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl mb-12">
          Our platform connects creators with their communities, providing
          innovative tools, insights, and features that enhance social
          engagement and growth. Discover more about our mission, team, and
          achievements below.
        </p>

        {/* About Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {aboutData.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
              className="bg-black bg-opacity-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm md:text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section with Auto Count */}
        <div ref={ref} className="grid grid-cols-3 sm:grid-cols-3 gap-6 text-center">
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-black bg-opacity-40 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {inView ? <CountUp end={stat.value} duration={2} separator="," /> : 0}
              </h3>
              <p className="text-gray-300 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutExtra;
