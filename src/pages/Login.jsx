import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const { loginUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 TanStack mutation to update verification status
  const verifyMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosPublic.patch(`/users/verify`, { email });
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1️⃣ Firebase login
      const result = await loginUser(data.email, data.password);

      // 2️⃣ Only update DB if email is verified
      if (result.user.emailVerified) {
        await verifyMutation.mutateAsync(data.email);
      }

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      if (error.message === "Email not verified") {
        toast.error("Please verify your email address");
      } else {
        toast.error(error.message || "Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Login 🔑</h2>
          <p className="text-gray-500 mt-2">
            Enter your email and password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <label className="flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Email Address</span>
            </label>

            <div className="relative">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="enter your email"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-11 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
              <Mail
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label className="flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Password</span>
              <Link
                to="/forgot-password"
                className="text-base font-medium text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                placeholder="enter your password"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-11 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-white transition-all
             ${loading
                ? "bg-indigo-400 cursor-not-allowed"
              : "bg-linear-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] hover:shadow-lg"
              }`}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        <p className="text-center mt-6 text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
