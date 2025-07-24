import { ChatState } from "../../../context/ChatProvider";
import { getSender } from "../../../services/ChatLogics";
import { useWindowWidth } from "../../../utils/useWindowWidth";
import ProfileDp from "../../ProfileDp";
import { IoArrowBack } from "react-icons/io5";

const ChatHeaderWithoutCalling = () => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const width = useWindowWidth();

  const shouldShowBackButton = selectedChat && width < 600;
  return (
    <div className="w-full flex justify-between">
      <div className="flex items-center space-x-4 ">
        {shouldShowBackButton && (
          <div className="cursor-pointer" onClick={() => setSelectedChat(null)}>
            <IoArrowBack className="w-6 h-6" />
          </div>
        )}
        <div className="">
          <ProfileDp
            name={
              !selectedChat?.isGroupChat
                ? getSender(user, selectedChat?.users)
                : selectedChat?.chatName
            }
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <span className="font-medium">
              {!selectedChat?.isGroupChat
                ? getSender(user, selectedChat?.users)
                : selectedChat?.chatName}
            </span>
          </div>
          <span className="text-sm text-gray-400 truncate">
            select to see contact info
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeaderWithoutCalling;
