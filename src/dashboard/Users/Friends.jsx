import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserPlus } from "lucide-react";

const Friends = () => {
  const navigate = useNavigate();

  // Fetch all friends
  const { data: friendsData, isLoading, isError } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const res = await axios.get("/api/friends"); // replace with your API
      return Array.isArray(res.data?.data) ? res.data.data : [];
    },
  });

  const friends = friendsData || [];

  return (
    <div className="flex flex-col h-full p-4 bg-black/40 rounded-2xl border border-white/10 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">My Friends</h1>
        <button
          onClick={() => navigate("/dashboard/add-friend")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <UserPlus size={18} />
          Add Friend
        </button>
      </div>

      {/* Friends list */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {isLoading ? (
          <p className="text-white/50 text-center">Loading friends...</p>
        ) : isError ? (
          <p className="text-red-500 text-center">Failed to load friends</p>
        ) : friends.length === 0 ? (
          <p className="text-white/50 text-center">You have no friends yet</p>
        ) : (
          friends.map((friend) => (
            <div
              key={friend._id}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition"
            >
              <img
                src={friend.image || "https://i.pravatar.cc/40"}
                alt={friend.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-white font-medium">{friend.username}</p>
                <p className="text-white/50 text-sm">
                  {friend.isOnline ? "Active now" : "Offline"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Friends;
