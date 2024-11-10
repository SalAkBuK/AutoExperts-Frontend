import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  transports: ['websocket'], // Specify the transport method
  withCredentials: true // Ensure credentials are sent
});

export default socket;
