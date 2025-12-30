import { motion } from "motion/react";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4">

        {/* Outer Gradient Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
          className="w-20 h-20 rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-indigo-500 p-0.75"
        >
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center">

            {/* Inner Pulse */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
              }}
              className="w-4 h-4 bg-purple-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="text-white text-sm tracking-widest uppercase"
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
