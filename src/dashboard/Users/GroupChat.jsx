import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ChatHeader from "../../components/ChatHeader";
import ChatMessages from "../../components/ChatMessages";
import ChatInput from "../../components/ChatInput";

const GroupChat = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Fetch groups
  const { data: groupsData } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const res = await axios.get("/api/groups");
      return res.data; // res.data might be { success: true, data: [...] }
    },
  });

  // Extract the array safely
  const groups = Array.isArray(groupsData?.data) ? groupsData.data : [];

  return (
    <div className="h-[calc(100vh-64px)] flex bg-black/40 rounded-2xl overflow-hidden border border-white/10">

      {/* LEFT – GROUP LIST */}
      <div
        className={`
          w-80 border-r border-white/10 bg-white/5 backdrop-blur-xl
          transition-transform duration-300
          lg:translate-x-0
          ${selectedGroup ? "-translate-x-full absolute z-50 top-0 bottom-0" : ""}
        `}
      >
        {/* SEARCH */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center bg-black/40 rounded-lg px-3">
            <Search className="w-4 h-4 text-white/50" />
            <input
              placeholder="Search groups..."
              className="bg-transparent outline-none text-sm px-2 py-2 text-white w-full"
            />
          </div>
        </div>

        {/* GROUPS */}
        <div className="flex-1 overflow-y-auto">
          {groups.map((group) => (
            <div
              key={group._id}
              onClick={() => setSelectedGroup(group)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition
              ${selectedGroup?._id === group._id
                  ? "bg-pink-600/20"
                  : "hover:bg-white/10"}`}
            >
              <div className="relative">
                <img
                  src={group.image || "https://i.pravatar.cc/40"}
                  className="w-10 h-10 rounded-full"
                  alt={group.name}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{group.name}</p>
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
        className={`
          flex-1 flex flex-col
          transition-transform duration-300
          ${!selectedGroup && "hidden lg:flex"}
          ${selectedGroup ? "flex-1 absolute inset-0 z-40 bg-black/80" : ""}
        `}
      >
        {selectedGroup ? (
          <>
            {/* TOP BACK BUTTON - SMALL DEVICES */}
            <div className="lg:hidden flex items-center p-4 border-b border-white/10 bg-black/30 backdrop-blur-xl">
              <button
                className="mr-4 p-2 rounded-lg hover:bg-white/10"
                onClick={() => setSelectedGroup(null)}
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              <ChatHeader friend={selectedGroup} isGroup />
            </div>

            {/* CHAT AREA - LARGE DEVICES */}
            <div className="flex-1 flex flex-col">
              {selectedGroup && (
                <>
                  <div className="hidden lg:flex">
                    <ChatHeader friend={selectedGroup} isGroup />
                  </div>
                  <ChatMessages friendId={selectedGroup._id} isGroup />
                  <ChatInput friend={selectedGroup} isGroup />
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/60">
            Select a group to start chatting 💬
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupChat;
