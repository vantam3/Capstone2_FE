"use client";
import {
  ArrowLeftIcon,
  ChatBubbleBottomCenterIcon,
  CheckCircleIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Example from "./components/example";
import Pronuciation from "./components/pronuciation";
import Conversation from "./components/convertsation";
import Grammar from "./components/grammar";

function Practice() {
  const tabs = [
    {
      name: "Pronunciation",
      code: "Pronunciation",
      current: true,
      icon: <MicrophoneIcon className="w-4 h-4" />,
    },
    {
      name: "Conversation",
      code: "Conversation",
      current: true,
      icon: <ChatBubbleBottomCenterIcon className="w-4 h-4" />,
    },
    {
      name: "Grammar",
      code: "Grammar",
      current: true,
      icon: <CheckCircleIcon className="w-4 h-4" />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].code);
  const router = useRouter();

  return (
    <>
      <div className=" mt-[5rem] sm:mt-[10rem] sm:p-2 max-w-screen-2xl mx-auto p-6">
        <div className="flex items-center gap-4 ">
          <ArrowLeftIcon
            className="w-4 h-4 cursor-pointer text-white"
            onClick={() => router.push("/")}
          />
          <p className="text-xs text-white ">Back</p>
          <p className="text-2xl font-[600] text-white">Speaking Practice</p>
        </div>
        <p className="text-sm text-white mt-2">
          Perfect your pronunciation and speaking skills with real-time AI
          feedback. Choose an exercise type below to get started.
        </p>
        <div className=" mt-4 sm:mt-10 bg-[#4b2f8d] max-w-screen-lg mx-auto rounded-[10px]">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
            <nav className="flex space-x-4 ">
              {tabs.map((tab) => (
                <button
                  key={tab.code}
                  onClick={() => setActiveTab(tab.code)}
                  className={`rounded-[10px] px-3 py-2 flex items-center justify-center gap-2 text-sm font-medium w-full text-center ${
                    activeTab === tab.code
                      ? "bg-[#010005] text-white cursor-pointer"
                      : "text-white  cursor-pointer"
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {activeTab === "Pronunciation" ? (
        <Pronuciation />
      ) : activeTab === "Conversation" ? (
        <Conversation />
      ) : (
        <Grammar />
      )}

      <Example />
    </>
  );
}

export default Practice;
