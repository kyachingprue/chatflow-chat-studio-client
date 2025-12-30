import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { Mail, Loader2 } from "lucide-react";
import { motion } from "motion/react";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await forgotPassword(data.email);
      toast.success("Password reset email sent! Check your inbox.");
      setTimeout(() => {
        navigate("/check-email");
      }, 2000); // 2 seconds delay
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Forgot Password 📧
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your email address to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-indigo-500"
              placeholder=" "
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Your Email
            </label>
            <Mail className="absolute right-3 top-4 text-gray-400" size={18} />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 rounded-lg py-3 text-white font-semibold transition
              ${loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
