import React from "react";
import { MicrophoneIcon } from "@heroicons/react/24/outline";

function Grammar() {
  return (
    <div className="p-6 sm:p-0">
      <div className="max-w-screen-2xl p-4 mx-auto bg-[#190b37] border border-[#291650] rounded-[16px] shadow-sm sm:p-8 ">
        <h5 className="mb-2 text-xl font-[600] text-white">Grammar Practice</h5>
        <p className="mb-5 text-base text-white text-[14px]">
          Practice your grammar with our Al feedback system. Speak clearly into
          your microphone, and our Al will analyze your speech patterns to
          provide you with detailed feedback.
        </p>

        <div className="border bg-[#201041] border-[#291650] mb-4 rounded-[16px] p-4">
          <h5 className="mb-2 text-sm text-white">Your exercise:</h5>
          <p className="mb-5 text-white text-lg italic">
            "How much wood would a woodchuck chuck if a woodchuck could chuck
            wood?"
          </p>
        </div>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 cursor-pointer">
          <a className="w-full sm:w-auto bg-[#8861ea] focus:ring-4 focus:outline-none text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ">
            <div className="text-left flex items-center gap-2">
              <MicrophoneIcon className="w-4 h-4" />
              <div className="text-xs">Start Recording</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Grammar;
