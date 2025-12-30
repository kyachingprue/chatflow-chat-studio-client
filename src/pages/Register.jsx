import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, User, Mail } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";


const Register = () => {
  const { registerUser, profileUpdate } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔐 MongoDB user create mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosPublic.post("/users", userData);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1️⃣ Firebase register
      const userCredential = await registerUser(data.email, data.password);
      const user = userCredential.user;

      const defaultPhotoURL = "https://i.ibb.co.com/C31ZMR2t/360-F-724597608-pmo5-Bs-Vum-Fc-Fy-HJKl-ASG2-Y2-Kpkkfi-YUU.jpg";
      const profile = {
        displayName: data.name,
        photoURL: defaultPhotoURL,
      };
      await profileUpdate(user, profile); 
      // 2️⃣ Send data to MongoDB
      await createUserMutation.mutateAsync({
        uid: user.uid,
        name: data.name,
        email: user.email,
        role: "user",
        image: user.defaultPhotoURL,
        cover: 'https://i.ibb.co.com/wFvZn7s8/Red-White-and-Black-Corporate-Virtual-Assistant-Linked-In-Article-Cover-Image.png',
        isVerified: false,
        createdAt: new Date(),
      });

      toast.success("Account created! Please verify your email.");
      navigate("/verify-email");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account 🚀
          </h2>
          <p className="text-gray-500 mt-2">
            Join and start your journey today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500" placeholder="Enter your name"
            />
            <User className="absolute right-3 top-9 text-gray-400" size={18} />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500" placeholder="Enter your email"
            />
            <Mail className="absolute right-3 top-9 text-gray-400" size={18} />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500" placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
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
                Creating...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
