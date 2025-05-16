import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import OurMission from "./components/our-mission";
import OurStory from "./components/our-story";
import MeetOurTeam from "./components/meet-our-team";
import OurValues from "./components/our-values";
import ContactUs from "./components/contact-us";
import { useNavigate } from "react-router-dom";

function About() {
  const router = useNavigate();

  return (
    <div className="mt-[5rem] sm:mt-[10rem] max-w-screen-2xl mx-auto sm:p-2 p-6">
      <div className="flex items-center gap-4">
        <ArrowLeftIcon
          className="w-4 h-4 cursor-pointer text-white"
          onClick={() => router("/home")}
        />
        <p className="text-xs text-white ">Back</p>
        <p className="text-2xl font-[600] text-white">About SpeakAl</p>
      </div>
      <div className="mt-6">
        <OurMission />
      </div>
      <div className="mt-6">
        <OurStory />
      </div>
      <div className="mt-6">
        <MeetOurTeam />
      </div>
      <div className="mt-6">
        <OurValues />
      </div>
      <div className="mt-6">
        <ContactUs />
      </div>
    </div>
  );
}

export default About;
