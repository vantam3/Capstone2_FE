import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

function PracticeHistory() {
  const router = useNavigate();
  return (
    <div className="mt-[5rem] sm:mt-[8rem] sm:p-2 max-w-screen-2xl mx-auto p-6">
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-2 hover:bg-[#7e22cf] p-2 rounded-[8px] cursor-pointer"
          onClick={() => router("/practice")}
        >
          <ArrowLeftIcon className="w-4 h-4 cursor-pointer text-white" />
          <p className="text-xs text-white">Back</p>
        </div>
        <p className="text-2xl font-[600] text-white">Practice History</p>
      </div>

      <div className="grid grid-cols-10 gap-4 mt-8">
        <div className="sm:col-span-3 col-span-1  flex flex-col gap-4">
          <div className="p-4 bg-[#190b37] border border-[#291650] rounded-[16px] shadow-sm">
            <h5 className="mb-2 text-xl font-bold text-white">Topic</h5>
            <div className="mt-4 p-2 space-y-4">
              <p className="text-sm text-white bg-[#7e22cf] rounded-[8px] p-2">
                Daily conversation
              </p>
              <p className="text-sm text-white bg-[#7e22cf] rounded-[8px] p-2">
                Business English
              </p>
              <p className="text-sm text-white bg-[#7e22cf] rounded-[8px] p-2">
                Travel and directions
              </p>
              <p className="text-sm text-white bg-[#7e22cf] rounded-[8px] p-2">
                Academic English
              </p>
              <p className="text-sm text-white bg-[#7e22cf] rounded-[8px] p-2">
                Culture and entertainment
              </p>
            </div>
          </div>
          <div className="p-4 bg-[#190b37] border border-[#291650] rounded-[16px] shadow-sm">
            <h5 className="mb-2 text-xl font-bold text-white">Level</h5>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-1">
                <span className="bg-[#bff7d1] text-[#649f6c] text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg">
                  Elementary
                </span>
                <p className="text-xs text-gray-400">
                  Easy, suitable for beginners
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="bg-[#f9ee8b] text-[#9e8240] text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg">
                  Intermediate level
                </span>
                <p className="text-xs text-gray-400">
                  Moderate difficulty, basic knowledge required
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="bg-[#fcc8cc] text-[#814448] text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg">
                  Upgrade
                </span>
                <p className="text-xs text-gray-400">
                  Difficult, suitable for experienced people
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="bg-[#ebd5fc] text-[#b38ad6] text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg">
                  Expert
                </span>
                <p className="text-xs text-gray-400">
                  Very difficult, for the expert
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-[#190b37] border border-[#291650] rounded-[16px] shadow-sm">
            <h5 className="mb-2 text-xl font-bold text-white">
              Board statistics
            </h5>
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <p className="text-xs">Level</p>
                  <p className="ml-auto text-xs">0/100</p>
                </div>
                <div className="w-full bg-[#4b2f8d] rounded-full h-1 mt-2">
                  <div
                    className="bg-[#8861ea] h-1 rounded-tl-lg rounded-bl-lg"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <p className="text-xs">Level</p>
                  <p className="ml-auto text-xs">0/100</p>
                </div>
                <div className="w-full bg-[#4b2f8d] rounded-full h-1 mt-2">
                  <div
                    className="bg-[#8861ea] h-1 rounded-tl-lg rounded-bl-lg"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <p className="text-xs">Level</p>
                  <p className="ml-auto text-xs">0/100</p>
                </div>
                <div className="w-full bg-[#4b2f8d] rounded-full h-1 mt-2">
                  <div
                    className="bg-[#8861ea] h-1 rounded-tl-lg rounded-bl-lg"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="text-white mt-4 w-full bg-[#000000] hover:bg-[#000000] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              View detail
            </button>
          </div>
          <div className="p-4 bg-[#190b37] border border-[#291650] rounded-[16px] shadow-sm">
            <h5 className="mb-2 text-xl font-bold text-white">
              Practice history
            </h5>
            <p className="text-sm text-gray-400">No training schedule yet</p>
          </div>
        </div>

        <div className="sm:col-span-7 col-span-1 self-start">
          <div className="p-6 bg-[#190b37] border border-[#291650] rounded-[16px] shadow-sm">
            <div className="flex items-center">
              <h5 className="mb-4 text-3xl font-bold text-white">
                Practice test
              </h5>
              <button
                type="button"
                className="text-white ml-auto bg-[#000000] hover:bg-[#000000] focus:ring-[#000000] border-[#000000] focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
              >
                Instruct
              </button>
            </div>
            <div className="p-6 bg-[#3b0960] border border-[#5e2880] rounded-[16px] shadow-sm mt-4">
              <h5 className="mb-4 text-lg font-bold text-white">
                Read the following sentence:
              </h5>
              <p className="text-base text-gray-400">
                I would like to order a cup of coffee, please.
              </p>
              <div className="flex items-center">
                <button
                  type="button"
                  className="text-white mt-4 bg-[#000000] hover:bg-[#000000] focus:ring-[#000000] border-[#000000] focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                >
                  Instruct
                </button>
                <button
                  type="button"
                  className="text-white mt-4 bg-[#000000] hover:bg-[#000000] focus:ring-[#000000] border-[#000000] focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                >
                  Instruct
                </button>
              </div>
            </div>
            <div className="p-6 bg-[#000000] border border-[#000000] rounded-[16px] shadow-sm mt-4">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="h-6 w-6 text-white" />
                <h5 className="text-lg font-bold text-white">
                  Examples of common pronunciation errors
                </h5>
              </div>
              <span className="text-sm text-gray-400">
                In the sentence: "I would like to order a cup of coffee,
                please."
              </span>
              <div className="p-6 bg-[#1b0432] border border-[#1b0432] rounded-[16px] shadow-sm mt-4">
                <p className="text-base text-gray-400">
                  I would like to order a cup of coffee, please.
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Hover over the red highlighted word to see the error
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p>Your recording</p>
              <div className="p-6 bg-[#502678] border border-[#502678] rounded-[16px] shadow-sm mt-4">
                <div className="flex items-center justify-center">
                  <svg
                    fill="white"
                    width="40px"
                    height="40px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13,4V20a1,1,0,0,1-2,0V4a1,1,0,0,1,2,0ZM8,5A1,1,0,0,0,7,6V18a1,1,0,0,0,2,0V6A1,1,0,0,0,8,5ZM4,7A1,1,0,0,0,3,8v8a1,1,0,0,0,2,0V8A1,1,0,0,0,4,7ZM16,5a1,1,0,0,0-1,1V18a1,1,0,0,0,2,0V6A1,1,0,0,0,16,5Zm4,2a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V8A1,1,0,0,0,20,7Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="bg-[#872ce1] rounded-full w-[50px] h-[50px] flex items-center justify-center">
                <MicrophoneIcon className="w-5 h-5 text-[#f4d8fd]" />
              </div>
              <p className="text-sm text-[#f4d8fd]">00:00 / 01:00</p>
            </div>
            <div className="flex items-end justify-end mt-4">
              <button
                type="button"
                className="text-white  bg-[#000000] hover:bg-[#000000] focus:ring-[#000000] border-[#000000] focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
              >
                Reset
              </button>
              <button
                type="button"
                className="text-white  bg-[#6829ab] hover:bg-[#6829ab] focus:ring-[#6829ab] border-[#6829ab] focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeHistory;
