import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserPlus, UserMinus, Check } from "lucide-react";

const AddFriend = () => {
  const queryClient = useQueryClient();
  // ✅ Lazy initializer: token directly from localStorage
  const [token] = useState(() => localStorage.getItem("token") || null);

  // ✅ useQuery only runs when token is available
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["usersNotFriends"],
    queryFn: async () => {
      if (!token) throw new Error("User not authenticated");

      const res = await axios.get(
        "http://localhost:8000/api/users/not-friends",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return Array.isArray(res.data?.data) ? res.data.data : [];
    },
    enabled: !!token, // run query only if token exists
  });


  const [friendRequests, setFriendRequests] = useState({});
  const [friends, setFriends] = useState({});

  // Add friend mutation
  const addFriendMutation = useMutation({
    mutationFn: (userId) =>
      axios.post(
        `http://localhost:8000/api/friends/add/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: (data, userId) => {
      setFriendRequests((prev) => ({ ...prev, [userId]: true }));
      queryClient.invalidateQueries(["usersNotFriends"]);
    },
  });

  // Remove friend mutation
  const removeFriendMutation = useMutation({
    mutationFn: (userId) =>
      axios.delete(`http://localhost:8000/api/friends/remove/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: (data, userId) => {
      setFriends((prev) => {
        const newFriends = { ...prev };
        delete newFriends[userId];
        return newFriends;
      });
      setFriendRequests((prev) => {
        const newRequests = { ...prev };
        delete newRequests[userId];
        return newRequests;
      });
      queryClient.invalidateQueries(["usersNotFriends"]);
    },
  });

  if (isLoading) return <p className="text-white text-center">Loading users...</p>;
  if (isError) return <p className="text-red-500 text-center">Failed to load users</p>;

  return (
    <div className="p-4 flex flex-col space-y-4 h-full overflow-y-auto bg-black/40 rounded-2xl border border-white/10">
      <h1 className="text-2xl font-bold text-white mb-4">Add New Friends</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 shadow-lg"
          >
            <img
              src={user.image || "https://i.pravatar.cc/100"}
              alt={user.username}
              className="w-20 h-20 rounded-full mb-2"
            />
            <p className="text-white font-medium">{user.username}</p>

            <div className="mt-2 flex gap-2">
              {!friends[user._id] && !friendRequests[user._id] && (
                <button
                  onClick={() => addFriendMutation.mutate(user._id)}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  <UserPlus size={16} /> Add Friend
                </button>
              )}

              {friendRequests[user._id] && !friends[user._id] && (
                <button
                  disabled
                  className="flex items-center gap-2 px-3 py-1 bg-gray-600 text-white rounded-lg cursor-not-allowed"
                >
                  <Check size={16} /> Request Sent
                </button>
              )}

              {friends[user._id] && (
                <>
                  <button
                    disabled
                    className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg cursor-not-allowed"
                  >
                    <Check size={16} /> Friends
                  </button>
                  <button
                    onClick={() => removeFriendMutation.mutate(user._id)}
                    className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                  >
                    <UserMinus size={16} /> Remove
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddFriend;
