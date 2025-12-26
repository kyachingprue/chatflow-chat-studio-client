import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, UserPlus, Circle } from "lucide-react";

const Explore = () => {
  // Fake stats
  const [stats] = useState({
    totalFriends: 24,
    totalRequests: 5,
    totalActive: 12,
  });

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
        <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg hover:scale-105 transform transition">
          <Users className="w-10 h-10 text-indigo-500" />
          <div>
            <p className="text-sm text-white/70">Total Friends</p>
            <p className="text-2xl font-bold text-white">{stats.totalFriends}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg hover:scale-105 transform transition">
          <UserPlus className="w-10 h-10 text-green-500" />
          <div>
            <p className="text-sm text-white/70">Friend Requests</p>
            <p className="text-2xl font-bold text-white">{stats.totalRequests}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg hover:scale-105 transform transition">
          <Circle className="w-10 h-10 text-yellow-500" />
          <div>
            <p className="text-sm text-white/70">Active Friends</p>
            <p className="text-2xl font-bold text-white">{stats.totalActive}</p>
          </div>
        </div>
      </div>

      {/* FAKE CHART */}
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
            <Legend wrapperStyle={{ color: "white" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Explore;
