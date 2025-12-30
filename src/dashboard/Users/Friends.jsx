import { UserPlus, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const Friends = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: friends = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["friends", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/friends/${user.uid}`);
      return res.data;
    },
  });

  const deleteFriend = async (friendUid) => {
    try {
      await axiosSecure.delete("/friends", {
        data: {
          userUid: user.uid,
          friendUid,
        },
      });

      toast.success("Friend removed");
      refetch();
    } catch {
      toast.error("Failed to remove friend");
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading friends..."/>
  }

  return (
    <div className="flex flex-col h-full p-4 bg-black/40 rounded-2xl border border-white/10 overflow-hidden">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">My Friends</h1>

        <button
          onClick={() => navigate("/dashboard/add-friend")}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          <UserPlus size={18} />
          Add Friend
        </button>
      </div>

      {/* EMPTY STATE */}
      {friends.length === 0 && (
        <p className="text-white/60 text-center mt-10">
          You don’t have any friends yet 😢
        </p>
      )}

      {/* FRIENDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto flex-1">
        {friends.map(friend => (
          <div
            key={friend.uid}
            className="bg-white/5 rounded-xl p-4 flex flex-col h-56 items-center gap-3 hover:bg-white/10 transition shadow-md"
          >
            <img
              src={friend.image || "https://i.ibb.co/vC5WKqSk/9187532.png"}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-blue-200"
            />

            <div className="text-center">
              <p className="text-white font-semibold text-sm">
                {friend.name}
              </p>
              <p className="text-gray-400 pt-1 text-xs">
                {friend.email}
              </p>
            </div>

            <button
              onClick={() => deleteFriend(friend.uid)}
              className="my-2 flex items-center gap-1 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-lg text-white"
            >
              <Trash2 size={14} />
              Delete Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
