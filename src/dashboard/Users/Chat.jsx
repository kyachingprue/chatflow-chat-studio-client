import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const friends = [
  { id: 1, name: "Alice", avatar: "https://i.ibb.co/3cY7JxP/avatar1.png" },
  { id: 2, name: "Bob", avatar: "https://i.ibb.co/7YbX2xQ/avatar2.png" },
  { id: 3, name: "Charlie", avatar: "https://i.ibb.co/yW0mB9V/avatar3.png" },
];

const dummyMessages = [
  { id: 1, sender: "friend", text: "Hey! How are you doing today?" },
  { id: 2, sender: "me", text: "I'm good, thanks! Just working on a project." },
  { id: 3, sender: "friend", text: "Sounds cool! Need any help?" },
  { id: 4, sender: "me", text: "Not right now, but I’ll reach out later!" },
];

const Chat = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="h-[calc(100vh-64px)] flex bg-black/40 rounded-2xl overflow-hidden border border-white/10 shadow-lg">

      {/* FRIEND LIST */}
      <div
        className={`w-80 border-r border-white/10 bg-white/5 backdrop-blur-xl p-4 flex flex-col gap-4 transition-transform duration-300
        ${selectedFriend ? "-translate-x-full absolute z-50 top-0 bottom-0 lg:translate-x-0 lg:relative" : "translate-x-0"}`}
      >
        <h2 className="text-white font-bold text-lg mb-2">Friends</h2>
        {friends.map((friend) => (
          <div
            key={friend.id}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition
              ${selectedFriend?.id === friend.id ? "bg-purple-600/30" : ""}`}
            onClick={() => setSelectedFriend(friend)}
          >
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-10 h-10 rounded-full ring-2 ring-pink-500"
            />
            <span className="text-white font-medium">{friend.name}</span>
          </div>
        ))}
      </div>

      {/* CHAT AREA */}
      <div
        className={`flex-1 flex flex-col relative transition-transform duration-300
        ${!selectedFriend ? "hidden lg:flex" : "flex-1 absolute inset-0 z-40 bg-black/80"}`}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center px-4 border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <button
            className="mr-4 p-2 rounded-lg hover:bg-white/10 lg:hidden"
            onClick={() => setSelectedFriend(null)}
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          {selectedFriend ? (
            <div className="flex items-center gap-3">
              <img
                src={selectedFriend.avatar}
                alt={selectedFriend.name}
                className="w-10 h-10 rounded-full ring-2 ring-pink-500"
              />
              <span className="text-white font-semibold">{selectedFriend.name}</span>
            </div>
          ) : (
            <span className="text-white/60 font-medium">Select a friend to start chatting 💬</span>
          )}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-black/20">
          {selectedFriend &&
            dummyMessages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === "me"
                  ? "self-end bg-purple-600 text-white"
                  : "self-start bg-white/10 text-white"
                  }`}
              >
                {msg.text}
              </div>
            ))}
        </div>

        {/* INPUT */}
        {selectedFriend && (
          <div className="h-16 flex items-center px-4 border-t border-white/10 bg-black/30 backdrop-blur-xl gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-white/10 text-white rounded-full px-4 py-2 focus:outline-none placeholder-white/50"
              disabled
            />
            <button className="px-4 py-2 bg-purple-600 rounded-full text-white font-semibold cursor-not-allowed">
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
