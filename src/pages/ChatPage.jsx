import React, { useEffect } from "react";
import ChatsContainer from "../components/chats/chatsContainer/ChatsContainer";
import Chat from "../components/chats/chat/Chat";
import "../App.css";
import { ChatState } from "../context/ChatProvider";
import { useSocketStore } from "../store/socketStore";

const ChatPage = () => {
  const { selectedChat } = ChatState();
  const { user } = ChatState();
  const connectSocket = useSocketStore((state) => state.connectSocket);
  const cleanupSocket = useSocketStore((state) => state.cleanupSocket);
  useEffect(() => {
    if (user) {
      connectSocket(user);
    }

    return () => {
      cleanupSocket();
    };
  }, [connectSocket, cleanupSocket, user]);
  return (
    <div className="w-full h-full text-white">
      <div
        className={`main-container ${
          selectedChat ? "show-chat" : ""
        } flex h-full w-full `}
      >
        <ChatsContainer />
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;
