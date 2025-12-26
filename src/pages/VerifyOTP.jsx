import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Key } from "lucide-react";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { email } = useParams(); // Get email from URL
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/verify-otp/${email}`,
        { otp: data.otp }
      );

      if (response.data.success) {
        toast.success("OTP verified successfully!");
        navigate(`/reset-password/${email}`); // redirect to reset password page
      } else {
        toast.error(response.data.message || "OTP verification failed");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Verify OTP</h2>
        <p className="text-gray-600 mb-5">
          Enter the 6-digit OTP sent to <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter OTP"
              {...register("otp", {
                required: "OTP is required",
                minLength: { value: 6, message: "OTP must be 6 digits" },
                maxLength: { value: 6, message: "OTP must be 6 digits" },
              })}
              className={`w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.otp ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="mt-5 text-gray-500 text-sm">
          Didn’t receive the OTP? Check your email or{" "}
          <span
            onClick={() => navigate("/forget-password")}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
