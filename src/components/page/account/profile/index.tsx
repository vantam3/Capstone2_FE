"use client";
import React from "react";
import Sidebar from "./components/side-bar";
import OverView from "./components/over-view";

function Profile() {
  return (
    <>
      <div className="mt-[4rem] sm:mt-[10rem] max-w-screen-lg mx-auto sm:p-2 p-6">
        <div className="text-white">Thông tin tài khoản</div>
        <div className="text-white text-sm">
          Quản lý tài khoản cá nhân và cài đặt tài khoản của bạn
        </div>
      </div>
      <div className="w-full max-w-screen-lg mt-0 mx-auto  grid grid-cols-1 sm:grid-cols-[25%_75%] gap-2 sm:gap-4">
        <Sidebar />
        <OverView />
      </div>
    </>
  );
}

export default Profile;
