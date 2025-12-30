import { io } from 'socket.io-client';

const SOCKET_URL =
  import.meta.env.VITE_SERVER_URL ||
  'https://chatflow-studio-server.vercel.app';

const Socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: false,
});

export default Socket;
