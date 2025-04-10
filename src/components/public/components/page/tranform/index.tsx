import { ChevronRightIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Link } from "react-router-dom";

function Transform() {
  return (
    <div className="mt-16 p-4">
      <div className="sm:max-w-4xl w-full p-4 mx-auto text-center bg-[#190b37] border border-[#291650] rounded-[16px] shadow-sm sm:p-8">
        <h5 className="mb-2 text-3xl font-bold text-white">
          Ready to transform your language skills?
        </h5>
        <p className="mb-5 text-base text-gray-400 sm:text-lg">
          Join thousands of learners who have improved their pronunciation and
          speaking abilities with SpeakAl.
        </p>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
          <Link
            to="/sign-in?tab=register"
            className="w-full sm:w-auto bg-[#8861ea] focus:outline-none text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5"
          >
            <div className="text-left cursor-pointer">
              <div className="text-xs">Get Started Now</div>
            </div>
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Transform;
