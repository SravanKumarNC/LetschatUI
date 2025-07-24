import { create } from "zustand";
import { socket } from "../services/socket";
// import { ChatState } from "../context/ChatProvider";
export const useSocketStore = create((set, get) => ({
  socketConnected: false,
  globalTypingStatus: {},

  connectSocket: (user) => {
    if (!user) return;

    socket.emit("setup", user);

    if (socket.connected) {
      set({ socketConnected: true });
    }

    socket.on("connect", () => {
      console.log("conneting to socket");
      set({ socketConnected: true });
    });

    socket.on("disconnect", () => {
      set({ socketConnected: false });
    });

    socket.on("typing", (data) => {
      console.log("typing listener in store", data);
      set((state) => ({
        globalTypingStatus: {
          ...state.globalTypingStatus,
          [data.room]: { isTyping: true, user: data.user },
        },
      }));
    });
    console.log(get);
    socket.on("stop typing", (data) => {
      set((state) => {
        const newStatus = { ...state.globalTypingStatus };
        if (newStatus[data.room]) {
          delete newStatus[data.room];
        }
        return { globalTypingStatus: newStatus };
      });
    });

    
    
  },
  cleanupSocket: () => {
    socket.off("setup");
    socket.off("connect");
    socket.off("disconnect");
    socket.off("typing");
    socket.off("stop typing");
  },
}));
