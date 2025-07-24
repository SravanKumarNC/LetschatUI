import { useCallback, useEffect, useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import DefaultChatPage from "../DefaultChatPage";
import { socket } from "../../../services/socket";
import { fetchMessagesApi } from "../../../services/apiServices";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import ChatHeaderWithoutCalling from "./ChatHeaderWithoutCalling";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const { user, selectedChat, setChats } = ChatState();

  const fetchMessages = useCallback(async () => {
    if (!user?.token) return;
    try {
      const data = await fetchMessagesApi(selectedChat._id, user.token);
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch chats", error);
    }
  }, [user?.token, selectedChat?._id]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("userInfo"));

    // Only fetch chats if user exists
    if (localUser && selectedChat) {
      fetchMessages();
    }
  }, [fetchMessages, selectedChat]);

  useEffect(() => {
    socket.on("message recived", (newMessageRecieved) => {
      if (!selectedChat || selectedChat._id !== newMessageRecieved.chat._id) {
        console.log("");
      } else {
        setMessages((prev) => [...prev, newMessageRecieved]);
      }

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === newMessageRecieved.chat._id
            ? { ...chat, latestMessage: newMessageRecieved }
            : chat
        )
      );
    });
    return () => {
      socket.off("message recived");
    };
  }, [selectedChat, setChats]);
  return (
    <div className="chat-container flex flex-col h-full w-full">
      {selectedChat ? (
        <div className="flex flex-col h-full w-full">
          {/* Top bar */}
          <div className=" flex items-center px-2 h-14 w-full">
            <ChatHeaderWithoutCalling />
          </div>

          {/* Center Scrollable Messages container*/}
          <div className="flex-1 w-full flex flex-col bg-neutral-950 overflow-hidden">
            <Messages messages={messages} inputFocus={inputFocus}/>
          </div>

          {/* Bottom  Input to send Message*/}
          <div>
            <MessageInput setMessages={setMessages} setInputFocus={setInputFocus}/>
          </div>
        </div>
      ) : (
        <DefaultChatPage />
      )}
    </div>
  );
};

export default Chat;
