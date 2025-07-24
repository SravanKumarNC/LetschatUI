import React from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { useWindowWidth } from "../utils/useWindowWidth";

const MainLayout = () => {
  const width = useWindowWidth();
  const mobileView = width < 600;
  return (
    <div className="flex w-screen h-screen">
      <div className="side-bar w-14">
        <SideBar />
      </div>
      <div className="flex flex-col flex-1">
        <div className="top-bar h-12">
          <TopBar />
        </div>

        <div
          className={`flex-1 overflow-auto ${
            !mobileView ? "rounded-tl-lg" : ""
          }  bg-neutral-800`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
