import { motion } from "motion/react";
import {
  Megaphone,
  Share2,
  Smartphone,
  Code2,
  Search,
  Target,
} from "lucide-react";

const services = [
  {
    title: "Content Marketing",
    description:
      "Strategic content creation to build authority and drive organic growth.",
    icon: Megaphone,
  },
  {
    title: "Social Marketing",
    description:
      "High-converting social media campaigns with data-driven strategies.",
    icon: Share2,
  },
  {
    title: "App Development",
    description:
      "Modern, scalable mobile applications using cutting-edge technology.",
    icon: Smartphone,
  },
  {
    title: "Web Development",
    description:
      "High-performance websites built with modern frameworks.",
    icon: Code2,
  },
  {
    title: "SEO Optimization",
    description:
      "Advanced SEO techniques to rank higher and grow traffic.",
    icon: Search,
  },
  {
    title: "PPC Advertising",
    description:
      "ROI-focused paid advertising strategies for instant growth.",
    icon: Target,
  },
];

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-[#1a0033] to-black" />

      {/* Glow Orbs */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Our <span className="text-purple-500">Services</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            We deliver modern digital solutions using advanced technology and
            creative strategies.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -12 }}
      className="group relative"
    >
      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-500 via-indigo-500 to-pink-500 opacity-0 group-hover:opacity-100 blur transition duration-500" />

      {/* Card */}
      <div className="relative h-full rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 p-8">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="absolute -inset-1 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 blur opacity-70" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-black">
            <Icon className="h-7 w-7 text-purple-400" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-3">
          {service.title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {service.description}
        </p>

        {/* Hover Line */}
        <div className="mt-6 h-1 w-0 bg-linear-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
}
