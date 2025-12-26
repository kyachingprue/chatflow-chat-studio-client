import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import FriendList from "../../components/FriendList";
import ChatHeader from "../../components/ChatHeader";
import ChatMessages from "../../components/ChatMessages";
import ChatInput from "../../components/ChatInput";

const Chat = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="h-[calc(100vh-64px)] flex bg-black/40 rounded-2xl overflow-hidden border border-white/10">

      {/* LEFT – FRIEND LIST */}
      <div
        className={`
          w-80 border-r border-white/10 bg-white/5 backdrop-blur-xl
          transition-transform duration-300
          lg:translate-x-0
          ${selectedFriend ? "-translate-x-full absolute z-50 top-0 bottom-0" : ""}
        `}
      >
        <FriendList onSelect={setSelectedFriend} selectedFriend={selectedFriend} />
      </div>

      {/* RIGHT – CHAT AREA */}
      <div
        className={`
          flex-1 flex flex-col
          transition-transform duration-300
          ${!selectedFriend && "hidden lg:flex"}
          ${selectedFriend ? "flex-1 absolute inset-0 z-40 bg-black/80" : ""}
        `}
      >
        {selectedFriend ? (
          <>
            {/* TOP BACK BUTTON - SMALL DEVICES */}
            <div className="lg:hidden flex items-center p-4 border-b border-white/10 bg-black/30 backdrop-blur-xl">
              <button
                className="mr-4 p-2 rounded-lg hover:bg-white/10"
                onClick={() => setSelectedFriend(null)}
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              <ChatHeader friend={selectedFriend} />
            </div>

            {/* CHAT AREA - LARGE DEVICES */}
            <div className="flex-1 flex flex-col">
              {selectedFriend && (
                <>
                  <div className="hidden lg:flex">
                    <ChatHeader friend={selectedFriend} />
                  </div>
                  <ChatMessages friendId={selectedFriend._id} />
                  <ChatInput friend={selectedFriend} />
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/60">
            Select a friend to start chatting 💬
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
