import React from "react";

const teamMembers = [
  {
    name: "Trần Văn Tâm",
    role: "Leader",
    description:
      "Join thousands of learners who have improved their pronunciation and speaking abilities with SpeakPro.",
    image: "https://i.postimg.cc/g2HZYBJX/tom.jpg",
  },
  {
    name: "Nguyễn Quang Hoàng",
    role: "Member",
    description:
      "Specializes in building advanced speech-to-text and TTS technologies.",
    image: "https://i.postimg.cc/SjFFQgPv/hoang.jpg",
  },
  {
    name: "Nguyễn Nam Khánh",
    role: "Member",
    description:
      "Designs effective pronunciation and conversation curricula for learners.",
    image: "https://i.postimg.cc/fWvnfcJ7/khanh.jpg",
  },
  {
    name: "Võ Duy Nhựt",
    role: "Member",
    description:
      "Crafts the interactive user interface to deliver a smooth learning experience.",
    image: "https://i.postimg.cc/j2DH269V/nhut.jpg",
  },
  {
    name: "Nguyễn Hạ Long",
    role: "Member",
    description:
      "Ensures the platform aligns with modern language teaching standards.",
    image: "https://i.postimg.cc/kXxcbsG9/long.jpg",
  },
];

function MeetOurTeam() {
  return (
    <>
      <div className="text-center">
        <h2 className="text-white text-3xl">Meet Our Team</h2>
        <p className="text-white text-lg mt-4">
          SpeakPro is built by a diverse team of language experts, AI
          researchers, and education specialists working together to
          revolutionize language learning.
        </p>
      </div>
      <div className="grid sm:grid-cols-5 grid-cols-1 gap-4 mt-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="w-full h-[30rem] mx-auto text-center bg-[#231245] border border-[#291650] rounded-[16px] shadow-sm sm:p-0 flex flex-col relative overflow-hidden"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-[60%] object-cover rounded-t-[16px]"
              loading="lazy"
            />
            <div className="rounded-b-[16px] bottom-0 left-0 w-full bg-[#190a37] p-4 space-y-2 h-[40%] flex flex-col justify-center">
              <p className="text-base text-left text-white sm:text-2xl font-bold">
                {member.name}
              </p>
              <p className="text-base text-left text-gray-400 sm:text-[14px]">
                {member.role}
              </p>
              <p className="text-base text-left text-white sm:text-[16px]">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MeetOurTeam;
