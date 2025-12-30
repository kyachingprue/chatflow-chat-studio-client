import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // 🔄 Firebase auth loading
  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // 🔐 Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ⛔ Not admin
  if (dbUser?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Admin access granted
  return children;
};

export default AdminRoute;
