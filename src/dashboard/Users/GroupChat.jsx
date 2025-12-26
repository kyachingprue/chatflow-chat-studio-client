import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";

const dummyGroups = [
  { id: 1, name: "Developers", isActive: true, image: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Designers", isActive: false, image: "https://i.pravatar.cc/40?img=2" },
  { id: 3, name: "Gamers", isActive: true, image: "https://i.pravatar.cc/40?img=3" },
  { id: 4, name: "Music Lovers", isActive: false, image: "https://i.pravatar.cc/40?img=4" },
];

const dummyMessages = [
  { id: 1, sender: "group", text: "Welcome to the group chat!" },
  { id: 2, sender: "me", text: "Hi everyone, glad to be here." },
  { id: 3, sender: "group", text: "Feel free to introduce yourself 😄" },
  { id: 4, sender: "me", text: "I’m a frontend developer!" },
];

const GroupChat = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className="h-[calc(100vh-64px)] flex bg-black/40 rounded-2xl overflow-hidden border border-white/10 shadow-lg">

      {/* LEFT – GROUP LIST */}
      <div
        className={`w-80 border-r border-white/10 bg-white/5 backdrop-blur-xl p-4 flex flex-col transition-transform duration-300
        ${selectedGroup ? "-translate-x-full absolute z-50 top-0 bottom-0 lg:translate-x-0 lg:relative" : ""}`}
      >
        {/* SEARCH */}
        <div className="mb-4">
          <div className="flex items-center bg-black/40 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-white/50" />
            <input
              placeholder="Search groups..."
              className="bg-transparent outline-none text-sm px-2 py-1 text-white w-full"
              disabled
            />
          </div>
        </div>

        {/* GROUP LIST */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2">
          {dummyGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition
                ${selectedGroup?.id === group.id ? "bg-pink-600/20" : "hover:bg-white/10"}`}
            >
              <img
                src={group.image}
                alt={group.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-white font-medium">{group.name}</p>
                <p className="text-xs text-white/50">
                  {group.isActive ? "Active now" : "Inactive"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT – CHAT AREA */}
      <div
        className={`flex-1 flex flex-col relative transition-transform duration-300
        ${!selectedGroup && "hidden lg:flex"}
        ${selectedGroup ? "flex-1 absolute inset-0 z-40 bg-black/80 lg:relative lg:bg-transparent" : ""}`}
      >
        {/* TOP HEADER */}
        <div className="h-16 flex items-center px-4 border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <button
            className="mr-4 p-2 rounded-lg hover:bg-white/10 lg:hidden"
            onClick={() => setSelectedGroup(null)}
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          {selectedGroup ? (
            <div className="flex items-center gap-3">
              <img
                src={selectedGroup.image}
                alt={selectedGroup.name}
                className="w-10 h-10 rounded-full ring-2 ring-pink-500"
              />
              <span className="text-white font-semibold">{selectedGroup.name}</span>
            </div>
          ) : (
            <span className="text-white/60">Select a group to start chatting 💬</span>
          )}
        </div>

        {/* CHAT MESSAGES */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-black/20">
          {selectedGroup &&
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

        {/* CHAT INPUT */}
        {selectedGroup && (
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

export default GroupChat;
