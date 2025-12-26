const ChatHeader = ({ friend }) => {
  return (
    <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10 bg-white/5">
      <img src={friend.image} className="w-10 h-10 rounded-full" />
      <div>
        <p className="font-semibold text-white">{friend.username}</p>
        <p className="text-xs text-white/50">
          {friend.isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
