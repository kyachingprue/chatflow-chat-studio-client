import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const FriendRequests = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:8000/api/friends/received",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data?.data || [];
    },
    enabled: !!token,
  });

  const acceptMutation = useMutation({
    mutationFn: (senderId) =>
      axios.post(
        "http://localhost:8000/api/friends/accept",
        { senderId },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: () =>
      queryClient.invalidateQueries([
        "friendRequests",
        "friendRequestCount",
      ]),
  });

  const rejectMutation = useMutation({
    mutationFn: (senderId) =>
      axios.post(
        "http://localhost:8000/api/friends/reject",
        { senderId },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: () =>
      queryClient.invalidateQueries([
        "friendRequests",
        "friendRequestCount",
      ]),
  });

  if (isLoading) return <p className="text-white">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-white">Friend Requests</h2>

      {requests.length === 0 && (
        <p className="text-gray-400">No friend requests</p>
      )}

      {requests.map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between bg-white/5 p-3 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <img
              src={user.image || "https://i.pravatar.cc/100"}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-white">{user.username}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => acceptMutation.mutate(user._id)}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Accept
            </button>
            <button
              onClick={() => rejectMutation.mutate(user._id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
