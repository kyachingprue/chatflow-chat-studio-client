import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FriendRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 🔹 SENT REQUESTS
  const {
    data: sentRequests = [],
    refetch: refetchSent,
  } = useQuery({
    queryKey: ["sent-requests", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/friends/requests/sent/${user?.uid}`
      );
      return res.data;
    },
  });

  // 🔹 RECEIVED REQUESTS
  const {
    data: receivedRequests = [],
    refetch: refetchReceived,
  } = useQuery({
    queryKey: ["received-requests", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/friends/requests/received/${user?.uid}`
      );
      return res.data;
    },
  });

  // 🔹 REMOVE SENT REQUEST
  const removeRequest = async (receiverUid) => {
    try {
      await axiosSecure.delete("/friends/request", {
        data: {
          senderUid: user?.uid,
          receiverUid,
        },
      });
      toast.success("Friend request removed");
      refetchSent();
    } catch {
      toast.error("Failed to remove request");
    }
  };

  // 🔹 ACCEPT REQUEST
  const accept = async (senderUid) => {
    try {
      await axiosSecure.post("/friends/accept", {
        senderUid,
        receiverUid: user?.uid,
      });
      toast.success("Friend added successfully 🎉");
      refetchReceived();
    } catch {
      toast.error("Failed to accept request");
    }
  };

  // 🔹 REJECT REQUEST
  const reject = async (senderUid) => {
    try {
      await axiosSecure.delete("/friends/request", {
        data: {
          senderUid,
          receiverUid: user?.uid,
        },
      });
      toast.success("Friend request rejected");
      refetchReceived();
    } catch {
      toast.error("Failed to reject request");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* 🔹 SENT REQUESTS */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          📤 Sent Friend Requests
        </h2>

        {sentRequests.map(r => (
          <div
            key={r.receiverUid}
            className="bg-white/5 p-4 rounded-xl flex gap-4 mb-3"
          >
            <img
              src={r.receiver.image}
              className="w-14 h-14 rounded-full"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{r.receiver.name}</h3>
              <p className="text-sm text-gray-400">{r.receiver.email}</p>

              <div className="flex gap-2 mt-2">
                <button
                  disabled
                  className="px-3 py-1 bg-gray-500 rounded"
                >
                  Request Sent
                </button>
                <button
                  onClick={() => removeRequest(r.receiverUid)}
                  className="px-3 py-1 bg-red-600 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 RECEIVED REQUESTS */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          📥 Friend Requests
        </h2>

        {receivedRequests.map(r => (
          <div
            key={r.senderUid}
            className="bg-white/5 p-4 rounded-xl flex gap-4 mb-3"
          >
            <img
              src={r.sender.image}
              className="w-14 h-14 rounded-full"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{r.sender.name}</h3>
              <p className="text-sm text-gray-400">{r.sender.email}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => accept(r.senderUid)}
                  className="px-3 py-1 bg-green-600 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => reject(r.senderUid)}
                  className="px-3 py-1 bg-red-600 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FriendRequests;
