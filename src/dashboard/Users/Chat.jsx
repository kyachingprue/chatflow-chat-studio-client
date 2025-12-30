import { ArrowLeft, Image, Send, Smile } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect, useRef, useState } from "react";
import Socket from "../../services/Socket";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import EmojiPicker from "emoji-picker-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Chat = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 

  const messagesEndRef = useRef(null);

  // Fetch logged-in user data
  const { data: userData } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // FRIEND LIST FETCH
  const { data: friends = [] , isLoading} = useQuery({
    queryKey: ["friends", userData?.uid],
    enabled: !!userData?.uid,
    queryFn: async () => {
      if (!userData?.uid) return [];
      const res = await axiosSecure.get(`/friends/${userData.uid}`);
      return res.data;
    },
  });

  // FETCH MESSAGES
  useEffect(() => {
    if (!selectedFriend || !userData?.uid) return;

    const fetchMessages = async () => {
      try {
        const res = await axiosSecure.get(
          `/messages?senderUid=${userData.uid}&receiverUid=${selectedFriend.uid || selectedFriend.friendUid}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [axiosSecure, selectedFriend, userData?.uid]);

  // SOCKET
  useEffect(() => {
    if (!userData?.uid) return;

    Socket.emit("join", userData.uid);

    const handleOnlineUsers = (users) => setOnlineUsers(users);
    const handleTyping = (data) => setTyping(data);

    const handleReceiveMessage = (msg) => {
      if (msg.senderUid !== userData.uid) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    Socket.on("online-users", handleOnlineUsers);
    Socket.on("receive-message", handleReceiveMessage);
    Socket.on("typing", handleTyping);

    return () => {
      Socket.off("online-users", handleOnlineUsers);
      Socket.off("receive-message", handleReceiveMessage);
      Socket.off("typing", handleTyping);
    };
  }, [userData?.uid]);


  // FILTERED MESSAGES
  const filteredMessages = selectedFriend
    ? messages.filter(
      (m) =>
        (m.senderUid === userData?.uid &&
          m.receiverUid === (selectedFriend.uid || selectedFriend.friendUid)) ||
        (m.senderUid === (selectedFriend.uid || selectedFriend.friendUid) &&
          m.receiverUid === userData?.uid)
    )
    : [];

  const sendMessage = async () => {
    if (!text.trim() && !selectedImage) return;
    if (!selectedFriend || !userData?.uid) return;

    const msg = {
      senderUid: userData.uid,
      receiverUid: selectedFriend.uid || selectedFriend.friendUid,
      text: text || "",
      image: selectedImage || "",
      createdAt: new Date(),
      senderImage: userData.image,
      receiverImage: selectedFriend.image,
    };

    try {
      // Server-এ POST
      const { data: savedMsg } = await axiosSecure.post("/messages", msg);
      setMessages((prev) => [...prev, savedMsg]);

      Socket.emit("send-message", savedMsg);

      setText("");
      setSelectedImage(null);
    } catch (err) {
      console.error(err);
    }
  };


  // HANDLE TYPING
  const handleTyping = (e) => {
    setText(e.target.value);
    Socket.emit("typing", {
      to: selectedFriend?.uid || selectedFriend?.friendUid,
      isTyping: e.target.value.length > 0,
    });
  };

  // SCROLL TO BOTTOM
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // FILTER FRIENDS
  const filteredFriends = friends.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      (f.friendUid || f.uid).toLowerCase().includes(search.toLowerCase())
  );

  if (!user || !userData) {
    return <LoadingSpinner text="Loading..." />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-50">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-full md:h-128 flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-white/10">
      {/* FRIEND LIST */}
      <div className={`w-full lg:w-60 bg-white/5 p-4 ${selectedFriend ? "hidden lg:block" : ""}`}>
        <input
          placeholder="Search friends..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 rounded-full bg-black/20 text-white"
        />
        {filteredFriends.map((friend, index) => {
          const friendId = friend.uid || friend.friendUid; // ✅ fix online check
          const isOnline = onlineUsers.includes(friendId);
          return (
            <div
              key={index}
              onClick={() => setSelectedFriend(friend)}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/10"
            >
              <div className="relative">
                <img src={friend.image} className="w-12 h-12 rounded-full" />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${isOnline ? "bg-blue-500" : "bg-gray-400"
                    }`}
                />
              </div>
              <div>
                <p className="font-semibold">{friend.name}</p>
                <p className={`text-xs ${isOnline ? "text-blue-400" : "text-gray-400"}`}>
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHAT SECTION */}
      <div className="flex-1 flex flex-col bg-black/30">
        {/* HEADER */}
        <div className="h-16 flex items-center px-4 border-b border-white/10">
          <button onClick={() => setSelectedFriend(null)} className="lg:hidden mr-3">
            <ArrowLeft />
          </button>
          {selectedFriend && (
            <>
              <img src={selectedFriend.image} className="w-10 h-10 rounded-full mr-3" />
              <span>{selectedFriend.name}</span>
            </>
          )}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {filteredMessages.map((m, idx) => (
            <div key={idx} className="flex items-end gap-2">
              {m.senderUid !== userData?.uid && <img src={m.senderImage} className="w-8 h-8 rounded-full" />}
              <div
                className={`px-4 py-2 rounded-xl max-w-xs text-white ${m.senderUid === userData?.uid ? "ml-auto bg-purple-600" : "bg-white/10"
                  }`}
              >
                {m.text && <p>{m.text}</p>}
                {m.image && <img src={m.image} className="mt-2 rounded-xl" />}
                <span className="text-xs text-gray-300 mt-1 block">
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              {m.senderUid === userData?.uid && <img src={m.senderImage} className="w-8 h-8 rounded-full" />}
            </div>
          ))}
          {typing && <p className="text-sm text-gray-400">Typing...</p>}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        {selectedFriend && (
          <div className="p-3 border-t border-white/10 flex items-center gap-2 relative">
            {/* Emoji Picker Button */}
            <button onClick={() => setShowEmoji(!showEmoji)} className="relative z-10 text-white">
              <Smile />
            </button>

            {/* Emoji Picker */}
            {showEmoji && (
              <div className="absolute bottom-14 left-0 z-50">
                <EmojiPicker onEmojiClick={(e) => setText(text + e.emoji)} height={350} width={300} />
              </div>
            )}

            {/* Image Upload Button */}
            <label className="cursor-pointer relative z-10 text-white">
              <Image />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setSelectedImage(URL.createObjectURL(file)); // ✅ preview image

                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

                  try {
                    const res = await fetch(
                      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
                      {
                        method: "POST",
                        body: formData,
                      }
                    );
                    const data = await res.json();
                    const imageUrl = data.secure_url;
                    setSelectedImage(imageUrl); // ✅ set uploaded image
                  } catch (err) {
                    console.error(err);
                  }
                }}
              />
            </label>

            {/* TEXT INPUT */}
            <input
              value={text}
              onChange={handleTyping}
              placeholder="Type a message..."
              className="flex-1 bg-black/40 px-4 py-2 rounded-full relative z-10 text-white"
            />

            {/* SEND BUTTON */}
            <button onClick={sendMessage} className="bg-purple-600 p-2 rounded-full relative z-10">
              <Send />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
