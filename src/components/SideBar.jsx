import React from "react";
import {
  IoCallOutline,
  IoChatboxEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuCircleUser } from "react-icons/lu";
import { FaBahai } from "react-icons/fa";
const SideBar = () => {
  return (
    <div className="side-bar pt-14 pb-4 h-screen w-14 bg-neutral-900 flex flex-col items-center justify-between text-gray-500">
      <div>
        <div className="space-y-8 pb-4 border-b-2 border-neutral-600">
          <IoChatboxEllipsesOutline className="w-6 h-6 cursor-pointer" />
          <IoCallOutline className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="pt-4 ">
          <FaBahai className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      <div className="space-y-8 pt-4 border-t-2 border-neutral-600">
        <IoSettingsOutline className="w-6 h-6 cursor-pointer" />
        <LuCircleUser className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default SideBar;
