import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, UserPlus, Circle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useSocket from "../../hooks/useSocket";

const Explore = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const socket = useSocket();

  const [onlineUsers, setOnlineUsers] = useState([]);

  /* -------------------- SOCKET ONLINE USERS -------------------- */
  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users); // array of online user UIDs
    };

    socket.on("online-users", handleOnlineUsers);

    return () => socket.off("online-users", handleOnlineUsers);
  }, [socket]);

  /* -------------------- FETCH DB USER -------------------- */
  const { data: userData } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  /* -------------------- FRIENDS -------------------- */
  const { data: friends = [] } = useQuery({
    queryKey: ["friends", userData?.uid],
    enabled: !!userData?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/friends/${userData?.uid}`);
      return res.data;
    },
  });

  /* -------------------- FRIEND REQUESTS -------------------- */
  const { data: requests = [] } = useQuery({
    queryKey: ["friendRequests", userData?.uid],
    enabled: !!userData?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/friends/requests/${userData?.uid}`);
      return res.data;
    },
  });

  /* -------------------- ACTIVE FRIENDS (SOCKET BASED) -------------------- */
  const activeFriends = friends.filter((f) =>
    onlineUsers.includes(f.friendUid || f.uid)
  );

  /* -------------------- STATS -------------------- */
  const stats = {
    totalFriends: friends.length,
    totalRequests: requests.length,
    totalActive: activeFriends.length,
  };

  const chartData = [
    { name: "Friends", value: stats.totalFriends, color: "#6366F1" },
    { name: "Requests", value: stats.totalRequests, color: "#10B981" },
    { name: "Active", value: stats.totalActive, color: "#F59E0B" },
  ];

  const COLORS = chartData.map((d) => d.color);

  return (
    <div className="p-6 flex flex-col space-y-6">

      {/* ===================== STATS CARDS ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
          <Users className="w-10 h-10 text-indigo-500" />
          <div>
            <p className="text-sm text-white/70">Total Friends</p>
            <p className="text-2xl font-bold text-white">{stats.totalFriends}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
          <UserPlus className="w-10 h-10 text-green-500" />
          <div>
            <p className="text-sm text-white/70">Friend Requests</p>
            <p className="text-2xl font-bold text-white">{stats.totalRequests}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
          <Circle className="w-10 h-10 text-yellow-500" />
          <div>
            <p className="text-sm text-white/70">Active Friends</p>
            <p className="text-2xl font-bold text-white">{stats.totalActive}</p>
          </div>
        </div>

      </div>

      {/* ===================== CHART ===================== */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg h-96">
        <h2 className="text-xl font-bold text-white mb-4">Friends Overview</h2>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                border: "none",
                color: "white",
              }}
            />

            <Legend wrapperStyle={{ color: "white" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Explore;
