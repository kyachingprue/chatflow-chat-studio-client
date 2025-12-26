import { useState } from "react";
import { UserPlus, Check } from "lucide-react";

const dummyUsers = [
  { id: 1, username: "Alice", image: "https://i.pravatar.cc/100?img=1" },
  { id: 2, username: "Bob", image: "https://i.pravatar.cc/100?img=2" },
  { id: 3, username: "Charlie", image: "https://i.pravatar.cc/100?img=3" },
  { id: 4, username: "Diana", image: "https://i.pravatar.cc/100?img=4" },
  { id: 5, username: "Eve", image: "https://i.pravatar.cc/100?img=5" },
  { id: 6, username: "Frank", image: "https://i.pravatar.cc/100?img=6" },
];

const AddFriend = () => {
  const [users] = useState(dummyUsers);
  const [sentRequests, setSentRequests] = useState([]);

  const handleAddFriend = (userId) => {
    if (!sentRequests.includes(userId)) {
      setSentRequests([...sentRequests, userId]);
    }
  };

  return (
    <div className="p-4 flex flex-col space-y-4 h-full overflow-y-auto bg-black/40 rounded-2xl border border-white/10">
      <h1 className="text-2xl font-bold text-white mb-4">Add New Friends</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => {
          const requestSent = sentRequests.includes(user.id);

          return (
            <div
              key={user.id}
              className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition"
            >
              <img
                src={user.image}
                alt={user.username}
                className="w-20 h-20 rounded-full mb-3 ring-2 ring-purple-500"
              />
              <p className="text-white font-medium text-lg">{user.username}</p>

              <button
                onClick={() => handleAddFriend(user.id)}
                disabled={requestSent}
                className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold transition ${requestSent
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                  }`}
              >
                {requestSent ? <Check size={16} /> : <UserPlus size={16} />}
                {requestSent ? "Request Sent" : "Add Friend"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddFriend;
