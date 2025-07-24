import React, { useCallback, useEffect } from "react";
import { ChatState } from "../../../context/ChatProvider";
import { getSender } from "../../../services/ChatLogics";
import { formatChatDate } from "../../../utils/FormateDate";
import { useSocketStore } from "../../../store/socketStore";
import ProfileDp from "../../ProfileDp";
import { fetchChatsApi } from "../../../services/apiServices";
import TypingIndicator from "../../typingAnimation/TypingAnimation";

const ChatsList = () => {
  const { user, chats, setChats, setSelectedChat } = ChatState();
  const globalTypingStatus = useSocketStore(
    (state) => state.globalTypingStatus
  );
  const fetchChats = useCallback(async () => {
    if (!user?.token) return;
    try {
      const data = await fetchChatsApi(user.token);
      setChats(data);
    } catch (error) {
      console.error("Failed to fetch chats", error);
    } finally {
      // setLoading(false);
    }
  }, [user?.token, setChats]);

  useEffect(() => {
    if (user) {
      fetchChats(user.token);
    }
  }, [fetchChats, user]);
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {chats?.map((chat) => (
        <div
          key={chat._id}
          className="flex items-center space-x-4 p-2 hover:bg-neutral-700 rounded-md cursor-pointer"
          onClick={() => setSelectedChat(chat)}
        >
          <div>
            <ProfileDp
              name={
                !chat.isGroupChat ? getSender(user, chat?.users) : chat.chatName
              }
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-300">
                {!chat.isGroupChat
                  ? getSender(user, chat?.users)
                  : chat.chatName}
              </span>
              <span className="text-xs text-gray-500">
                {formatChatDate(chat?.updatedAt)}
              </span>
            </div>
            <span className="text-sm text-gray-400 truncate">
              {globalTypingStatus[chat._id]?.isTyping ? (
                <div className="flex space-x-2">
                  <span>{globalTypingStatus[chat._id]?.user}</span>
                  <TypingIndicator />
                </div>
              ) : chat?.latestMessage?.sender?.name ? (
                `${chat?.latestMessage?.sender?.name}: ${
                  chat?.latestMessage?.content.length > 15
                    ? chat?.latestMessage?.content.substring(0, 16) + "...."
                    : chat?.latestMessage?.content
                }`
              ) : (
                "No messages yet"
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
