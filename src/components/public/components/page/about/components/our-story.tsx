import React from "react";

function OurStory() {
  const dataTimeline = [
    {
      year: "2024",
      title: "Research Beginnings",
      description:
        "SpeakPro began as a student research project at Duy Tan University, where our team explored how AI could detect pronunciation errors in language learners.",
    },
    {
      year: "2025",
      title: "First Prototype",
      description:
        "After months of development, we built the first prototype of SpeakPro. We tested it with a small group of students and teachers to gather feedback and refine the platform.",
    },
    {
      year: "2025",
      title: "Early Testing & Iteration",
      description:
        "We launched the first public version of SpeakPro, quickly gathering feedback from early users. This allowed us to improve our AI algorithms and enhance the platform's usability.",
    },
    {
      year: "2025 and Beyond",
      title: "Growth & Expansion",
      description:
        "As we continue developing SpeakPro, we're focused on adding new features like daily challenges, community leaderboards, and multi-language support. We're excited about the future as we aim to help learners worldwide improve their pronunciation and language skills.",
    },
  ];

  return (
    <>
      <div className="text-center">
        <h3 className="text-white text-4xl font-bold">Our Story</h3>
        <h3 className="text-white text-lg">
          From a student research project to a promising language learning
          platform, here's how SpeakPro has evolved so far.
        </h3>
      </div>
      <div className="flex max-w-4xl items-center mx-auto justify-center">
        <ol className="relative mx-auto border-s border-gray-700 mt-10">
          {dataTimeline.map((item) => (
            <li className="mb-10 ms-6" key={item.year}>
              <span className="absolute flex items-center text-[#7c58d7] font-bold justify-center bg-[#1f113d] rounded-full -start-3">
                {item.year}
              </span>
              <h3 className="flex items-center mb-1 ml-4 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mb-4 text-base ml-4 font-normal text-gray-400 ">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default OurStory;
