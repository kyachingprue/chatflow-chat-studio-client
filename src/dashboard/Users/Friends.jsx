import { useState } from "react";
import { UserPlus } from "lucide-react";

const dummyFriends = [
  { id: 1, username: "Alice", isOnline: true, image: "https://i.pravatar.cc/40?img=1" },
  { id: 2, username: "Bob", isOnline: false, image: "https://i.pravatar.cc/40?img=2" },
  { id: 3, username: "Charlie", isOnline: true, image: "https://i.pravatar.cc/40?img=3" },
  { id: 4, username: "Diana", isOnline: false, image: "https://i.pravatar.cc/40?img=4" },
  { id: 5, username: "Eve", isOnline: true, image: "https://i.pravatar.cc/40?img=5" },
  { id: 6, username: "Frank", isOnline: true, image: "https://i.pravatar.cc/40?img=6" },
];

const Friends = () => {
  const [friends] = useState(dummyFriends);

  return (
    <div className="flex flex-col h-full p-4 bg-black/40 rounded-2xl border border-white/10 overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">My Friends</h1>
        <button
          onClick={() => alert("Add Friend clicked!")}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          <UserPlus size={18} />
          Add Friend
        </button>
      </div>

      {/* Friends Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto flex-1">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="bg-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:bg-white/10 transition shadow-lg"
          >
            <div className="relative">
              <img
                src={friend.image}
                alt={friend.username}
                className="w-20 h-20 rounded-full ring-2 ring-pink-500"
              />
              <span
                className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-black ${friend.isOnline ? "bg-green-500" : "bg-gray-500"
                  }`}
              ></span>
            </div>
            <p className="text-white font-semibold text-lg">{friend.username}</p>
            <p className="text-white/50 text-sm">
              {friend.isOnline ? "Online" : "Offline"}
            </p>
            <button className="mt-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm transition">
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
