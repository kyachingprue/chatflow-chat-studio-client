import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { motion } from "motion/react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10); 

  useEffect(() => {
    if (seconds === 0) {
      navigate("/login"); 
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="w-full max-w-md rounded-3xl shadow-2xl p-10 text-center
                   bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 text-white"
      >
        <MailCheck className="mx-auto mb-6 text-white" size={48} />
        <h2 className="text-2xl font-bold mb-4">
          Please Verify Your Email ✉️
        </h2>
        <p className="mb-6">
          We have sent a verification link to your email. <br />
          Click the link to activate your account.
        </p>
        <p className="text-sm">
          This card will close in {seconds} second{seconds !== 1 ? "s" : ""}...
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
