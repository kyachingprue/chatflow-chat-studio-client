import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";

export const VerifyEmail = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setSuccess(false);
      setMessage("Invalid or missing verification token.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setSuccess(true);
          setMessage("Email verified successfully! Redirecting to login...");
          toast.success("Email verified successfully!");

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setSuccess(false);
          setMessage(res.data.message || "Verification failed.");
          toast.error(res.data.message || "Verification failed.");
        }
      } catch (error) {
        const errMsg =
          error.response?.data?.message || "Token verification failed.";
        setSuccess(false);
        setMessage(errMsg);
        toast.error(errMsg);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
        {loading ? (
          <p className="text-gray-600 text-lg font-medium">
            Verifying your email...
          </p>
        ) : (
          <>
            {success ? (
              <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
            ) : (
              <XCircle className="mx-auto text-red-600 mb-4" size={48} />
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {success ? "Verification Successful" : "Verification Failed"}
            </h2>

            <p className="text-gray-600">{message}</p>

            {success && (
              <p className="mt-4 text-sm text-gray-500">
                Redirecting to login page...
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
