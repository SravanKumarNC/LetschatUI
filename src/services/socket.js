import { io } from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_API_SOCKET_URL;
// const ENDPOINT ="http://192.168.190.18:5000"

export const socket = io(ENDPOINT);
