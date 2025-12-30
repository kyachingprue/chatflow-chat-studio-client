import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useSocket from "../../hooks/useSocket";
import toast from "react-hot-toast";

const AddFriend = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const socket = useSocket();
  const [loadingId, setLoadingId] = useState(null);

  // 🔹 Fetch unknown users
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["unknown-users", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/unknown/${user?.uid}`);
      return res.data;
    },
  });

  // 🔹 Socket listener
  useEffect(() => {
    if (!socket) return;

    socket.on("new-friend-request", ({ senderUid }) => {
      console.log("New request from:", senderUid);
    });

    return () => {
      socket.off("new-friend-request");
    };
  }, [socket]);

  const sendRequest = async (uid) => {
    try {
      setLoadingId(uid);

      await axiosSecure.post("/friends/request", {
        senderUid: user?.uid,
        receiverUid: uid,
      });

      if (socket) {
        socket.emit("friend-request", {
          senderUid: user?.uid,
          receiverUid: uid,
        });
      }
      toast.success("Friend request successful")
      refetch();
    } catch (error) {
      if (error.response?.status === 409) {
        toast.success("Request already sent");
      } else {
        console.error(error);
        toast.error("Request faild")
      }
    } finally {
      setLoadingId(null);
    }
  };

  const removeRequest = async (uid) => {
    try {
      setLoadingId(uid);
      await axiosSecure.delete("/friends/request", {
        data: { senderUid: user?.uid, receiverUid: uid },
      });
      toast.success("Friend request remove successfully")
      refetch();
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">

      {/* 🔹 Header */}
      <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
        <h2 className="text-xl font-semibold">➕ Add New Friend</h2>

        <Link
          to="/dashboard/friend-requests"
          className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700"
        >
          Friend Requests
        </Link>
      </div>

      {/* 🔹 Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 rounded-xl bg-white/5 animate-pulse">
              <div className="w-20 h-20 rounded-full bg-gray-600 mx-auto mb-3" />
              <div className="h-4 bg-gray-600 rounded mb-2" />
              <div className="h-3 bg-gray-700 rounded w-3/4 mx-auto" />
              <div className="h-8 bg-gray-600 rounded-full mt-4" />
            </div>
          ))}
        </div>
      )}

      {/* 🔹 User Cards */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map(u => (
            <div
              key={u.uid}
              className="bg-white/5 p-4 rounded-xl text-center hover:scale-[1.02] transition"
            >
              <img
                src={u.image || "https://i.ibb.co/vC5WKqSk/9187532.png"}
                className="w-20 h-20 rounded-full mx-auto object-cover mb-2"
              />
              <h3 className="font-semibold">{u.name}</h3>
              <p className="text-sm text-gray-400">{u.email}</p>

              {!u.requestSent ? (
                <button
                  onClick={() => sendRequest(u.uid)}
                  disabled={loadingId === u.uid}
                  className="mt-3 px-4 py-1 bg-purple-600 rounded-full disabled:opacity-50"
                >
                  {loadingId === u.uid ? "Sending..." : "Add Friend"}
                </button>
              ) : (
                <div className="mt-3 flex gap-2 justify-center">
                  <button disabled className="px-3 py-1 bg-gray-500 rounded-full">
                    Request Sent
                  </button>
                  <button
                    onClick={() => removeRequest(u.uid)}
                    disabled={loadingId === u.uid}
                    className="px-3 py-1 bg-red-500 rounded-full"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddFriend;
