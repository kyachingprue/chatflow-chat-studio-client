import { motion } from "motion/react";
import { Instagram, Youtube, Twitter, Linkedin } from "lucide-react";

const creators = [
  {
    id: 1,
    name: "Kevin Systrom",
    platform: "Instagram",
    location: "American (USA)",
    description: `Sharing daily lifestyle inspiration and travel adventures.`,
    image: "https://i.ibb.co/V0WYKsnR/Kevin-Systrom-CEO-of-Instagram.jpg",
    icon: <Instagram size={24} className="text-pink-500" />,
  },
  {
    id: 2,
    name: "Jawed Karim",
    platform: "YouTube",
    location: "American (USA)",
    description: "Tech and coding tutorials, helping millions learn programming.",
    image: "https://i.ibb.co/0jCRpz4J/0-AJL1mhj6-HBLV3sj-Y.png",
    icon: <Youtube size={24} className="text-red-600" />,
  },
  {
    id: 3,
    name: "Jack Dorsey",
    platform: "Twitter",
    location: "UK",
    description: "Digital marketing expert, sharing tips and case studies globally.",
    image: "https://i.ibb.co/Hp1tTBDJ/67408bb16fe24ccd0e5a4474-jack-dorsey-twitter-logo.jpg",
    icon: <Twitter size={24} className="text-blue-400" />,
  },
];

const SocialMediaCreators = () => {
  return (
    <div className="min-h-screen bg-linear-to-r from-gray-900 via-indigo-900 to-black p-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-white mb-10">Top Social Media Creators</h2>
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        {creators.map((creator) => (
          <motion.div
            key={creator.id}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-transparent hover:border-gradient animate-border transition-all duration-500 cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <motion.img
                src={creator.image}
                alt={creator.name}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                whileHover={{ scale: 1.1 }}
              />
              <div className="absolute top-4 right-4">{creator.icon}</div>
            </div>
            <div className="p-6 bg-black">
              <h3 className="text-xl font-bold text-white">{creator.name}</h3>
              <p className="text-gray-300 mt-1">{creator.platform} | {creator.location}</p>
              <p className="mt-3 text-gray-200 text-sm whitespace-pre-line">{creator.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaCreators;
