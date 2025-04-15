import {
  ArrowLeftIcon,
  BookOpenIcon,
  CheckCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChooseTopic from "./components/choose-topic";
import TakeTest from "./components/take-test";
import Result from "./components/result";

function Practice() {
  const tabs = [
    {
      name: "Choose topic",
      code: "tab_1",
      current: true,
      icon: <BookOpenIcon className="w-6 h-6" />,
    },
    {
      name: "Take the test",
      code: "tab_2",
      current: true,
      icon: <PencilSquareIcon className="w-6 h-6" />,
    },
    {
      name: "Result",
      code: "tab_3",
      current: true,
      icon: <CheckCircleIcon className="w-6 h-6" />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].code);
  const [selectedLevel, setSelectedLevel] = useState(null); // Level được chọn
  const [selectedTopic, setSelectedTopic] = useState(null); // Topic được chọn
  const router = useNavigate();

  return (
    <>
      <div className="mt-[5rem] sm:mt-[8rem] sm:p-2 max-w-screen-lg mx-auto p-6">
        <div className="flex items-center gap-4 ">
          <ArrowLeftIcon
            className="w-4 h-4 cursor-pointer text-white"
            onClick={() => router("/home")}
          />
          <p className="text-xs text-white ">Back</p>
          <p className="text-2xl font-[600] text-white">Speaking Practice</p>
        </div>
        <p className="text-sm text-white mt-2">
          Choose the topic you want to learn and the level that suits your
          ability.
        </p>

        <div className="mt-4 bg-[#4b2f8d] max-w-screen-2xl mx-auto rounded-[10px]">
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
        {activeTab === "tab_1" ? (
          <ChooseTopic
            setActiveTab={setActiveTab}
            selectedLevel={selectedLevel}
            selectedTopic={selectedTopic}
            setSelectedLevel={setSelectedLevel}
            setSelectedTopic={setSelectedTopic}
          />
        ) : activeTab === "tab_2" ? (
          <TakeTest
            selectedLevel={selectedLevel}
            selectedTopic={selectedTopic}
          />
        ) : (
          <Result />
        )}
      </div>
    </>
  );
}

export default Practice;
