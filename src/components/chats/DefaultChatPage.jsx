import React from "react";
import { IoChatbubblesOutline } from "react-icons/io5";

const DefaultChatPage = () => {
  return (
    <div className="flex flex-col  items-center justify-center space-y-4 h-full text-gray-500 ">
      <div className="flex space-x-4 items-center">
        <IoChatbubblesOutline className="w-16 h-16 " />
        <span className="text-4xl"> Let's Chat </span>
      </div>
      <div>
        <span>Send and receive messages </span>
      </div>
    </div>
  );
};

export default DefaultChatPage;
