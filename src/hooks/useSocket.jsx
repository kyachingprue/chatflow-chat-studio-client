import { useEffect, useState } from "react";
import Socket from "../services/Socket";
import useAuth from "./useAuth";

const useSocket = () => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;

    // connect only if not connected
    if (!Socket.connected) {
      Socket.connect();
    }

    const onConnect = () => {
      Socket.emit("join", user?.uid);
      setSocket(Socket);
    };

    Socket.on("connect", onConnect);

    return () => {
      Socket.off("connect", onConnect);
      // ❌ DO NOT disconnect here (important)
    };
  }, [user?.uid]);

  return socket;
};

export default useSocket;
