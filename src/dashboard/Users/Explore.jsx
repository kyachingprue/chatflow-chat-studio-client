import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, UserPlus, Circle } from "lucide-react";

const Explore = () => {
  const [stats, setStats] = useState({
    totalFriends: 0,
    totalRequests: 0,
    totalActive: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/users/stats"); // Replace with your API
        setStats({
          totalFriends: res.data.totalFriends || 0,
          totalRequests: res.data.totalRequests || 0,
          totalActive: res.data.totalActive || 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  const chartData = [
    { name: "Friends", value: stats.totalFriends, color: "#6366F1" },
    { name: "Requests", value: stats.totalRequests, color: "#10B981" },
    { name: "Active", value: stats.totalActive, color: "#F59E0B" },
  ];

  const COLORS = chartData.map((data) => data.color);

  return (
    <div className="p-6 flex flex-col space-y-6">
      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg">
          <Users className="w-8 h-8 text-indigo-500" />
          <div>
            <p className="text-sm text-white/70">Total Friends</p>
            <p className="text-xl font-bold text-white">{stats.totalFriends}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg">
          <UserPlus className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-white/70">Friend Requests</p>
            <p className="text-xl font-bold text-white">{stats.totalRequests}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg">
          <Circle className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-sm text-white/70">Active Friends</p>
            <p className="text-xl font-bold text-white">{stats.totalActive}</p>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg h-96">
        <h2 className="text-xl font-bold text-white mb-4">Friends Overview</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={(entry) => entry.value}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", border: "none" }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend
              wrapperStyle={{ color: "white" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Explore;
