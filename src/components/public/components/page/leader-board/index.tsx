"use client";
import {
  ArrowLeftIcon,
  ChatBubbleBottomCenterIcon,
  SpeakerWaveIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import YourRanking from "./components/your-ranking";
import TableLeaderBoard from "./components/table";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const router = useNavigate();

  const tabs = [
    {
      name: "Weekly",
      code: "Weekly",
      current: true,
      icon: <ChatBubbleBottomCenterIcon className="w-4 h-4" />,
    },
    {
      name: "Monthly",
      code: "Monthly",
      current: true,
      icon: <SpeakerWaveIcon className="w-4 h-4" />,
    },
    {
      name: "All Time",
      code: "All Time",
      current: true,
      icon: <ChartBarIcon className="w-4 h-4" />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].code);

  return (
    <div>
      <div className=" mt-[5rem] sm:mt-[10rem] max-w-screen-2xl mx-auto sm:p-2 p-6">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 hover:bg-[#8861ea] rounded-[8px] cursor-pointer p-2"
            onClick={() => router("/home")}
          >
            <ArrowLeftIcon className="w-4 h-4 cursor-pointer text-white" />
            <p className="text-xs text-white ">Back</p>
          </div>
          <p className="text-2xl font-[600] text-white">Global Leaderboard</p>
        </div>
        <p className="text-sm text-white mt-2 ml-2">
          Compare your progress with other learners and see who's leading in
          speaking practice and challenges.
        </p>
        <YourRanking />
        <div className="mt-10 flex items-center">
          <div className="bg-[#4b2f8d] rounded-[10px] w-fit">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                {tabs.map((tab) => (
                  <option key={tab.code} value={tab.code}>
                    {tab.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block px-2 py-2">
              <nav className="flex space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.code}
                    onClick={() => setActiveTab(tab.code)}
                    className={`rounded-[10px] px-3 py-2 flex items-center justify-center gap-2 text-sm font-medium text-center ${
                      activeTab === tab.code
                        ? "bg-[#010005] text-white cursor-pointer"
                        : "text-white cursor-pointer"
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="max-w-sm ml-auto">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="US">All language</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 mt-4">
          <div className="mt-4 w-full p-4 bg-[#473033] border border-[#77552d] rounded-[16px] shadow-sm sm:p-6 ">
            <p className="text-white text-lg">#1</p>
            <div className="flex items-center mt-4 space-x-4">
              <div className="bg-[#553c5d] w-[70px] h-[70px] flex items-center justify-center rounded-full">
                <p className="text-base text-[#8861ea] sm:text-[14px] font-bold">
                  SA
                </p>
              </div>

              <div className="ml-2">
                <p className="text-base text-white sm:text-[20px] font-bold">
                  Sarah Johnson
                </p>
                <div className="flex items-center space-x-2">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
                  <p className="text-sm text-white"> 12% this week</p>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-base text-white sm:text-[14px] font-bold">
                Points
              </p>
              <p className="text-base text-[#815cda] sm:text-[16px] font-bold ml-auto">
                12,850
              </p>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-base text-white sm:text-[14px] font-bold">
                Streak
              </p>
              <p className="text-base text-white sm:text-[16px] flex items-center gap-2 font-bold ml-auto">
                <FireIcon className="w-4 h-4 text-[#ce6120]" />
                45 days
              </p>
            </div>
            <button
              type="button"
              className="text-white cursor-pointer mt-4 w-full bg-[#4b2f8d] hover:bg-[#4b2f8d] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              View Profile
            </button>
          </div>
          <div className="mt-4 w-full p-4 bg-[#322b4d] border border-[#514d68] rounded-[16px] shadow-sm sm:p-6 ">
            <p className="text-white text-lg">#1</p>
            <div className="flex items-center mt-4 space-x-4">
              <div className="bg-[#553c5d] w-[70px] h-[70px] flex items-center justify-center rounded-full">
                <p className="text-base text-[#8861ea] sm:text-[14px] font-bold">
                  SA
                </p>
              </div>

              <div className="ml-2">
                <p className="text-base text-white sm:text-[20px] font-bold">
                  Sarah Johnson
                </p>
                <div className="flex items-center space-x-2">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
                  <p className="text-sm text-white"> 12% this week</p>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-base text-white sm:text-[14px] font-bold">
                Points
              </p>
              <p className="text-base text-[#815cda] sm:text-[16px] font-bold ml-auto">
                12,850
              </p>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-base text-white sm:text-[14px] font-bold">
                Streak
              </p>
              <p className="text-base text-white sm:text-[16px] flex items-center gap-2 font-bold ml-auto">
                <FireIcon className="w-4 h-4 text-[#ce6120]" />
                45 days
              </p>
            </div>
            <button
              type="button"
              className="text-white cursor-pointer mt-4 w-full bg-[#4b2f8d] hover:bg-[#4b2f8d] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              View Profile
            </button>
          </div>
          <div className="mt-4 w-full p-4 bg-[#391a30] border border-[#5d2927] rounded-[16px] shadow-sm sm:p-6 ">
            <p className="text-white text-lg">#1</p>
            <div className="flex items-center mt-4 space-x-4">
              <div className="bg-[#553c5d] w-[70px] h-[70px] flex items-center justify-center rounded-full">
                <p className="text-base text-[#8861ea] sm:text-[14px] font-bold">
                  SA
                </p>
              </div>

              <div className="ml-2">
                <p className="text-base text-white sm:text-[20px] font-bold">
                  Sarah Johnson
                </p>
                <div className="flex items-center space-x-2">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
                  <p className="text-sm text-white"> 12% this week</p>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-base text-white sm:text-[14px] font-bold">
                Points
              </p>
              <p className="text-base text-[#815cda] sm:text-[16px] font-bold ml-auto">
                12,850
              </p>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-base text-white sm:text-[14px] font-bold">
                Streak
              </p>
              <p className="text-base text-white sm:text-[16px] flex items-center gap-2 font-bold ml-auto">
                <FireIcon className="w-4 h-4 text-[#ce6120]" />
                45 days
              </p>
            </div>
            <button
              type="button"
              className="text-white cursor-pointer mt-4 w-full bg-[#4b2f8d] hover:bg-[#4b2f8d] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              View Profile
            </button>
          </div>
        </div>
        <div className="mt-6">
          <TableLeaderBoard />
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
