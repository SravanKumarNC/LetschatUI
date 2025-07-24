import React, { useEffect, useRef } from "react";
import { getSender } from "../../../services/ChatLogics";
import { formatChatDate } from "../../../utils/FormateDate";
import { ChatState } from "../../../context/ChatProvider";
import { useSocketStore } from "../../../store/socketStore";
import ProfileDp from "../../ProfileDp";
import TypingIndicator from "../../typingAnimation/TypingAnimation";

const Messages = ({ messages, inputFocus }) => {
  const { user, selectedChat } = ChatState();

  const globalTypingStatus = useSocketStore(
    (state) => state.globalTypingStatus
  );
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, globalTypingStatus, selectedChat, inputFocus]);

  return (
    <div className="flex-1 overflow-y-auto flex flex-col  px-4 py-2 space-y-2 scroll-container">
      <div className="w-full flex justify-center items-center h-[100%]">
        <div className="flex flex-col justify-center items-center">
          <ProfileDp
            name={
              !selectedChat?.isGroupChat
                ? getSender(user, selectedChat?.users)
                : selectedChat?.chatName
            }
          />
          <span className="font-medium">
            {!selectedChat?.isGroupChat
              ? getSender(user, selectedChat?.users)
              : selectedChat?.chatName}
          </span>
          <span>
            This chat is created on {formatChatDate(selectedChat.createdAt)}
          </span>
        </div>
      </div>
      {messages.map((msg) => {
        const isSender = msg?.sender?._id === user?._id;
        return (
          <div
            key={msg?._id}
            className={`message relative max-w-xs break-words px-3 py-2 text-white ${
              isSender
                ? "self-end bg-green-600 rounded-lg rounded-br-none"
                : "self-start bg-gray-700 rounded-lg rounded-bl-none"
            }`}
          >
            {/* Tail triangle */}
            <div
              className={`absolute top-0 w-0 h-0 border-t-[10px] border-t-transparent
              border-b-[10px] border-b-transparent 
              ${
                isSender
                  ? "right-0 border-l-[10px] border-l-green-600"
                  : "left-0 border-r-[10px] border-r-gray-700"
              }`}
            />
            <div className="flex flex-col">
              <span className="text-[10px]">
                {msg?.chat?.isGroupChat && msg?.sender?._id !== user?._id
                  ? msg?.sender?.name
                  : ""}
              </span>
              <span className="break-words whitespace-pre-wrap">
                {msg.content}
              </span>
            </div>
          </div>
        );
      })}
      {globalTypingStatus[selectedChat._id]?.isTyping && (
        <div className="typing-indicator space-x-2 text-gray-400  p-2 rounded-b-md ">
          <span>{globalTypingStatus[selectedChat._id]?.user}</span>
          <TypingIndicator />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
