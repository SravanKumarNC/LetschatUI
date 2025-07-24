import React from "react";
import { IoArrowBack, IoChatbubblesOutline } from "react-icons/io5";
// import { ChatState } from "../context/ChatProvider";
// import { useWindowWidth } from "../utils/useWindowWidth";

const TopBar = () => {
  // const {
  //   selectedChat,
  //   setSelectedChat,
  // } = ChatState();
  // const width = useWindowWidth();

  // const shouldShowBackButton = selectedChat && width < 600;

  

  return (
    <div className="h-full w-full flex items-center space-x-2 bg-neutral-900 text-white">
      {/* {shouldShowBackButton && (
        <div className="cursor-pointer" onClick={() => setSelectedChat(null)}>
          <IoArrowBack className="w-6 h-6" />
        </div>
      )} */}

      <div className="flex flex-1 space-x-2 justify-center text-gray-500 font-semibold">
        <IoChatbubblesOutline className="w-6 h-6" />
        <span> Let's Chat </span>
      </div>
    </div>
  );
};

export default TopBar;
