import {
  ArrowLeftIcon,
  FireIcon,
  ChatBubbleBottomCenterIcon,
  CheckCircleIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  ChartBarIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChallengeDetail() {
  const router = useNavigate();

  const tabs = [
    {
      name: "Exercises",
      code: "Exercises",
      current: true,
      icon: <ChatBubbleBottomCenterIcon className="w-4 h-4" />,
    },
    {
      name: "Resources",
      code: "Resources",
      current: true,
      icon: <SpeakerWaveIcon className="w-4 h-4" />,
    },
    {
      name: "My Stats",
      code: "My Stats",
      current: true,
      icon: <ChartBarIcon className="w-4 h-4" />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].code);

  const leaderBoard = [
    {
      name: "Emma Williams",
      avatar: "EW",
      status: "Completed",
      point: 245,
    },
    {
      name: "David Chen",
      avatar: "DC",
      status: "Completed",
      point: 245,
    },
    {
      avatar: "SJ",
      name: "Sarah Johnson",
      status: "Completed",
      point: 245,
    },
    {
      name: "Michael Smith",
      avatar: "MS",
      status: "In Progress",
      point: 245,
    },
    {
      name: "Sophia Rodriguez",
      avatar: "SR",
      status: "In Progress",
      point: 245,
    },
    {
      name: "Current User",
      avatar: "CU",
      status: "In Progress",
      point: 245,
    },
  ];

  return (
    <>
      <div className="gap-4 p-6">
        {/* header bar */}
        <div className="max-w-screen-2xl mx-auto mt-[6rem] gap-4 p-6">
          <div className="sm:flex items-center">
            <div className="flex items-center gap-2">
              <ArrowLeftIcon
                className="w-4 h-4 cursor-pointer text-white"
                onClick={() => router("/challenges")}
              />
              <p className="text-xs text-white">Back to Challenges</p>
            </div>
            <div className="sm:flex items-center sm:ml-auto space-y-4 space-x-4 sm:space-y-0 mt-4 sm:mt-0">
              <div className="relative inline-flex items-center rounded-full p-[8px] font-bold text-[11px] text-[#f59e09] ring-1 ring-[#3b2372] bg-[#1e0e08]">
                Intermediate
              </div>
              <div className="relative inline-flex items-center rounded-full p-[8px] font-bold text-[11px] text-[#8660e7] ring-1 ring-[#3b2372] bg-[#26164c]">
                250 Points
              </div>
              <div className="relative inline-flex items-center gap-1 rounded-full p-[8px] font-bold text-[11px] text-[#d2cce8] ring-1 ring-[#4b2f8d] bg-[#4b2f8d]">
                <ClockIcon className="w-4 h-4 text-white" /> 5 days left
              </div>
              <div className="relative inline-flex items-center gap-1 rounded-full p-[8px] font-bold text-[11px] text-[#d2cce8] ring-1 ring-[#4b2f8d] bg-[#4b2f8d]">
                <UsersIcon className="w-4 h-4 text-white" />
                412 Participants
              </div>
            </div>
          </div>
        </div>
        {/* body */}
        <div className="sm:flex gap-6 p-6 max-w-screen-2xl mx-auto ">
          <div className="w-full sm:w-[65%]">
            <div>
              <p className="text-2xl font-[600] text-white">Travel Dialogue</p>
              <p className="text-sm text-white mt-2">
                This challenge focuses on helping you navigate real-world travel
                scenarios using natural, fluent language. You'll practice
                booking accommodations, asking for directions, handling
                transportation issues, and engaging in casual conversations
                while traveling.
              </p>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-white mt-2">In Progress </p>
                <p className="text-sm text-white mt-2">• 33% Complete </p>
              </div>
              <div className="w-full bg-[#4b2f8d] rounded-full h-2 mt-4">
                <div
                  className="bg-[#8861ea] h-2 rounded-full"
                  style={{ width: "45%" }}
                />
              </div>
              <button
                type="button"
                className="text-[#f1eefd] flex items-center justify-center gap-2 font-[600] cursor-pointer mt-4 bg-[#8861ea] hover:bg-[#8861ea] focus:ring-4 focus:ring-[#8861ea]  rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
              >
                <FireIcon className="w-6 h-6 text-white" />
                Continue Challenge
              </button>
              <div className="mt-10">
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
              </div>
              <div>
                <p className="text-2xl mt-4 font-[600] text-white">
                  Challenge Exercises
                </p>
                <div className="mt-4 w-full p-4 bg-[#02070b] border border-[#08361e] rounded-[16px] shadow-sm sm:p-6 ">
                  <div className="flex items-center">
                    <h5 className="mb-2 text-xl font-bold text-white">
                      Hotel Booking
                    </h5>
                    <div className="relative ml-auto flex items-center justify-center font-bold gap-1 rounded-full px-3 py-1 text-[12px] text-[#21b95b] ring-1 ring-[#4b2f8d] bg-[#1c243b]">
                      <CheckCircleIcon className="w-4 h-4 text-[#21b95b]" />
                      Completed
                    </div>
                  </div>
                  <p className="mb-5 text-base text-gray-500 sm:text-[16px] dark:text-gray-400">
                    Practice making hotel reservations, requesting specific room
                    features, and handling check-in conversations.
                  </p>
                  <button
                    type="button"
                    className="text-[#7e8a88] flex items-center w-full justify-center gap-2 font-[600] cursor-pointer mt-4 bg-[#127039] hover:bg-[#127039] focus:ring-4 focus:ring-[#127039] rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-[#7e8a88]" />
                    Completed
                  </button>
                </div>
              </div>
              <div className="w-full bg-[#02070b] border border-[#241647] rounded-[16px] shadow-sm mt-6 p-6">
                <div className="flex items-center">
                  <h5 className="mb-2 text-xl font-bold text-white">
                    Asking for Directions
                  </h5>
                  <div className="relative ml-auto flex items-center justify-center font-bold gap-1 rounded-full px-3 py-1 text-[12px] text-[#825de0] ring-1 ring-[#8861ea] bg-[#150b30]">
                    Current
                  </div>
                </div>
                <p className="mb-5 text-base text-gray-500 sm:text-[16px] dark:text-gray-400">
                  Learn how to ask for and understand directions to different
                  locations in a city.
                </p>
                <button
                  type="button"
                  className="text-white flex items-center w-full justify-center gap-2 font-[600] cursor-pointer mt-4 bg-[#8861ea] hover:bg-[#8861ea] focus:ring-4 focus:ring-[#8861ea] rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                  <MicrophoneIcon className="w-6 h-6 text-white" />
                  Start Exercise
                </button>
              </div>
            </div>

            <div className="w-full mt-6 bg-[#190b37] border border-[#4b2f8d] rounded-[16px] shadow-sm p-6">
              <h5 className="mb-2 text-xl font-bold text-white">
                Transportation Troubles
              </h5>
              <p className="mb-5 text-base text-gray-500 sm:text-[16px] dark:text-gray-400">
                Handle common issues with taxis, buses, trains, and other forms
                of transportation while traveling.
              </p>
              <button
                type="button"
                className="text-white flex items-center w-full justify-center gap-2 font-[600] cursor-pointer mt-4 bg-[#8861ea] hover:bg-[#8861ea] focus:ring-4 focus:ring-[#8861ea] rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
              >
                <MicrophoneIcon className="w-6 h-6 text-white" />
                Start Exercise
              </button>
            </div>
          </div>

          <div className="w-full sm:w-[35%] mt-6 sm:mt-0 ">
            <div className="w-full p-4 mx-auto bg-[#190b37] border border-[#4b2f8d] rounded-[16px]  shadow-sm sm:p-6">
              <div>
                <div className="flex items-center gap-2">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1499 19.35C11.7399 19.35 11.3999 19.01 11.3999 18.6V16.5C11.3999 16.09 11.7399 15.75 12.1499 15.75C12.5599 15.75 12.8999 16.09 12.8999 16.5V18.6C12.8999 19.01 12.5599 19.35 12.1499 19.35Z"
                      fill="#8861ea"
                    />
                    <path
                      d="M17.8999 22.75H6.3999V21C6.3999 19.48 7.6299 18.25 9.1499 18.25H15.1499C16.6699 18.25 17.8999 19.48 17.8999 21V22.75ZM7.8999 21.25H16.3999V21C16.3999 20.31 15.8399 19.75 15.1499 19.75H9.1499C8.4599 19.75 7.8999 20.31 7.8999 21V21.25V21.25Z"
                      fill="#8861ea"
                    />
                    <path
                      d="M18.1499 22.75H6.1499C5.7399 22.75 5.3999 22.41 5.3999 22C5.3999 21.59 5.7399 21.25 6.1499 21.25H18.1499C18.5599 21.25 18.8999 21.59 18.8999 22C18.8999 22.41 18.5599 22.75 18.1499 22.75Z"
                      fill="#8861ea"
                    />
                    <path
                      d="M18.43 12.44C18.22 12.44 18.01 12.35 17.86 12.18C17.67 11.96 17.62 11.65 17.74 11.39C18.08 10.61 18.25 9.78 18.25 8.91V5.91C18.25 5.56 18.19 5.22 18.07 4.86C18.06 4.83 18.05 4.79 18.04 4.75C18.01 4.6 18 4.45 18 4.31C18 3.9 18.34 3.56 18.75 3.56H19.35C21.14 3.56 22.6 5.06 22.6 6.91C22.6 8.44 21.97 9.95 20.88 11.04C20.86 11.06 20.8 11.11 20.79 11.12C20.2 11.61 19.53 12.16 18.63 12.41C18.56 12.43 18.5 12.44 18.43 12.44ZM19.68 5.09C19.73 5.36 19.75 5.64 19.75 5.91V8.91C19.75 9.32 19.72 9.71 19.66 10.11C19.72 10.06 19.77 10.02 19.83 9.97C20.63 9.17 21.1 8.05 21.1 6.91C21.1 6.01 20.49 5.25 19.68 5.09Z"
                      fill="#8861ea"
                    />
                    <path
                      d="M5.5799 12.4C5.4999 12.4 5.4299 12.39 5.3499 12.36C4.5299 12.1 3.7599 11.62 3.1199 10.98C1.9699 9.71001 1.3999 8.32001 1.3999 6.85001C1.3999 5.03001 2.8299 3.60001 4.6499 3.60001H5.2999C5.5499 3.60001 5.7899 3.73001 5.9299 3.94001C6.0699 4.15001 6.0899 4.42001 5.9899 4.65001C5.8299 5.01001 5.7499 5.42001 5.7499 5.85001V8.85001C5.7499 9.71001 5.9199 10.55 6.2699 11.35C6.3899 11.62 6.3299 11.93 6.1399 12.15C5.9899 12.31 5.7899 12.4 5.5799 12.4ZM4.2999 5.13001C3.4899 5.29001 2.8999 5.99001 2.8999 6.85001C2.8999 7.94001 3.3399 8.99001 4.2099 9.95001C4.2499 10 4.2999 10.04 4.3499 10.08C4.2799 9.67001 4.2499 9.26001 4.2499 8.85001V5.85001C4.2499 5.61001 4.2699 5.37001 4.2999 5.13001Z"
                      fill="#8861ea"
                    />
                    <path
                      d="M12 16.75C7.73 16.75 4.25 13.27 4.25 9V6C4.25 3.38 6.38 1.25 9 1.25H15C17.62 1.25 19.75 3.38 19.75 6V9C19.75 13.27 16.27 16.75 12 16.75ZM9 2.75C7.21 2.75 5.75 4.21 5.75 6V9C5.75 12.45 8.55 15.25 12 15.25C15.45 15.25 18.25 12.45 18.25 9V6C18.25 4.21 16.79 2.75 15 2.75H9Z"
                      fill="#8861ea"
                    />
                  </svg>
                  <h5 className="text-2xl font-bold text-white">Leaderboard</h5>
                </div>
                <div className="mt-10">
                  {leaderBoard.map((item) => (
                    <div
                      className="flex items-center space-y-4"
                      key={item.name}
                    >
                      {/* Avatar */}
                      <div className="bg-[#331e60] w-[40px] h-[40px] flex items-center justify-center rounded-full">
                        <p className="text-base text-[#8861ea] sm:text-[14px] font-bold">
                          {item.avatar}
                        </p>
                      </div>

                      {/* Phần thông tin */}
                      <div className="ml-2 space-y-2">
                        <p className="text-base text-white sm:text-[14px] font-bold">
                          {item.name}
                        </p>
                        <div className="flex items-center">
                          {item.status === "Completed" ? (
                            <CheckCircleIcon className="w-4 h-4 text-[#21aa58]" />
                          ) : (
                            <ClockIcon className="w-4 h-4 text-[#f59e09]" />
                          )}

                          <p
                            className={`text-sm text-[${
                              item.status === "Completed"
                                ? "#21aa58"
                                : "#f59e09"
                            }]`}
                          >
                            {item.status}
                          </p>
                        </div>
                      </div>

                      {/* Điểm số */}
                      <p className="text-base text-[#8660e8] sm:text-[16px] font-bold ml-auto">
                        {item.status === "Completed" && `${item.point} pts`}
                      </p>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => router("/leader-board")}
                    className="text-white mt-4 cursor-pointer w-full border border-[#4b2f8d] bg-[#010005] hover:bg-[#010005]  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ring-[#4b2f8d]"
                  >
                    View Full Leaderboard
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full p-4 mx-auto bg-[#190b37] border border-[#4b2f8d] mt-8 rounded-[16px] shadow-sm sm:p-6">
              <div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-[#8861ea]" />
                  <h5 className="text-2xl font-bold text-white">
                    Challenge Schedule
                  </h5>
                </div>
                <div className="mt-10">
                  <div className="flex items-center">
                    <p className="text-base text-white sm:text-[14px] font-bold">
                      Start Date
                    </p>
                    <p className="text-base text-white sm:text-[16px] font-bold ml-auto">
                      March 22, 2025
                    </p>
                  </div>
                  <div className="flex items-center mt-4">
                    <p className="text-base text-white sm:text-[14px] font-bold">
                      End Date
                    </p>
                    <p className="text-base text-white sm:text-[16px] font-bold ml-auto">
                      March 27, 2025
                    </p>
                  </div>
                  <div className="flex items-center mt-4">
                    <p className="text-base text-white sm:text-[14px] font-bold">
                      Time Remaining
                    </p>
                    <p className="text-base text-[#f59e09] sm:text-[16px] font-bold ml-auto">
                      5 days
                    </p>
                  </div>
                  <div className="w-full bg-[#4b2f8d] rounded-full h-1.5 mb-4 mt-4">
                    <div
                      className="bg-[#8861ea] h-1.5 rounded-full"
                      style={{ width: "10%" }}
                    />
                  </div>
                  <p className="text-xs text-center text-white">
                    16% of time elapsed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChallengeDetail;
