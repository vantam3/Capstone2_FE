import React from "react";

function OurStory() {
  const dataTimeline = [
    {
      year: "2020",
      title: "Research Beginnings",
      description:
        "SpeakAl started as a research project at Stanford University, focused on using Al to detect pronunciation errors in language learners.",
    },
    {
      year: "2021",
      title: "First Prototype",
      description:
        "Our team developed the first prototype of the SpeakAl platform, testing it with a small group of language teachers and students.",
    },
    {
      year: "2022",
      title: "Public Launch",
      description:
        "After refining our Al feedback algorithms, we launched the platform to the public, quickly gaining our first 10,000 users.",
    },
    {
      year: "2023",
      title: "Expanded Features",
      description:
        "We added daily challenges, community leaderboards, and support for 20+ languages, transforming SpeakAl into a comprehensive language learning ecosystem.",
    },
    {
      year: "2024",
      title: "Global Growth",
      description:
        "Today, SpeakAl serves learners in over 150 countries, continually improving our Al to provide more accurate and helpful speaking feedback.",
    },
  ];

  return (
    <>
      <div className="text-center">
        <h3 className="text-white text-4xl font-bold">Our Story</h3>
        <h3 className="text-white text-lg">
          From a small research project to a global language learning platform,
          here's how SpeakAl evolved over the years.
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
