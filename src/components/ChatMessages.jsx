import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ChatMessages = ({ friendId }) => {
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", friendId],
    queryFn: async () => {
      const res = await axios.get(`/api/messages/${friendId}`);
      return res.data;
    },
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`max-w-xs px-4 py-2 rounded-xl
          ${msg.isMe
              ? "ml-auto bg-pink-600 text-white"
              : "bg-white/10 text-white"}`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
