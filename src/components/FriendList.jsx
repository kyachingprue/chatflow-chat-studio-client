import { Search, Circle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FriendList = ({ onSelect, selectedFriend }) => {
  const {
    data: friends = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const res = await axios.get("/api/friends");

      // ✅ VERY IMPORTANT: always return an array
      return Array.isArray(res.data)
        ? res.data
        : res.data?.friends ?? [];
    },
  });

  return (
    <div className="h-full flex flex-col">

      {/* SEARCH */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center bg-black/40 rounded-lg px-3">
          <Search className="w-4 h-4 text-white/50" />
          <input
            placeholder="Search friends..."
            className="bg-transparent outline-none text-sm px-2 py-2 text-white w-full"
          />
        </div>
      </div>

      {/* STATES */}
      {isLoading && (
        <p className="text-center text-white/60 mt-4">Loading friends...</p>
      )}

      {isError && (
        <p className="text-center text-red-400 mt-4">
          Failed to load friends
        </p>
      )}

      {!isLoading && friends.length === 0 && (
        <p className="text-center text-white/50 mt-4">
          No friends found
        </p>
      )}

      {/* FRIEND LIST */}
      <div className="flex-1 overflow-y-auto">
        {Array.isArray(friends) &&
          friends.map((friend) => (
            <div
              key={friend._id}
              onClick={() => onSelect(friend)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition
              ${selectedFriend?._id === friend._id
                  ? "bg-pink-600/20"
                  : "hover:bg-white/10"
                }`}
            >
              <div className="relative">
                <img
                  src={
                    friend.image ||
                    "https://i.pravatar.cc/40?img=3"
                  }
                  alt={friend.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <Circle
                  className={`absolute bottom-0 right-0 w-3 h-3
                  ${friend.isOnline
                      ? "text-green-500 fill-green-500"
                      : "text-gray-500 fill-gray-500"
                    }`}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  {friend.username}
                </p>
                <p className="text-xs text-white/50">
                  {friend.isOnline ? "Active now" : "Offline"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendList;
