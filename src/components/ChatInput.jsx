import { Image, Paperclip, Send, Smile } from "lucide-react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const ChatInput = ({ friend }) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Send message:", message, "to", friend.username);
    setMessage("");
  };

  return (
    <div className="border-t border-white/10 p-4 bg-white/5">
      {showEmoji && (
        <div className="absolute bottom-24 right-10 z-50">
          <EmojiPicker
            theme="dark"
            onEmojiClick={(e) => setMessage((prev) => prev + e.emoji)}
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <Paperclip className="text-white/60 cursor-pointer" />
        <Image className="text-white/60 cursor-pointer" />

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-black/40 rounded-xl px-4 py-2 text-white outline-none"
        />

        <Smile
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-white/60 cursor-pointer"
        />

        <button
          onClick={handleSend}
          className="bg-pink-600 hover:bg-pink-700 p-2 rounded-xl"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
