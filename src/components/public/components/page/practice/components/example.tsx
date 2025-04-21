import React from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

function Example() {
  return (
    <div className="mt-10 p-6 sm:p-0">
      <div className="max-w-screen-2xl p-4 mx-auto bg-[#190b37] border border-[#291650] rounded-[16px] shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <SpeakerWaveIcon className="w-6 h-6 text-[#7c57d7]" />
          <h5 className="mb-2 text-xl font-[600] text-white">
            Example Pronunciation
          </h5>
        </div>
        <p className="mb-5 text-base text-white sm:text-lg">
          Listen to a native speaker pronounce the exercise phrase to help you
          with your practice.
        </p>

        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 cursor-pointer">
          <a className="w-full sm:w-auto bg-black border border-[#291650] focus:ring-4 focus:outline-none text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ">
            <div className="text-left flex items-center gap-2">
              <SpeakerWaveIcon className="w-4 h-4 " />
              <div className="text-xs">Play Audio Sample</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Example;
