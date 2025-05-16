import React from "react";

function MeetOurTeam() {
  return (
    <>
      <div className="text-center">
        <h2 className="text-white text-3xl">Meet Our Team</h2>
        <p className="text-white text-lg mt-4">
          SpeakAl is built by a diverse team of language experts, Al
          researchers, and education specialists working together to
          revolutionize language learning.
        </p>
      </div>
      <div className="grid sm:grid-cols-5 grid-cols-1 gap-4 mt-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-[30rem] mx-auto text-center bg-[#231245] border border-[#291650] rounded-[16px] shadow-sm sm:p-8 flex flex-col items-center justify-center relative"
          >
            <img
              src="https://www.svgrepo.com/show/452030/avatar-default.svg"
              alt="avatar"
            />

            <div className="absolute rounded-[16px] bottom-0 left-0 w-full bg-[#190a37] p-4 space-y-2">
              <p className="text-base text-left text-white sm:text-2xl font-bold">
                Sarah Chen
              </p>
              <p className="text-base text-left text-gray-400 sm:text-[14px]">
                CEO & Co-Founder
              </p>
              <p className="text-base text-left text-white sm:text-[16px]">
                Join thousands of learners who have improved their pronunciation
                and speaking abilities with SpeakAl.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MeetOurTeam;
