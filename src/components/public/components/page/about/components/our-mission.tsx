import React from "react";

function OurMission() {
  return (
    <div className="w-full p-4  text-center bg-[#190b37] border border-[#291650] rounded-[16px] shadow-sm sm:p-8 ">
      <h5 className="mb-2 text-3xl font-bold text-white">Our Mission</h5>
      <p className="max-w-3xl mx-auto mb-5 text-base text-white sm:text-lg ">
        At SpeakAl, we're on a mission to transform language learning through
        artificial intelligence. We believe everyone deserves the opportunity to
        speak with confidence, regardless of where they're from or what language
        they're learning.
      </p>
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-[12px] text-[#9061F9] bg-[#2b1b54]">
          Helping over 100,000 learners improve their speaking abilities
        </div>
      </div>
    </div>
  );
}

export default OurMission;
