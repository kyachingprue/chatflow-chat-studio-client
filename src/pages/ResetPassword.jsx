import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "motion/react";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = params.get("oobCode");

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (!oobCode) throw new Error("Invalid reset link");
      await resetPassword(oobCode, data.password);
      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 seconds delay before redirect
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
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
          Reset Password 🔑
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "New password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-indigo-500"
              placeholder=" "
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              New Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirm", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-indigo-500"
              placeholder=" "
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Confirm Password
            </label>
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-4 text-gray-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirm && (
              <p className="text-red-500 text-sm mt-1">{errors.confirm.message}</p>
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
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
