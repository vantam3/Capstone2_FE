import {
  AcademicCapIcon,
  BookmarkIcon,
  BookOpenIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import React from "react";

function OurValues() {
  const dataOurValues = [
    {
      title: "Innovation",
      description:
        "We're constantly pushing the boundaries of what's possible with Al in language learning.",
      icon: <CubeTransparentIcon className="w-6 h-6 text-[#8861ea]" />,
    },
    {
      title: "Inclusivity",
      description:
        "We design our platform to be accessible and beneficial for learners from all backgrounds and abilities.",
      icon: <UsersIcon className="w-6 h-6 text-[#8861ea]" />,
    },
    {
      title: "Global Perspective",
      description:
        "We celebrate linguistic diversity and help preserve languages from around the world.",
      icon: <GlobeAltIcon className="w-6 h-6 text-[#8861ea]" />,
    },
    {
      title: "Evidence-Based Learning",
      description:
        "Our methods are grounded in linguistics research and proven pedagogical approaches.",
      icon: <BookOpenIcon className="w-6 h-6 text-[#8861ea]" />,
    },
    {
      title: "Continuous Improvement",
      description:
        "We're committed to always refining our technology and methods based on user feedback and new research.",
      icon: <AcademicCapIcon className="w-6 h-6 text-[#8861ea]" />,
    },
    {
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from our Al models to our user experience.",
      icon: <BookmarkIcon className="w-6 h-6 text-[#8861ea]" />,
    },
  ];
  return (
    <>
      <div className="text-center">
        <h3 className="text-white text-4xl font-bold">Our Values</h3>
        <h3 className="text-white text-lg">
          The core principles that guide everything we do at SpeakAl.
        </h3>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 mt-6">
        {dataOurValues.map((item) => (
          <div
            className="bg-[#231246] border border-[#39246c] rounded-[16px] shadow-sm p-6"
            key={item.title}
          >
            <div className="flex items-center">
              <div className="bg-[#372267] rounded-[16px] p-4 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="p-4">
                <p className="text-[#d1cde1] text-lg font-bold">{item.title}</p>
                <p className="text-[#d1cde1] text-[15px] font-[600]">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OurValues;
