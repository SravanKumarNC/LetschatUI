import React, { useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { VscSend } from "react-icons/vsc";
import { ChatState } from "../../../context/ChatProvider";
import { socket } from "../../../services/socket";
import { sendMessageApi } from "../../../services/apiServices";
import { useSocketStore } from "../../../store/socketStore";

const MessageInput = ({ setMessages, setInputFocus }) => {
  const [newMessage, setNewMessage] = useState("");
  const typingTimeoutRef = useRef(null);
  const socketConnected = useSocketStore((state) => state.socketConnected);

  const { user, selectedChat, setChats } = ChatState();
  const sendMessage = async () => {
    socket.emit("stop typing", { room: selectedChat._id });
    if (!newMessage.trim()) return;

    try {
      const data = await sendMessageApi({
        content: newMessage,
        chatId: selectedChat._id,
        token: user.token,
      });

      setMessages((prev) => [...prev, data]); // Add to existing messages
      socket.emit("new message", data);
      setNewMessage(""); // Clear input

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === data.chat._id ? { ...chat, latestMessage: data } : chat
        )
      );
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    socket.emit("typing", { room: selectedChat._id, user: user?.name });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop typing", { room: selectedChat._id });
    }, 2000);
  };
  const handleFocus = () => {
    setInputFocus(true);
  };
  const handleBlur = () => {
    setInputFocus(false);
  };
  return (
    <div className="h-14 w-full flex items-center bg-neutral-800 border-[1px] border-black px-2 py-1">
      <BsEmojiSmile className="text-gray-500 w-5 h-5 cursor-pointer mx-4" />
      <input
        type="text"
        value={newMessage}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => handleInputChange(e)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message"
        className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
      />
      <VscSend
        onClick={sendMessage}
        className="text-gray-500 w-5 h-5 mr-2 cursor-pointer"
      />
    </div>
  );
};

export default MessageInput;
