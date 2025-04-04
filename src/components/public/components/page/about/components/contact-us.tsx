import {
  BuildingOfficeIcon,
  CheckCircleIcon,
  ClockIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import React from "react";

function ContactUs() {
  return (
    <div className="sm:flex space-x-6">
      <div className="sm:w-[50%] w-full">
        <p className="font-bold text-2xl text-white">Contact Us</p>
        <div className="mt-4 w-full bg-[#190b37] border border-[#462c84] rounded-[16px] shadow-sm p-6">
          <div className="flex items-start">
            <BuildingOfficeIcon className="w-6 h-6 text-[#6848b6]" />
            <div className="flex flex-col ml-2">
              <p className="text-base text-white font-[600] sm:text-sm">
                Headquarters
              </p>
              <p className="text-base text-white font-[600] sm:text-sm mt-1">
                305 Trần Hưng Đạo, Sơn Trà Đà nẵng
              </p>
            </div>
          </div>
          <div className="flex items-start mt-4">
            <ClockIcon className="w-6 h-6 text-[#6848b6] " />
            <div className="flex flex-col ml-2">
              <p className="text-base text-white font-[600] sm:text-sm">
                Support Hours
              </p>
              <p className="text-base text-white font-[600] sm:text-sm mt-1">
                Monday - Friday: 9 AM - 6 PM (PST)
              </p>
            </div>
          </div>
          <div className="flex items-start mt-4">
            <LanguageIcon className="w-6 h-6 text-[#6848b6] " />
            <div className="flex flex-col ml-2">
              <p className="text-base text-white font-[600] sm:text-sm">
                Support Languages
              </p>
              <p className="text-base text-white font-[600] sm:text-sm mt-1">
                English
              </p>
            </div>
          </div>
          <button
            type="button"
            className="text-white cursor-pointer w-full mt-4 bg-[#8861ea] hover:bg-[#8861ea] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Contact Support
          </button>
        </div>
      </div>
      <div className="sm:w-[50%] w-full ml-auto mt-4 sm:mt-0">
        <p className="font-bold text-2xl text-white">
          Frequently Asked Questions
        </p>
        <div className="w-full mt-4 mx-auto bg-[#010005] border border-[#180c34] rounded-[16px] shadow-sm p-6">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-6 h-6 text-[#6848b6]" />
            <p className="text-lg text-white">
              What languages does SpeakAl support?
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            We currently support 20+ languages including English,
          </p>
        </div>
        <div className="w-full mt-4 mx-auto bg-[#010005] border border-[#180c34] rounded-[16px] shadow-sm p-6">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-6 h-6 text-[#6848b6]" />
            <p className="text-lg text-white ">
              How accurate is the Al feedback?
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Our Al feedback system achieves over 95% accuracy for pronunciation
            errors when compared to professional language teachers' assessments.
            We continually train and improve our models.
          </p>
        </div>
        <div className="w-full mt-4 mx-auto bg-[#010005] border border-[#180c34] rounded-[16px] shadow-sm p-6">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-6 h-6 text-[#6848b6]" />
            <p className="text-lg text-white">
              Do I need any special equipment?
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Just a standard microphone on your computer or mobile device is
            sufficient. For best results, we recommend using the platform in a
            quiet environment.
          </p>
        </div>
        <div className="w-full mt-4 mx-auto bg-[#010005] border border-[#180c34] rounded-[16px] shadow-sm p-6">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-6 h-6 text-[#6848b6]" />
            <p className="text-lg text-white">
              Is SpeakAl suitable for complete beginners?
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Absolutely! SpeakAl adapts to your skill level, providing
            appropriate challenges and feedback whether you're just starting or
            at an advanced level.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
